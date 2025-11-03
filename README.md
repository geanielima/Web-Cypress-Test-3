# Cypress TypeScript Automation Project

## Overview
This project is an automated end-to-end testing suite built with [Cypress](https://www.cypress.io/) and [TypeScript](https://www.typescriptlang.org/). It covers UI and API test scenarios for the demo site [The Internet](https://the-internet.herokuapp.com/), using the Page Object Model for maintainable and scalable test code.

## Features
- Automated UI tests for login, checkboxes, drag & drop, dropdowns, file upload, and redirects
- API test support
- Page Object Model for reusable test logic
- TypeScript for type safety and better developer experience
- Custom Cypress commands
- Docker support for running tests in containers
- **CI/CD Pipeline with GitHub Actions** - Automated testing across multiple browsers

## Project Structure
```
QAx2 /
├── .github/
│   └── workflows/
│       └── cypress.yml       # GitHub Actions CI/CD pipeline
├── cypress.config.ts         # Cypress configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── cypress/
│   ├── e2e/                  # Test specs (UI & API)
│   ├── fixtures/             # Test files for upload scenarios
│   ├── support/
│   │   ├── commands.ts       # Custom Cypress commands
│   │   ├── pages/            # Page Object classes
│   │   └── ...
│   └── ...
├── Dockerfile                # Docker setup for CI runs
├── .dockerignore             # Files/folders to exclude from Docker builds
└── README.md                 # Project documentation
```

## Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- npm
- Docker for containerized test runs

### Install Dependencies
```bash
npm install
```

### Run Tests Locally
Open Cypress UI:
```bash
npx cypress open
```
Run all tests headlessly:
```bash
npm run test
```
Run a specific spec:
```bash
npx cypress run --spec cypress/e2e/ui/login.spec.ts
```

### Run Tests in Docker
Build the Docker image:
```bash
docker build -t cypress-tests .
```
Run the tests:
```bash
docker run cypress-tests
```

## CI/CD Pipeline

### GitHub Actions
This project includes a comprehensive GitHub Actions workflow (`.github/workflows/cypress.yml`) that automatically runs tests on every push and pull request.

#### Pipeline Features:
- **Code Quality Checks**: ESLint and TypeScript type checking
- **Multi-Browser Testing**: Automated tests on Chrome, Firefox, and Edge
- **Test Categorization**: 
  - UI Tests (full browser matrix)
  - API Tests (separate job)
  - Smoke Tests (on pull requests)
  - Parallel Execution (on main branch)
- **Artifact Collection**: Screenshots, videos, and test reports
- **Scheduled Runs**: Daily execution at 2 AM UTC
- **Manual Triggers**: Workflow dispatch with browser selection

#### Pipeline Triggers:
- **Push** to `main`, `master`, or `develop` branches
- **Pull Requests** to main branches
- **Schedule** (daily at 2 AM UTC)
- **Manual dispatch** with custom parameters

#### Workflow Jobs:

1. **Code Quality** (`code-quality`)
   - Runs ESLint for code linting
   - Performs TypeScript type checking
   - Must pass before tests run

2. **E2E Tests** (`cypress-run`)
   - Matrix strategy across Chrome, Firefox, and Edge
   - Uses official Cypress browser containers
   - Uploads artifacts (screenshots, videos, reports)

3. **API Tests** (`api-tests`)
   - Dedicated job for API test execution
   - Isolated from UI tests for better organization

4. **Smoke Tests** (`smoke-tests`)
   - Quick validation tests on pull requests
   - Runs only essential login tests

5. **Parallel Tests** (`cypress-parallel`)
   - Parallel execution on main branch pushes
   - Configured for 3 parallel containers

#### Using the Pipeline:

**Automatic Execution:**
- Push code to trigger the full test suite
- Create a pull request to run smoke tests

**Manual Execution:**
```bash
# Go to Actions tab in GitHub
# Select "Cypress Tests" workflow
# Click "Run workflow"
# Choose browser and optional spec file
```

**Viewing Results:**
- Check the Actions tab for pipeline status
- Download artifacts for failed test screenshots
- Review test videos for debugging

#### Environment Configuration:
```yaml
# Optional: Configure Cypress Dashboard (uncomment in workflow)
CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Setting Up Cypress Dashboard (Optional):
1. Sign up at [Cypress Dashboard](https://dashboard.cypress.io/)
2. Create a project and get your Record Key
3. Add `CYPRESS_RECORD_KEY` to GitHub repository secrets
4. Uncomment dashboard-related lines in the workflow file

### Pipeline Status Badge:
Add this badge to your README to show pipeline status:
```markdown
![Cypress Tests](https://github.com/your-username/your-repo/workflows/Cypress%20Tests/badge.svg)
```

## Page Object Model
All UI tests use Page Object classes in `cypress/support/pages/` for better maintainability. Each page class encapsulates selectors and actions for its respective page.

## Custom Commands
Reusable Cypress commands are defined in `cypress/support/commands.ts`.

## Adding New Tests
1. Create a new spec file in `cypress/e2e/ui/` or `cypress/e2e/api/`.
2. Create or update a Page Object in `cypress/support/pages/`.
3. Write your test using the Page Object methods.

## Contributing
Feel free to fork and submit pull requests. For major changes, open an issue first to discuss what you would like to change.

### Development Workflow:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run tests locally: `npm run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

The CI/CD pipeline will automatically run tests on your pull request to ensure code quality and functionality.

## License
MIT
