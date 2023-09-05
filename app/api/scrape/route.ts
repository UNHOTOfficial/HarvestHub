// pages/api/scrape.js
import puppeteer from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// Handles GET requests to /api
export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: any, res: any) {
  const body = await req.json();
  const { url } = body;

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the website you want to scrape
    await page.goto(url);

    // Extract data from the page
    const title = await page.title();

    await browser.close();

    return NextResponse.json({ title: title });
  } catch (error) {
    return NextResponse.json({ error, req });
  }
}
