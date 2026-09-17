# Requirements Document

## Introduction

The Expense & Budget Visualizer is a web application that enables users to track their daily spending by recording transactions with item names, amounts, and categories. The application provides visual insights through a pie chart showing spending distribution and maintains transaction history with sorting and deletion capabilities. All data persists locally in the browser, and the interface adapts to different screen sizes while supporting both dark and light themes.

## Glossary

- **Application**: The Expense & Budget Visualizer web application
- **Transaction**: A single expense record containing item name, amount, and category
- **Local_Storage**: Browser-based persistent storage mechanism
- **Transaction_List**: The displayed collection of all recorded transactions
- **Spending_Limit**: User-defined maximum spending threshold
- **Total_Balance**: The sum of all transaction amounts
- **Category**: Classification of a transaction (Food, Transport, or Fun)
- **Theme**: Visual appearance mode (dark or light)
- **Pie_Chart**: Circular graph displaying spending distribution by category
- **Sort_Option**: User-selected ordering method for transactions

## Requirements

### Requirement 1: Transaction Management

**User Story:** As a user, I want to add expense transactions with details, so that I can track my spending.

#### Acceptance Criteria

1. WHEN the user submits a transaction form with valid item name, amount, and category, THE Application SHALL create a new transaction with a unique identifier and current timestamp
2. WHEN the user submits a transaction form with missing fields, THE Application SHALL display an error message and prevent transaction creation
3. WHEN the user submits a transaction form with an amount less than or equal to zero, THE Application SHALL display an error message and prevent transaction creation
4. WHEN a transaction is created, THE Application SHALL add it to the Transaction_List
5. WHEN a transaction is created, THE Application SHALL clear the form inputs
6. THE Application SHALL provide three category options: Food, Transport, and Fun

### Requirement 2: Transaction Persistence

**User Story:** As a user, I want my transactions to remain after refreshing the browser, so that I don't lose my data.

#### Acceptance Criteria

1. WHEN a transaction is created, THE Application SHALL save all transactions to Local_Storage
2. WHEN a transaction is deleted, THE Application SHALL update Local_Storage with the remaining transactions
3. WHEN the application loads, THE Application SHALL retrieve all transactions from Local_Storage
4. IF no transactions exist in Local_Storage, THEN THE Application SHALL initialize with an empty transaction list
5. THE Application SHALL serialize transactions as JSON before storing
6. THE Application SHALL deserialize transactions from JSON when retrieving

### Requirement 3: Transaction Display

**User Story:** As a user, I want to view all my transactions in a list, so that I can review my spending history.

#### Acceptance Criteria

1. WHEN transactions exist, THE Application SHALL display each transaction with item name, category, and formatted amount
2. WHEN no transactions exist, THE Application SHALL display a message indicating the list is empty
3. THE Application SHALL format currency amounts using Indonesian Rupiah (IDR) format with thousand separators
4. THE Application SHALL display transactions in the current sort order
5. WHEN the Transaction_List contains more than 350 pixels of content, THE Application SHALL enable vertical scrolling

### Requirement 4: Transaction Deletion

**User Story:** As a user, I want to delete individual transactions, so that I can remove incorrect or unwanted entries.

#### Acceptance Criteria

1. WHEN a user clicks the delete button on a transaction, THE Application SHALL remove that transaction from the Transaction_List
2. WHEN a transaction is deleted, THE Application SHALL update the Total_Balance
3. WHEN a transaction is deleted, THE Application SHALL update the Pie_Chart
4. WHEN a transaction is deleted, THE Application SHALL persist changes to Local_Storage
5. THE Application SHALL identify transactions by their unique identifier for deletion

### Requirement 5: Total Balance Calculation

**User Story:** As a user, I want to see my total spending, so that I understand how much I've spent overall.

#### Acceptance Criteria

1. WHEN transactions are displayed, THE Application SHALL calculate the Total_Balance by summing all transaction amounts
2. WHEN a transaction is added, THE Application SHALL update the Total_Balance
3. WHEN a transaction is deleted, THE Application SHALL update the Total_Balance
4. THE Application SHALL display the Total_Balance in IDR currency format
5. WHEN no transactions exist, THE Application SHALL display a Total_Balance of Rp 0

### Requirement 6: Transaction Sorting

**User Story:** As a user, I want to sort transactions by different criteria, so that I can analyze my spending patterns.

#### Acceptance Criteria

1. WHEN the user selects "Newest" sort option, THE Application SHALL order transactions by timestamp in descending order
2. WHEN the user selects "Amount: High to Low" sort option, THE Application SHALL order transactions by amount in descending order
3. WHEN the user selects "Amount: Low to High" sort option, THE Application SHALL order transactions by amount in ascending order
4. WHEN the user selects "Category" sort option, THE Application SHALL order transactions alphabetically by category name
5. WHEN the sort option changes, THE Application SHALL re-render the Transaction_List immediately
6. THE Application SHALL preserve the transaction data while sorting (no data loss)

### Requirement 7: Spending Distribution Visualization

**User Story:** As a user, I want to see a pie chart of my spending by category, so that I can visualize where my money goes.

#### Acceptance Criteria

1. WHEN transactions exist, THE Application SHALL display a Pie_Chart showing spending distribution across Food, Transport, and Fun categories
2. WHEN a transaction is added, THE Application SHALL update the Pie_Chart
3. WHEN a transaction is deleted, THE Application SHALL update the Pie_Chart
4. THE Application SHALL calculate category totals by summing amounts for each category
5. THE Application SHALL display the Pie_Chart with category labels and a legend positioned at the bottom
6. WHEN the Pie_Chart is updated, THE Application SHALL destroy the previous chart instance before creating a new one
7. THE Application SHALL maintain the Pie_Chart's aspect ratio while remaining responsive

### Requirement 8: Spending Limit Management

**User Story:** As a user, I want to set a spending limit and receive warnings when I exceed it, so that I can control my budget.

#### Acceptance Criteria

1. WHEN the user sets a valid spending limit, THE Application SHALL store it in Local_Storage
2. WHEN the user sets a spending limit of zero or less, THE Application SHALL display an error message and prevent the update
3. WHEN the user sets a spending limit with an empty field, THE Application SHALL display an error message and prevent the update
4. WHEN a spending limit is set, THE Application SHALL clear the limit input field
5. WHEN a spending limit is set, THE Application SHALL display the limit amount in the balance card
6. WHEN the Total_Balance exceeds the spending limit, THE Application SHALL change the balance card background color to red
7. WHEN the Total_Balance is below or equal to the spending limit, THE Application SHALL display the balance card with the normal blue background
8. WHEN the application loads, THE Application SHALL retrieve the spending limit from Local_Storage
9. WHEN no spending limit is set, THE Application SHALL display "Not set" as the limit status

### Requirement 9: Theme Switching

**User Story:** As a user, I want to toggle between dark and light modes, so that I can use the app comfortably in different lighting conditions.

#### Acceptance Criteria

1. WHEN the user clicks the theme toggle button, THE Application SHALL switch between dark mode and light mode
2. WHEN dark mode is active, THE Application SHALL display a sun icon (☀️) in the theme toggle button
3. WHEN light mode is active, THE Application SHALL display a moon icon (🌙) in the theme toggle button
4. WHEN the theme changes, THE Application SHALL persist the preference to Local_Storage
5. WHEN the application loads, THE Application SHALL retrieve the theme preference from Local_Storage
6. WHEN dark mode is active, THE Application SHALL apply dark background colors, light text, and adjusted component styles
7. WHEN light mode is active, THE Application SHALL apply light background colors, dark text, and standard component styles

### Requirement 10: Responsive Design

**User Story:** As a user, I want the app to work well on mobile devices, so that I can track expenses on any device.

#### Acceptance Criteria

1. WHEN the viewport width is 600 pixels or less, THE Application SHALL adjust the layout for mobile screens
2. WHEN in mobile view, THE Application SHALL stack the section header elements vertically
3. WHEN in mobile view, THE Application SHALL make the sort dropdown full width
4. WHEN in mobile view, THE Application SHALL adjust transaction item layout to accommodate smaller screens
5. WHEN in mobile view, THE Application SHALL stack spending limit form elements vertically
6. THE Application SHALL remain functional and readable at all supported viewport sizes
7. THE Application SHALL use a maximum container width of 700 pixels for optimal readability

### Requirement 11: Input Validation and User Feedback

**User Story:** As a user, I want clear feedback when I make errors, so that I understand how to use the app correctly.

#### Acceptance Criteria

1. WHEN validation fails, THE Application SHALL display an alert message explaining the error
2. WHEN a form is successfully submitted, THE Application SHALL provide visual feedback through updated displays
3. THE Application SHALL trim whitespace from item name inputs before validation
4. THE Application SHALL convert amount inputs to numbers for validation
5. THE Application SHALL validate all required fields are filled before creating a transaction
6. THE Application SHALL validate amount is greater than zero before creating a transaction
7. THE Application SHALL validate spending limit is greater than zero before updating

### Requirement 12: Initial Application State

**User Story:** As a user, I want the app to load with my previous data and preferences, so that I can continue where I left off.

#### Acceptance Criteria

1. WHEN the application loads, THE Application SHALL initialize all data from Local_Storage
2. WHEN the application loads, THE Application SHALL display the Total_Balance
3. WHEN the application loads, THE Application SHALL display all saved transactions
4. WHEN the application loads, THE Application SHALL render the Pie_Chart with saved data
5. WHEN the application loads, THE Application SHALL apply the saved theme preference
6. WHEN the application loads, THE Application SHALL display the saved spending limit status
7. WHEN the application loads with no saved data, THE Application SHALL initialize with empty state and default settings
