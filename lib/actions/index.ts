"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import * as logger from "../logger";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }
    const newProduct: any = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    )
      .then((newProduct) => {
        if (newProduct) {
          console.log("Product Updated", newProduct);
        } else {
          console.log("Product Url not found");
        }
      })
      .catch((error) => {
        console.log("error updating prodct", error);
      });
    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });
    if (!product) return null;
    return product;
  } catch (error) {
    logger.logError(`${error}`);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find();

    return products;
  } catch (error) {
    logger.logError(`${error}`);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();
    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;
    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);
    return similarProducts;
  } catch (error) {
    logger.logError(`${error}`);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    //send our first email
    const product = await Product.findById(productId);
    console.log(product);
    if (!product) return null;
    const userExists = product.users.includes(userEmail);
    console.log("userEmail: ", userEmail);
    console.log("userEmailExists: ", userExists);
    if (!userExists) {
      product.users.push(userEmail);

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    logger.logError(`Error while adding userEmail to product: ${error}`);
  }
}
