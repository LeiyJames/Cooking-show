import asyncio
from playwright.async_api import async_playwright
import time

async def verify_debounce():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        print("Navigating to adobo recipe...")
        await page.goto("http://localhost:3000/filipino/adobo")

        print("Waiting for 'Notes' section to be visible...")
        # Scroll and expand 'Notes' section if it's an accordion
        notes_button = page.locator("button", has_text="Notes")
        await notes_button.click()

        notes_textarea = page.locator("textarea[placeholder='Add your cooking notes here...']")
        await notes_textarea.wait_for(state="visible")

        print("Typing in notes and checking localStorage immediately...")
        await notes_textarea.fill("This is a test note.")

        # Check localStorage immediately - shouldn't have been written yet
        val_immediate = await page.evaluate("localStorage.getItem('cookingNotes_Chicken Adobo')")
        print(f"Immediate value: {val_immediate}")
        assert val_immediate != "This is a test note.", "Debounce failed: Value written immediately"

        print("Waiting 600ms for debounce...")
        time.sleep(0.6)

        # Check localStorage after delay
        val_delayed = await page.evaluate("localStorage.getItem('cookingNotes_Chicken Adobo')")
        print(f"Delayed value: {val_delayed}")
        assert val_delayed == "This is a test note.", "Debounce failed: Value not written after timeout"

        print("SUCCESS: Debouncing verified!")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_debounce())
