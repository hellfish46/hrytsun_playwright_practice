import { test, expect } from '@playwright/test';
let searchGetStartedLocator = "[href*='how-to-get-started']";
let startingPage = "https://playwright.dev";
let randomText = "wqedf";
let noResultsLocator = ".DocSearch-Title";


test("Search 'Get started' page", async ({ page }) => {
  //Open starting page
  await page.goto(startingPage);

  //Click "Search" element
  await page.getByLabel('Search').click();

  //Fill "get started" text
  await page.getByPlaceholder('Search docs').fill('get started');

  //Check expected search result
  await expect(page.getByRole('link', { name: 'How to get started​' })).toBeVisible();

  //Click "Get started" option
  await page.click(searchGetStartedLocator);
  
  //Check page is opened in right place
  await expect(page.locator('#how-to-get-started')).toContainText('How to get started');
});

test("Search wrong topic", async ({ page }) => {
  //Open starting page
  await page.goto(startingPage);

  //Click "Search" element
  await page.getByLabel('Search').click();

  //Click search form
  await page.getByPlaceholder('Search docs').click();

  //Fill by random text
  await page.getByPlaceholder('Search docs').fill(randomText);

  //Check No results text
  await expect(page.locator(noResultsLocator)).toContainText("No results for " );
  await expect(page.locator(noResultsLocator)).toContainText(randomText);
});