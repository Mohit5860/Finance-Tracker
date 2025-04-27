# Personal Finance Tracker

A simple web application to track personal finances. This tool allows users to manage transactions, view expense summaries, categorize spending, and set budgets, all while providing insightful visualizations to help manage and analyze personal finances.

## Tech Stack

- **Frontend**:
  - **Next.js** (React framework)
  - **React** (for component-based architecture)
  - **shadcn/ui** (UI components)
  - **Recharts** (charting library for visualizing expenses)
  
- **Backend**:
  - **MongoDB** (for storing transactions and budget data)

- **Deployment**:
  - Deployed using Vercel (for the frontend)
  - MongoDB Atlas (for cloud database hosting)

## API Endpoints

### **Transactions**

- **GET** `/api/transactions/get` - Get all transactions.
- **POST** `/api/transactions/add` - Add a new transaction.
- **PUT** `/api/transactions/update` - Update an existing transaction.
- **DELETE** `/api/transactions/delete` - Delete a transaction.

### **Budgets**

- **GET** `/api/budgets/get` - Get all budget data.
- **POST** `/api/budgets` - Set a new budget for a category.

### **Summary**

- **GET** `/api/transactions/summary` - Get the summary data (total expenses, category breakdown, etc.).

## Deployment

You can access the live version of the application [here]([https://your-deployed-app-url.com](https://finance-tracker-pyj708bvm-mohit5860s-projects.vercel.app/)).
