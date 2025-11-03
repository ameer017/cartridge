# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.1.0 (2025-11-03)


### Features

* implement Cartridge SDK for user authentication CRUD generation ([ed33c17](https://github.com/ameer017/cartridge/commit/ed33c17c4d51b503267088b807bbff08b53ee700))
* **nodejs:** add centralized error handler and async wrapper\n\n- Add helper/errorHandler.js with custom error classes and global handlers\n- Wire up notFoundHandler and errorHandler in index.js\n- Update auth middleware to throw AuthenticationError\n- Wrap controllers with asyncHandler and use typed errors ([de04f73](https://github.com/ameer017/cartridge/commit/de04f7304bacf6813aba0541f02eff2eaf86dd8b))
