# Pricewise - Amazon Price Scraper and Tracker

Pricewise is a web application designed to help users track prices of products on Amazon.in (India). It serves as a price scraper and tracker, allowing users to conveniently monitor price changes for their favorite products.

**Please Note:** The entire app is currently in demo and may undergo changes.

## Technologies Used

- **Full-Stack Framework:** [![Next.js with TypeScript](https://img.shields.io/badge/Full--Stack-Next.js%20with%20TypeScript-000000?logo=next.js&logoColor=white&labelColor=007ACC)](https://nextjs.org/)
- **Database:** [![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
- **Scraping:** [![Bright Data](https://img.shields.io/badge/Scraping-Bright%20Data-FF7139?logo=brightdata&logoColor=white)](https://brightdata.com/)
- **Cron Job Scheduler:** Hosted on [cron-job.org](https://cron-job.org)
- **Others:** [![npm](https://img.shields.io/badge/Others-npm-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/), [![Git](https://img.shields.io/badge/Others-Git-F05032?logo=git&logoColor=white)](https://git-scm.com/)

## Features

- **Search Amazon.in Prices:** Easily search for product prices on Amazon.in.

- **Price Tracking:** Track the prices of specific products by providing your email address. Pricewise regularly checks for price changes and sends email notifications when detected.

## Todo

- [ ] Implement user authentication for a personalized experience.
- [ ] Enhance email notification system.
- [ ] Improve user interface for a more intuitive experience.
- [ ] Expand supported regions for price tracking.

## How to Start Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pricewise.git
   ```

2. Install dependencies:

   ```bash
   cd pricewise
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   EMAIL_USERNAME=send_email_from_this_user
   EMAIL_PASSWORD=your_email_password
   ```

   Replace `send_email_from_this_user` and `your_email_password` with your actual Values.

4. Run the application:

   ```bash
   npm run dev
   ```

   The application will be accessible at [http://localhost:3000](http://localhost:3000) by default.

## Cron Job

A scheduled cron job is hosted on [cron-job.org](https://cron-job.org). This job runs at specified intervals to update prices and send notifications to users.

## Live Demo

Check out the live demo of Pricewise hosted at [![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white)](https://pricewise-xi-seven.vercel.app/)

---
