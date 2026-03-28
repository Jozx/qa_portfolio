# Test Automation Suite — Playwright + TypeScript

## Overview
End-to-end automation suite built with Playwright and TypeScript, covering UI, 
API, and visual regression testing. This suite demonstrates automation 
engineering skills including page object modeling, fixture management, 
data-driven testing, and CI/CD integration.

> **Target Application:** [Automation Exercise](https://automationexercise.com)  
> Used as a representative e-commerce platform to demonstrate real-world 
> automation patterns applicable to vendor portal and procurement systems.

## Tech Stack
- **Framework:** Playwright
- **Language:** TypeScript
- **Reporter:** Playwright HTML Reporter
- **CI/CD:** GitHub Actions

## Project Structure
```
05_Automation/
├── e2e/
│   ├── ui/          # UI end-to-end tests
│   ├── api/         # API tests
│   ├── visual/      # Visual regression tests
│   └── smoke/       # Smoke test suite
├── pages/           # Page Object Models
├── fixtures/        # Custom fixtures and auth setup
├── utils/           # Helpers and test data
├── docs/            # Test strategy document
└── playwright.config.ts
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
cd 05_Automation
npm install
npx playwright install
```

### Running Tests
```bash
# Run all tests
npx playwright test

# Run UI tests only
npx playwright test e2e/ui/

# Run with UI mode (visual debugger)
npx playwright test --ui

# View last test report
npx playwright show-report
```

## Test Suites

| Suite | Coverage | Status |
| :--- | :--- | :--- |
| Authentication | Login, logout, invalid credentials | ✅ Complete |
| Products | Search, filter, product detail | 🔄 In progress |
| Cart & Checkout | Add to cart, checkout flow | 🔄 In progress |
| API | REST endpoint validation | 📋 Planned |
| Visual | Screenshot regression | 📋 Planned |
| Smoke | Critical path coverage | 📋 Planned |

## Key Patterns Used
- **Page Object Model** — maintainable, reusable page interactions
- **Custom Fixtures** — shared auth state, test setup
- **data-qa locators** — stable selectors decoupled from UI styling
- **AAA pattern** — Arrange, Act, Assert structure on every test
- **Soft assertions** — multiple checks per test without early failure

---
*Part of the [QA Engineer Portfolio](../README.md)*