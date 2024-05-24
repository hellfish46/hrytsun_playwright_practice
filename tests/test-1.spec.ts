import { test, expect } from '@playwright/test';
import { assert } from 'console';
import exp from 'constants';

// url
let landingPage = "https://coffee-cart.app";

// Item cost
let espressoCost = 10.00;
let espressoMacchiatoCost = 12.00;
let cappuchinoCost = 19.00;
let mochaCost = 8.00;
let flatWhiteCost = 18.00;
let americanoCost = 7.00;
let cafeLatteCost = 16.00;
let espressoConPannaCost = 14.00;
let cafeBreveCost = 15.00;

// Item names
let espressoName = "Espresso";
let espressoMacchiatoName = "Espresso Macchiato";
let cappuccinoName = "Cappuccino";
let mochaName = "Mocha";
let flatWhiteName = "Flat White";
let americanoName = "Americano";
let cafeLatteName = "Cafe Latte";
let espressoConPannaName = "Esspresso Con Panna";
let cafeBreveName = "Cafe Breve";

// String locator
// Main
const checkoutLocator = "[data-test='checkout']";
const menuTabLocator = "a[href='/']";
const cartTabLocator = "a[href='/cart']";
const githubTabLocator = "a[href='/github']";

// Items
let espressoLocator = "[data-test='Espresso']";
let espressoMacchiatoLocator = "[data-test='Espresso_Macchiato']";
let cappuchinoLocator = "[data-test='Cappuccino']";
let mochaLocator = "[data-test='Mocha']";
let flatWhiteLocator = "[data-test='Flat_White']";
let americanoLocator = "[data-test='Americano']";
let cafeLatteLocator = "[data-test='Cafe Latte']";
let espressoConPannaLocator = "[data-test='Esspresso_Con_Panna']";
let cafeBreveLocator = "[data-test='Cafe_Breve']";

let costItemsList = "small";

let discountBonusModalLocator = ".promo";


let itemCount = 1;

function totalCostToString(itemCost){
    return "Total: $" + itemCost;
}

function totalItemCountToString(itemCount){
  return "cart (" + itemCount + ")";
}

function checkOutCountPriceToString(itemCost, itemCount){
  return "$" + itemCost + ".00" + " x " + itemCount;
  //$10.00 x 1
}



test("Adding 1 item to the card", async ({ page }) => {
  let addOneEspresso = page.getByRole('button', { name: 'Add one Espresso' });
  let removeAllEspresso = page.getByRole('button', { name: 'Remove one Espresso' });

  await page.goto(landingPage);
  await page.locator(espressoLocator).click();

  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(espressoCost));

  await expect(page.locator(cartTabLocator)).toContainText(totalItemCountToString(1));

  await page.locator(cartTabLocator).click();
  
  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(espressoCost));
  
  await expect(page.locator('#app')).toContainText(espressoName);
  
  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(espressoCost));

  expect(page.getByText(checkOutCountPriceToString(espressoCost, 1))).toBeVisible();
  
  await expect(addOneEspresso).toBeVisible();
  await expect(removeAllEspresso).toBeVisible();
  
  await expect(page.locator('#app')).toContainText("$" + espressoCost);

  await page.close();
});


test("Adding 2 item to the card", async ({ page }) => {
  let addOneEspressoMacchiato = page.getByRole('button', { name: 'Add one Espresso Macchiato' });
  let removeAllEspressoMacchiato = page.getByRole('button', { name: 'Remove one Espresso Macchiato' });

  await page.goto(landingPage);
  await page.locator(espressoMacchiatoLocator).click();
  await page.locator(espressoMacchiatoLocator).click();

  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(espressoMacchiatoCost*2));

  await expect(page.locator(cartTabLocator)).toContainText(totalItemCountToString(2));

  await page.locator(cartTabLocator).click();
  
  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(espressoMacchiatoCost*2));
  
  await expect(page.locator('#app')).toContainText(espressoMacchiatoName);
  
  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(espressoMacchiatoCost*2));

  expect(page.getByText(checkOutCountPriceToString(espressoMacchiatoCost, 2))).toBeVisible();
  
  await expect(addOneEspressoMacchiato).toBeVisible();
  await expect(removeAllEspressoMacchiato).toBeVisible();
  
  await expect(page.locator('#app')).toContainText("$" + espressoMacchiatoCost*2);

  await page.close();
});


test("Give extra Mocha", async ({ page }) => {
  let discountCost = 4;
  let discountText = "It's your lucky day! Get an extra cup of Mocha for $" + discountCost + ".";

  await page.goto(landingPage);
  await page.locator(mochaLocator).click();
  await page.locator(flatWhiteLocator).click();
  await page.locator(americanoLocator).click();

  
  await expect(page.locator(discountBonusModalLocator)).toContainText(discountText);
  await page.locator(".yes").click();

  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(mochaCost + flatWhiteCost + americanoCost + discountCost));

  await page.close();
});

test("Discard extra Mocha", async ({ page }) => {
  let discardExtraItemButton = page.locator("//div[@class='buttons']/button[not(@class='yes')]");

  await page.goto(landingPage);
  await page.locator(mochaLocator).click();
  await page.locator(flatWhiteLocator).click();
  await page.locator(americanoLocator).click();

  await discardExtraItemButton.click();

  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(mochaCost + flatWhiteCost + americanoCost));

  await page.close();
});

test("Remove all items from the card", async ({ page }) => {
  let addOneCappuccino = page.getByRole('button', { name: 'Add one Cappuccino' });
  let removeAllCappuccino = page.getByRole('button', { name: 'Remove all Cappuccino' });

  await page.goto(landingPage);
  await page.locator(cappuchinoLocator).click();
  await page.locator(cappuchinoLocator).click();

  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(cappuchinoCost*2));

  await expect(page.locator(cartTabLocator)).toContainText(totalItemCountToString(2));

  await page.locator(cartTabLocator).click();
  
  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(cappuchinoCost*2));
  
  await expect(page.locator('#app')).toContainText(cappuccinoName);
  
  await expect(page.locator(checkoutLocator)).toContainText(totalCostToString(cappuchinoCost*2));

  expect(page.getByText(checkOutCountPriceToString(cappuchinoCost, 2))).toBeVisible();
  
  await expect(addOneCappuccino).toBeVisible();

  
  await expect(page.locator('#app')).toContainText("$" + cappuchinoCost*2);

  await removeAllCappuccino.click();

  expect(page.getByText("No coffee, go add some.")).toBeVisible();


  await page.close();
});


test("Calculate all item cost", async ({ page }) => {
  let actualPrice = 0;
  let expectedPrice = 119.00;
  let costItemsList = "small";
  await page.goto(landingPage);
  //123
  
 for (const el of await page.locator(costItemsList).all()){
    //get string value from element
    let textContent = (await el.innerText()).toString();

    // If the text doesn't contain '$' - it is not what we searching
    if(!textContent.includes("$")){
      continue;
    }
    // Replace '$'
    let newStringWithoutDollarSigh = textContent.replace("$","");
    
    // Turn string to number
    let costInt = parseInt(newStringWithoutDollarSigh)
    
    // Add turned number to actual price
    actualPrice = actualPrice + costInt;
  
 }
  // In the end just check actual result
  expect(actualPrice).toBe(expectedPrice);
  await page.close();
});