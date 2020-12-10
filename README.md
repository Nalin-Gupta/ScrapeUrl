# ScrapeUrl

> Deployed Website URL : https://backend-assign.herokuapp.com/

> Scrape textContent(paragraphs) from other websites and display it in your application

This app uses Node.js/Express/MongoDB with passport-local for authentication and puppeteer for scraping data

Note : The website takes 30-35 seconds to initially load.
While submitting a URL to scrape it takes about 10-15 seconds to load the content if the the URL is not already stored in the database

## Usage

Add your mongoDB URI and SESSION_SECRET variables to the config.env file

```
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```
