
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
    # repo-1: 10 stars, clean
    # repo-fork: 20 stars, FORK (should be hidden)
    page.route("**/users/shfqrkhn/repos?sort=pushed&per_page=100&page=1", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body='[{"name": "repo-1", "html_url": "http://example.com", "stargazers_count": 10, "fork": false}, {"name": "repo-fork", "html_url": "http://example.com", "stargazers_count": 20, "fork": true}]'
    ))

    # Mock Repos Page 2
    # repo-2: 5 stars, clean
    page.route("**/users/shfqrkhn/repos?sort=pushed&per_page=100&page=2", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body='[{"name": "repo-2", "html_url": "http://example.com", "stargazers_count": 5, "fork": false}]'
    ))

    page.goto("http://localhost:8000")

    # Wait for profile to load
    expect(page.locator("#user-profile h1")).to_have_text("Shafiqur Khan")

    # Wait for repos to load
    # We expect 2 repos total (repo-1, repo-2). repo-fork should be hidden.
    expect(page.locator("#repos-grid .project-card")).to_have_count(2)

    # Check content
    expect(page.locator("#repos-grid")).to_contain_text("repo-1")
    expect(page.locator("#repos-grid")).to_contain_text("repo-2")
    expect(page.locator("#repos-grid")).not_to_contain_text("repo-fork")

    # Check Sorting (Stars Descending)
    # repo-1 (10 stars) should be first, repo-2 (5 stars) second.
    cards = page.locator("#repos-grid .project-card h3")
    expect(cards.nth(0)).to_have_text("repo-1")
    expect(cards.nth(1)).to_have_text("repo-2")

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
            exit(1)
        finally:
            browser.close()
