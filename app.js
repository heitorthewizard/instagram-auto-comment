const puppeteer = require("puppeteer");

// creates a random comment to post
function commentRandomize() {
  return "🎩🎩🎩" + (4321 * Math.random()).toFixed(2);
}

async function commentOnPost(postLink, username, password) {
  console.log("Bot is running");

  const browser = await puppeteer.launch({
    headless: false, // set to true to run as background job
  });

  const page = await browser.newPage();
  await page.goto("https://www.instagram.com");
  await page.waitForTimeout(3000);

  console.log("bot entered page");

  await page.click(".sqdOP.L3NKy.y3zKF");
  await page.waitForTimeout(2000);

  console.log("bot is logging in");

  try {
    await page.type('input[name="username"]', username, { delay: 100 });
    await page.type('input[name="password"]', password, { delay: 100 });
    await page.click(".qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB");
    await page.waitForTimeout(7000);
    console.log("bot logged in successfully");
  } catch {
    console.log("couldn't log in, something went wrong");
  }

  await page.click(".sqdOP.L3NKy.y3zKF");
  await page.waitForTimeout(10000);
  await page.goto(postLink);

  let count = 1;

  try {
    setInterval(async () => {
      console.log("bot is commenting");
      await page.type(".PUqUI.Ypffh", commentRandomize(), { delay: 100 });
      await page.click("._7UhW9.xLCgt.qyrsm.gtFbE.uL8Hv.T0kll");
      console.log("bot just commented", count++);
    }, 1000 * 5); // comments every 5 seconds
  } catch {
    console.log("something went wrong");
  }
}

commentOnPost(
  "postlink",
  "username",
  "password"
);
