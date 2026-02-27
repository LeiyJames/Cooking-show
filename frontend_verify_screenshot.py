from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to a recipe page where components are used
        print("Navigating to Adobo recipe page...")
        page.goto("http://localhost:3000/filipino/adobo")

        # Wait for content to load
        page.wait_for_selector("h1")

        # Take a screenshot
        screenshot_path = "verification_screenshot.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
