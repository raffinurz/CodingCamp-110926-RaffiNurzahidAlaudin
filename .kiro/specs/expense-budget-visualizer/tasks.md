# Implementation Plan: Expense & Budget Visualizer

## Overview

This implementation plan breaks down the development of the Expense & Budget Visualizer into discrete, manageable tasks. The application will be built using vanilla JavaScript, HTML5, and CSS3, with Chart.js for data visualization. The implementation follows a bottom-up approach, starting with core data structures and building up to the full user interface.

## Tasks

- [ ] 1. Set up project structure and HTML foundation
  - Create the base HTML file with semantic structure
  - Include Chart.js CDN link
  - Define all form elements, buttons, and display sections
  - Add proper meta tags for responsive design
  - _Requirements: 10.7_

- [ ] 2. Implement core data models and utilities
  - [ ] 2.1 Create storage management functions
    - Implement `saveTransactions()` to serialize and store transaction array
    - Implement `loadTransactions()` to deserialize from Local Storage
    - Implement `saveSpendingLimit()` and `loadSpendingLimit()`
    - Implement `saveTheme()` and `loadTheme()`
    - Add error handling for storage quota and parsing errors
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 8.1, 8.8, 9.4, 9.5, 12.1_

  - [ ]* 2.2 Write property test for storage round-trip
    - **Property 1: Transaction Serialization Round-Trip**
    - **Validates: Requirements 2.5, 2.6**

  - [ ] 2.3 Create formatting and calculation utilities
    - Implement `formatCurrency()` using Intl.NumberFormat for IDR
    - Implement `calculateTotal()` to sum transaction amounts
    - Implement `calculateCategoryTotals()` to aggregate by category
    - _Requirements: 3.3, 5.1, 7.4_

  - [ ]* 2.4 Write property tests for calculations
    - **Property 2: Balance Calculation Consistency**
    - **Validates: Requirements 5.1, 5.2, 5.3**
    - **Property 4: Category Aggregation Completeness**
    - **Validates: Requirements 7.4**
    - **Property 5: Currency Formatting Consistency**
    - **Validates: Requirements 3.3**
    - **Property 9: Category Total Non-Negativity**
    - **Validates: Requirements 7.4**

- [ ] 3. Implement validation module
  - [ ] 3.1 Create input validation functions
    - Implement `validateTransaction()` to check name, amount, and category
    - Implement `validateSpendingLimit()` to check limit value
    - Add whitespace trimming for item name
    - Add numeric conversion and range checks for amounts
    - _Requirements: 1.2, 1.3, 8.2, 8.3, 11.1, 11.3, 11.4, 11.5, 11.6, 11.7_

  - [ ]* 3.2 Write unit tests for validation
    - Test empty field rejection
    - Test zero/negative amount rejection
    - Test whitespace trimming
    - Test valid input acceptance
    - _Requirements: 1.2, 1.3, 11.5, 11.6, 11.7_

- [ ] 4. Implement transaction management
  - [ ] 4.1 Create transaction add/delete functions
    - Implement transaction creation with unique ID generation using `Date.now()`
    - Implement `deleteTransaction()` to filter by ID
    - Ensure transaction objects match the data model (id, name, amount, category)
    - _Requirements: 1.1, 1.4, 1.5, 4.1, 4.5_

  - [ ]* 4.2 Write property test for ID uniqueness
    - **Property 7: Transaction ID Uniqueness**
    - **Validates: Requirements 1.1, 4.5**

  - [ ] 4.3 Implement transaction sorting
    - Implement sort logic for "newest" (descending by id)
    - Implement sort logic for "amount-high" (descending by amount)
    - Implement sort logic for "amount-low" (ascending by amount)
    - Implement sort logic for "category" (alphabetical)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_

  - [ ]* 4.4 Write property tests for sorting
    - **Property 3: Sort Stability**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.6**
    - **Property 8: Sort Order Preservation**
    - **Validates: Requirements 6.1**

- [ ] 5. Checkpoint - Core logic verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement UI rendering functions
  - [ ] 6.1 Create transaction list rendering
    - Implement `displayTransactions()` to render transaction items to DOM
    - Display empty message when no transactions exist
    - Format each transaction with name, category badge, amount, and delete button
    - Add onclick handlers for delete buttons
    - _Requirements: 3.1, 3.2, 3.4, 3.5_

  - [ ] 6.2 Create balance and limit display functions
    - Implement `updateTotalBalance()` to display formatted total
    - Implement `updateLimitStatus()` to show spending limit and warning state
    - Add conditional styling for over-limit state (red background)
    - _Requirements: 5.4, 5.5, 8.5, 8.6, 8.7, 8.9_

  - [ ]* 6.3 Write unit tests for rendering functions
    - Test empty state message display
    - Test transaction item rendering
    - Test balance formatting
    - Test limit warning state transitions
    - _Requirements: 3.2, 5.5, 8.6, 8.7_

- [ ] 7. Implement Chart.js visualization
  - [ ] 7.1 Create chart management functions
    - Implement `updateChart()` to create/update pie chart
    - Implement chart destruction before recreation to prevent memory leaks
    - Configure chart with category labels and bottom legend
    - Calculate data array from category totals
    - Add error handling for Chart.js load failures
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [ ]* 7.2 Write integration tests for chart updates
    - Test chart creation with transaction data
    - Test chart updates after transaction changes
    - Test chart with empty data
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 8. Implement theme management
  - [ ] 8.1 Create theme toggle functionality
    - Implement `toggleTheme()` to switch between dark and light modes
    - Implement `updateTheme()` to apply CSS classes to body
    - Update theme button icon based on current mode (☀️ for dark, 🌙 for light)
    - Persist theme preference to Local Storage on change
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.6, 9.7_

  - [ ]* 8.2 Write unit tests for theme management
    - Test theme toggle state changes
    - Test theme persistence
    - Test CSS class application
    - _Requirements: 9.1, 9.4, 9.5, 9.6, 9.7_

- [ ] 9. Wire up event handlers
  - [ ] 9.1 Connect form submission handler
    - Add event listener to transaction form
    - Extract and validate form inputs
    - Create and add transaction on valid input
    - Display validation errors via alerts
    - Reset form after successful submission
    - Call centralized update function
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 11.1, 11.2_

  - [ ] 9.2 Connect spending limit handler
    - Add event listener to set limit button
    - Validate limit input
    - Save limit to storage
    - Clear input field after successful save
    - Update limit display
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 9.3 Connect sort option handler
    - Add event listener to sort dropdown
    - Call sort function with selected option
    - Re-render transaction list
    - _Requirements: 6.5_

  - [ ] 9.4 Connect theme toggle handler
    - Add event listener to theme button
    - Toggle theme state and update UI
    - _Requirements: 9.1_

- [ ] 10. Implement centralized update function
  - Create `updateApp()` that calls all update functions in sequence
  - Call `updateTotalBalance()`, `displayTransactions()`, `updateChart()`, and `updateLimitStatus()`
  - Ensure this function is called after every state change
  - _Requirements: 4.2, 4.3, 5.2, 5.3, 7.2, 7.3_

- [ ] 11. Checkpoint - Integration verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement application initialization
  - [ ] 12.1 Create initialization logic
    - Load all data from Local Storage on page load
    - Initialize transaction array from storage or empty array
    - Initialize spending limit from storage or 0
    - Initialize theme preference from storage or false (light mode)
    - Call `updateApp()` to render initial state
    - Call `updateTheme()` to apply saved theme
    - Call `updateLimitStatus()` to display limit
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

  - [ ]* 12.2 Write integration tests for initialization
    - Test loading with existing data
    - Test loading with empty storage
    - Test loading with corrupted data
    - _Requirements: 12.1, 12.7_

- [ ] 13. Implement CSS styling
  - [ ] 13.1 Create base styles and layout
    - Style container with max-width and centered layout
    - Style header, balance card, and form cards
    - Implement card shadow and border radius
    - _Requirements: 10.7_

  - [ ] 13.2 Style form elements and buttons
    - Style input fields, select dropdowns, and buttons
    - Add focus states for accessibility
    - Style delete buttons and add button
    - _Requirements: 11.2_

  - [ ] 13.3 Style transaction list
    - Style transaction items with flexbox layout
    - Style category badges
    - Add scrolling for long lists (max-height: 350px)
    - _Requirements: 3.5_

  - [ ] 13.4 Style spending limit section
    - Style limit form with flex layout
    - Style balance card limit info section
    - Add over-limit warning styles (red background)
    - _Requirements: 8.6, 8.7_

  - [ ] 13.5 Implement dark mode styles
    - Create dark mode color scheme for all components
    - Style dark mode backgrounds, text, and borders
    - Ensure contrast meets accessibility standards
    - _Requirements: 9.6, 9.7_

  - [ ] 13.6 Implement responsive design
    - Add mobile breakpoint at 600px
    - Stack section headers vertically on mobile
    - Make sort dropdown full-width on mobile
    - Adjust transaction item layout for small screens
    - Stack limit form vertically on mobile
    - Adjust header layout for mobile
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 14. Add property-based test for spending limit logic
  - [ ]* 14.1 Write property test for limit comparison
    - **Property 6: Spending Limit Comparison**
    - **Validates: Requirements 8.6, 8.7**

- [ ] 15. Final integration and polish
  - [ ] 15.1 Verify all requirements coverage
    - Test all user stories end-to-end
    - Verify data persistence across page reloads
    - Verify responsive behavior at different viewport sizes
    - Verify theme persistence and appearance
    - Verify all validation messages display correctly
    - _Requirements: All_

  - [ ]* 15.2 Write end-to-end integration tests
    - Test complete flow: add transaction → sort → delete → verify persistence
    - Test spending limit flow: set limit → add transactions → verify warning
    - Test theme flow: toggle theme → reload → verify persistence
    - _Requirements: 1.1, 1.4, 4.1, 6.5, 8.1, 9.1_

- [ ] 16. Final checkpoint - Complete verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests validate universal correctness properties defined in the design
- Unit tests validate specific examples and edge cases
- The implementation follows a bottom-up approach: data layer → business logic → UI → integration
- Chart.js is loaded via CDN, so no build process is required
- All state mutations must update Local Storage and call `updateApp()` for UI consistency
- The centralized `updateApp()` function ensures all UI components stay synchronized
- Dark mode is CSS-based (not media query) to give users explicit control
- Error handling should be implemented for Local Storage quota and JSON parsing failures

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.3", "3.1"] },
    { "id": 2, "tasks": ["2.2", "2.4", "3.2", "4.1"] },
    { "id": 3, "tasks": ["4.2", "4.3"] },
    { "id": 4, "tasks": ["4.4", "6.1", "6.2"] },
    { "id": 5, "tasks": ["6.3", "7.1", "8.1"] },
    { "id": 6, "tasks": ["7.2", "8.2", "9.1", "9.2", "9.3", "9.4"] },
    { "id": 7, "tasks": ["10", "12.1"] },
    { "id": 8, "tasks": ["12.2", "13.1", "13.2", "13.3", "13.4", "13.5", "13.6"] },
    { "id": 9, "tasks": ["14.1", "15.1"] },
    { "id": 10, "tasks": ["15.2"] }
  ]
}
```
