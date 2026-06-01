# FinTrack - Personal Finance Manager

A modern, feature-rich personal finance management application built with Next.js and React. Track expenses, set budgets, achieve savings goals, and gain insights into your spending patterns with beautiful charts and analytics.

## 🌟 Features

### Core Functionality
- **Transaction Management**: Add, view, and delete financial transactions with categories
- **Budget Planning**: Set monthly budgets per category and track spending against targets
- **Savings Goals**: Create and monitor progress towards financial goals (emergency fund, vacation, education, etc.)
- **Advanced Analytics**: Comprehensive financial reports with filtering and export options
- **Data Visualization**: Interactive charts showing spending trends, category breakdown, and budget comparisons
- **Spending Insights**: Automated alerts when you exceed budgets

### User Experience
- **Dark Mode**: Full dark mode support with automatic system preference detection
- **Multi-Page Application**: Dashboard, Analytics, Goals, Reports, and Settings pages
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Data Export**: Export transactions and financial data as CSV or JSON backup
- **Smart Navigation**: Easy-to-use navigation bar with active page indication

## 🏗️ Tech Stack

### Frontend
- **Next.js 15.3.1** - React framework with server-side rendering
- **React 19.0.0** - Component-based UI library
- **shadcn/ui** - High-quality, accessible UI components
- **Tailwind CSS 4** - Utility-first CSS framework
- **Recharts 2.15.3** - Composable charting library
- **Lucide React** - Beautiful icon library
- **date-fns** - Modern date utility library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling

### Deployment
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Cloud database

## 📋 Project Structure

```
src/
├── app/
│   ├── layout.js                 # Root layout with dark mode
│   ├── page.js                   # Dashboard page
│   ├── globals.css               # Global styles
│   ├── analytics/page.js         # Analytics & Reports with filtering
│   ├── goals/page.js             # Savings goals tracker
│   ├── reports/page.js           # Monthly financial reports
│   ├── settings/page.js          # User settings & preferences
│   └── api/
│       ├── transactions/         # Transaction API endpoints
│       ├── budgets/              # Budget API endpoints
│       └── goals/                # Goals API endpoints
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx            # Navigation component
│   │   └── LayoutWrapper.jsx     # Layout with dark mode
│   ├── forms/
│   │   ├── TransactionForm.jsx
│   │   └── BudgetForm.jsx
│   ├── charts/
│   │   ├── MonthlyExpensesChart.jsx
│   │   ├── CategoryPieChart.jsx
│   │   └── BudgetVsActualChart.jsx
│   ├── dashboard/
│   │   └── SummaryCards.jsx
│   ├── transactions/
│   │   └── TransactionList.jsx
│   ├── insights/
│   │   └── SpendingInsights.jsx
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── db.js                     # MongoDB connection
│   └── utils.js                  # Helper functions
└── models/
    ├── Transaction.js
    ├── Budget.js
    └── Goal.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your MongoDB URI
# Get your connection string from MongoDB Atlas: https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finance-tracker?retryWrites=true&w=majority
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to `http://localhost:3000`

## 📖 Usage

### Dashboard
- View your financial overview with summary cards
- Add new transactions with amount, date, description, and category
- Set monthly budgets for different spending categories
- See at-a-glance charts for spending trends

### Analytics
- Filter transactions by time period (week, month, year, all-time)
- Filter by spending category
- View detailed transaction table
- Export filtered data as CSV
- Track key metrics (total, average, largest expense)

### Goals
- Create savings goals with target amounts and deadlines
- Track progress with visual progress bars
- Update goal progress as you save
- Set goals for various categories (savings, investment, vacation, education)
- Get deadline warnings for overdue goals

### Reports
- Generate monthly financial reports
- See category spending breakdown with percentages
- View all transactions for a specific month
- Export full reports as text files
- Compare spending across different time periods

### Settings
- Manage profile information and preferences
- Configure currency preference
- Enable/disable notifications
- Export all financial data as JSON backup
- Delete all data (with confirmation)

## 🔑 API Endpoints

### Transactions
- `GET /api/transactions/get` - Get all transactions
- `POST /api/transactions/add` - Add new transaction
- `DELETE /api/transactions/delete?id={id}` - Delete transaction
- `GET /api/transactions/summary` - Get summary data
- `GET /api/transactions/monthly` - Get monthly aggregates
- `GET /api/transactions/categories` - Get category breakdown

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create/update budget
- `GET /api/budgets/compare` - Compare budget vs actual
- `GET /api/budgets/insights` - Get spending insights

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/[id]` - Update goal progress
- `DELETE /api/goals?id={id}` - Delete goal

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradient headers
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark Mode**: Full dark mode support with smooth transitions
- **Color-Coded Categories**: Easy identification of transaction types
- **Smooth Animations**: Hover effects and transitions for better UX
- **Accessible Components**: Built on Radix UI for accessibility
- **Consistent Spacing**: Proper padding and margins throughout

## 📊 Example Use Cases

1. **Track Monthly Spending**: Add all expenses and view category breakdown
2. **Budget Planning**: Set budgets for each category and monitor spending
3. **Goal Tracking**: Create a savings goal and track progress monthly
4. **Financial Analysis**: Generate monthly reports to identify spending trends
5. **Data Backup**: Export your data regularly as backup

## 🔐 Security Notes

- All data is stored securely in MongoDB Atlas
- Environment variables are used for sensitive credentials
- No personal data is sent to external services
- Data export is local and not shared with third parties

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables in Vercel dashboard

3. **Deploy**
```bash
vercel
```

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure `MONGODB_URI` is set in `.env.local`
- Check MongoDB Atlas cluster is running
- Verify IP address is whitelisted in MongoDB Atlas

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Run build again: `npm run build`

### Dark Mode Not Working
- Clear browser cache
- Check that JavaScript is enabled
- Verify `html` element has `dark` class for dark mode

## 📈 Future Enhancements

- Recurring transactions
- Budget notifications via email
- Multi-currency support
- Investment tracking
- Tax report generation
- Mobile app (React Native)
- Social sharing of financial milestones
- Machine learning for spending predictions

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Made with ❤️ for better financial management**
