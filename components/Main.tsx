"use client";
// pages/index.js
import React, { useState } from "react";

const Home = () => {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const apiResponse = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        setResponse(data);
      } else {
        setResponse("Error scraping the site");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error occurred while making the request");
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="border p-8 flex flex-col items-center space-y-3 h-96"
      >
        <h1>Website Scraper</h1>
        <div>
          <label htmlFor="site-input">Url: </label>
          <input
            className="site-input text-black rounded-sm"
            type="url"
            placeholder="Enter a website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button className="border bg-violet-300 rounded-sm" type="submit">
          Scrape
        </button>
        <div className="self-start">
          <div className="flex space-x-2">
            <label htmlFor="site-title">Title:</label>
            <p className="site-title">{response.title}</p>
          </div>
          <div className="flex space-x-2">
            <label htmlFor="site-title">Description:</label>
            <p className="site-title">{response.lang}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
