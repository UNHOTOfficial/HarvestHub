"use client";
// pages/index.js
import React, { useState } from "react";

const Home = () => {
  const [url, setUrl] = useState("https://divar.com");
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true while waiting for the API response

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
    } finally {
      setIsLoading(false); // Set loading to false after the API response is received
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="border p-8 flex flex-col items-center space-y-3 w-72 h-96"
      >
        <h1>Website Scraper</h1>
        <div>
          <label htmlFor="site-input">Url: </label>
          <select
            className="site-input text-black rounded-sm"
            placeholder="Enter a website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          >
            <option value="https://divar.ir/s/isfahan/car/peugeot/206-sd/v8?price=-400000000&production-year=1390-&usage=-120000&has-photo=true">
              Divar
            </option>
            <option value="https://google.com">Google</option>
          </select>
        </div>
        <button className="border bg-violet-300 rounded-sm" type="submit">
          Scrape
        </button>

        {/* Display a loading indicator when isLoading is true */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="self-start">
            <div className="flex space-x-2">
              <label htmlFor="site-title">Title:</label>
              <p className="site-title">{response.title}</p>
            </div>
            <div className="flex space-x-2">
              <label htmlFor="site-title">Language:</label>
              <p className="site-title">{response.lang}</p>
            </div>
            <div className="flex space-x-2">
              <label htmlFor="site-title">Country:</label>
              <p className="site-title">{response.country}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Home;
