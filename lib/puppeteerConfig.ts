// puppeteerConfig.js

module.exports = {
  headless: true, // Set to true for headless mode (no browser UI)
  slowMo: 0, // Slow down Puppeteer operations by the specified amount of milliseconds (useful for debugging)
  devtools: false, // Enable or disable the Chrome DevTools
  defaultViewport: null, // Set the default viewport to null to use the full page size
  args: ["--no-sandbox", "--disable-setuid-sandbox"], // Additional command-line arguments for launching Chromium
  executablePath: "", // Path to the Chromium executable (leave empty for default)
  userDataDir: "", // Path to the user data directory (useful for persisting login sessions and data)
  ignoreHTTPSErrors: false, // Ignore HTTPS errors during navigation
  timeout: 0, // Maximum time in milliseconds to wait for the browser instance to start
  waitForNavigation: {
    // Configuration for waiting for navigation events
    waitUntil: "domcontentloaded", // Wait for the 'domcontentloaded' event
    timeout: 30000, // Maximum time in milliseconds to wait for navigation
  },
};
