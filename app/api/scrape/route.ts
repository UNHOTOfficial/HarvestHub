// pages/api/scrape.js
import puppeteer from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// import puppeteerConfig from "@/lib/puppeteerConfig";

// Handles GET requests to /api
export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: any, res: any) {
  const body = await req.json();
  const { url } = body;

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: "new" });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the website you want to scrape
    await page.goto(url);

    // Extract data from the page
    const title = await page.title();

    const lang = await page.evaluate(() => {
      const divElement = document.querySelector("#SIvCob"); // Use '#' to select by ID
      if (divElement) {
        const aElement = divElement.querySelector("a");
        if (aElement) {
          return aElement.innerText;
        }
      }
      return null; // Return null if the div or a tag is not found
    });

    const country = await page.evaluate(() => {
      const divElement = document.querySelector("div.uU7dJb");
      if (divElement) {
        return divElement.innerHTML;
      }
      return null; // Return null if the div with the specified class is not found
    });

    await browser.close();

    return NextResponse.json({ title: title, lang: lang, country: country });
  } catch (error) {
    return NextResponse.json({ error, req });
  }
}
