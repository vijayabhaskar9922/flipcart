import { test, expect } from '@playwright/test';

// Define fixtures and test configurations
test.use({
  viewport: { width: 1280, height: 720 }, // Set viewport size
  timeout: 30000, // Set a global timeout of 30 seconds
});

// Retry failed tests twice
test.describe.configure({ retries: 2 });

// Shard the test suite into 2 processes
test.describe.configure({ shard: { total: 2, current: 1 } });

test.describe('Flipkart Pages Test Suite', () => {
  test('Test Flipkart Home Page', async ({ page }) => {
    await page.goto('https://www.flipkart.com');
    
    // Close login modal if it appears
    if (await page.locator('button >> text=✕').isVisible()) {
      await page.click('button >> text=✕');
    }

    // Check if the search bar is visible
    const searchBar = page.locator('input[name="q"]');
    await expect(searchBar).toBeVisible();

    // Assert that the title contains "Online Shopping"
    await expect(page).toHaveTitle(/Online Shopping/);
  });

  test('Test Flipkart Electronics Page', async ({ page }) => {
    await page.goto('https://www.flipkart.com/audio-video/pr?sid=0pm&otracker=categorytree&fm=neo%2Fmerchandising&iid=M_83442bf5-c87d-46e9-b9ce-b53fbe2b67b5_1_372UD5BXDFYS_MC.9JGNW7M0TUHD&otracker=hp_rich_navigation_1_1.navigationCard.RICH_NAVIGATION_Electronics~Audio~All_9JGNW7M0TUHD&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_1_L2_view-all&cid=9JGNW7M0TUHD');

    // Assert that the title contains "Electronics"
    await expect(page).toHaveTitle("Wireless - Buy Wireless Online at Best Prices In India | Flipkart.com");

    // Check if the Electronics section is visible
    const electronicsHeader = page.locator('h1 >> text=Electronics');
    await expect(electronicsHeader).toBeVisible();
  });

  test('Test Flipkart Fashion Page', async ({ page }) => {
    await page.goto('https://www.flipkart.com/clothing-and-accessories/topwear/pr?sid=clo,ash&p[]=facets.ideal_for%255B%255D%3DMen&p[]=facets.ideal_for%255B%255D%3Dmen&otracker=categorytree&fm=neo%2Fmerchandising&iid=M_d525b156-bcbb-4aee-82a2-945e3868e202_1_372UD5BXDFYS_MC.AHHHWF67UPNB&otracker=hp_rich_navigation_1_1.navigationCard.RICH_NAVIGATION_Fashion~Men%2527s%2BTop%2BWear~All_AHHHWF67UPNB&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_1_L2_view-all&cid=AHHHWF67UPNB');

    // Assert that the title contains "Fashion"
    await expect(page).toHaveTitle('Topwear - Buy Topwear For Men, Women &amp; Kids Online at Best Prices In India | Flipkart.com');

    // Check if the Fashion section is visible
    const fashionHeader = page.locator('h1 >> text=Fashion');
    await expect(fashionHeader).toBeVisible();
  });
});
