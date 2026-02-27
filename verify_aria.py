from playwright.sync_api import sync_playwright

def verify_aria_labels():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to a recipe page where components are used
        print("Navigating to Adobo recipe page...")
        page.goto("http://localhost:3000/filipino/adobo")

        # Wait for content to load
        page.wait_for_selector("h1")

        print("Verifying ARIA labels...")

        # 1. Ingredient Calculator
        print("\nChecking Ingredient Calculator buttons...")
        decrease_btn = page.locator('button[aria-label="Decrease servings"]')
        increase_btn = page.locator('button[aria-label="Increase servings"]')
        reset_servings_btn = page.locator('button[aria-label="Reset servings"]')

        if decrease_btn.count() > 0:
            print("✅ Decrease servings button found with aria-label")
        else:
            print("❌ Decrease servings button NOT found")

        if increase_btn.count() > 0:
            print("✅ Increase servings button found with aria-label")
        else:
            print("❌ Increase servings button NOT found")

        if reset_servings_btn.count() > 0:
            print("✅ Reset servings button found with aria-label")
        else:
            print("❌ Reset servings button NOT found")

        # 2. Timer Interface
        print("\nChecking Timer Interface buttons...")
        start_timer_btn = page.locator('button[aria-label="Start timer"]')
        pause_timer_btn = page.locator('button[aria-label="Pause timer"]')
        reset_timer_btn = page.locator('button[aria-label="Reset timer"]')

        if start_timer_btn.count() > 0:
            print("✅ Start timer button found with aria-label")
        else:
            print("❌ Start timer button NOT found")

        if pause_timer_btn.count() > 0:
            print("✅ Pause timer button found with aria-label")
        else:
            print("❌ Pause timer button NOT found")

        if reset_timer_btn.count() > 0:
            print("✅ Reset timer button found with aria-label")
        else:
            print("❌ Reset timer button NOT found")

        # 3. Cooking Progress
        print("\nChecking Cooking Progress buttons...")
        reset_progress_btn = page.locator('button[aria-label="Reset progress"]')

        if reset_progress_btn.count() > 0:
            print("✅ Reset progress button found with aria-label")
        else:
            print("❌ Reset progress button NOT found")

        browser.close()

if __name__ == "__main__":
    verify_aria_labels()
