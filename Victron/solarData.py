from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import time

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=False, slow_mo=50
    )  # headless=False shows browser
    page = browser.new_page()
    page.goto("https://www.dessmonitor.com/#/entry")
    page.get_by_placeholder("Username").fill("casaYolanda")
    page.get_by_placeholder("Password").fill("casaYolanda14")
    page.click("button[type=button]")
    page.pause()
    time.sleep(1)
    print("Resuming after the pause. Continue with the remaining tasks.")
    page.get_by_role("div", name="list")
    html = page.inner_html(".dataBox")
    soup = BeautifulSoup(html, "html.parser")
    print(soup)
