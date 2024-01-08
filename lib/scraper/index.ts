import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurreny, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // BrightData proxy config

  // curl --proxy brd.superproxy.io:22225
  //     --proxy-user brd-customer-hl_371e38cc-zone-unblocker:y2i5fd1y9fv3
  //     -k https://lumtest.com/myip.json

  const userName = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const sessionId = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${userName}-session-${sessionId}`,
      password,
    },
    host: String(process.env.BRIGHT_DATA_HOST),
    port,
    rejectUnauthorized: false,
  };

  try {
    //Fetch the product page
    const response = await axios.get(url, options);
    const parsedHTML = cheerio.load(response.data);
    const productTitle = parsedHTML("#productTitle").text().trim();
    const currentPrice = extractPrice(
      parsedHTML("span.a-price.priceToPay span.a-price-whole")
    );
    const originalPrice = extractPrice(
      parsedHTML(".a-price.a-text-price span.a-offscreen")
    );
    const outOfStock =
      parsedHTML("#availability span.a-size-medium.a-color-success")
        .text()
        .trim()
        .toLowerCase() === "currently unavailable.";
    const images =
      parsedHTML("#landingImage").attr("data-a-dynamic-image") || "{}";
    const imageUrls = Object.keys(JSON.parse(images));
    const currency = extractCurreny(parsedHTML(".a-price-symbol"));
    const discountPercentage = parsedHTML(".savingsPercentage")
      .text()
      .trim()
      .replace(/[-%]/g, "");
    const data = {
      url,
      currency,
      image: imageUrls[0],
      title: productTitle,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice),
      priceHistory: [],
      lowestPrice: Number(currentPrice),
      highestPrice: Number(originalPrice),
      averagePrice: Number(currentPrice),
      discountRate: Number(discountPercentage),
      description: "",
      categories: "",
      isOutOfStock: outOfStock,
      category: "category",
      reviewsCount: 100,
      stars: 4.99,
    };
    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
