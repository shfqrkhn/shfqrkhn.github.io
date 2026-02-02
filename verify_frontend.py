
from playwright.sync_api import sync_playwright, expect
import os

OUTPUT_DIR = "/home/jules/verification"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def verify_repos_load(page):
    # Mock User Profile
    page.route("**/users/shfqrkhn", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body='{"login": "shfqrkhn", "name": "Shafiqur Khan", "public_repos": 150, "avatar_url": "https://example.com/avatar.jpg", "html_url": "https://github.com/shfqrkhn"}'
    ))

    # Mock Repos Page 1
    page.route("**/users/shfqrkhn/repos?sort=pushed&per_page=100&page=1", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body='[{"name": "repo-1", "html_url": "http://example.com", "stargazers_count": 10}, {"name": "repo-2", "html_url": "http://example.com", "stargazers_count": 5}]'
    ))

    # Mock Repos Page 2
    page.route("**/users/shfqrkhn/repos?sort=pushed&per_page=100&page=2", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body='[{"name": "repo-3", "html_url": "http://example.com", "stargazers_count": 1}]'
    ))

    # Page 3 should not be called if logic is correct (150 repos = 2 pages)

    page.goto("http://localhost:8000")

    # Wait for profile to load
    expect(page.locator("#user-profile h1")).to_have_text("Shafiqur Khan")

    # Wait for repos to load
    # We expect 3 repos total (2 from page 1, 1 from page 2)
    # The real app sorts by stars.

    expect(page.locator("#repos-grid .project-card")).to_have_count(3)

    # Check content
    expect(page.locator("#repos-grid")).to_contain_text("repo-1")
    expect(page.locator("#repos-grid")).to_contain_text("repo-3")

    page.screenshot(path=f"{OUTPUT_DIR}/verification.png")
    print("Verification screenshot saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_repos_load(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
