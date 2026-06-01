# Authentication Documentation

## Overview

FinTrack now includes a comprehensive user authentication system that allows users to create accounts, log in securely, and manage their financial data with user-specific isolation.

## Features

### User Registration
- **Email-based signup** with validation
- **Password strength requirements** (minimum 6 characters)
- **Password confirmation** matching
- **Automatic email uniqueness** checking
- **Real-time validation feedback** during form input

### Secure Login
- **Email and password authentication**
- **JWT token-based sessions** (30-day expiration)
- **Secure password hashing** using bcryptjs
- **Remember me** functionality via localStorage
- **Error handling** with helpful messages

### User Profile
- **Profile dropdown** in navbar with user info
- **Quick logout** option
- **User greeting** in dashboard
- **Settings access** link

### Protected Routes
- **Automatic redirection** to login for unauthenticated users
- **Loading states** while checking authentication
- **Client-side route protection** on all protected pages
- **Persistent sessions** across browser sessions

## Technical Implementation

### Database

#### User Model (`src/models/User.js`)
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  profileImage: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints

#### POST `/api/auth/register`
Register a new user account

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Missing fields or validation failure
- `409` - Email already registered
- `500` - Server error

#### POST `/api/auth/login`
Authenticate and retrieve session token

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

### Authentication Context

#### AuthContext (`src/context/AuthContext.jsx`)

Provides global authentication state and methods:

```javascript
{
  user: {
    id: string,
    name: string,
    email: string
  } | null,
  loading: boolean,
  error: string | null,
  isAuthenticated: boolean,
  register: (name, email, password, confirmPassword) => Promise,
  login: (email, password) => Promise,
  logout: () => void
}
```

#### useAuth Hook

Use in any client component to access authentication:

```javascript
import { useAuth } from "@/context/AuthContext";

export default function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <>
      {isAuthenticated && <p>Welcome, {user.name}!</p>}
    </>
  );
}
```

### Pages

#### Login Page (`/auth/login`)
- Email and password input fields
- "Forgot password?" link (future feature)
- Registration link
- Demo credentials display
- Error message display
- Loading states

#### Registration Page (`/auth/register`)
- Full name input
- Email input with validation
- Password input with strength indicators
- Password confirmation input
- Terms of service link (future)
- Login link for existing users
- Real-time form validation

### Protected Routes

All app pages (Dashboard, Analytics, Goals, Reports, Settings) are protected:

```javascript
export default function ProtectedPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading, router]);

  return isAuthenticated ? <PageContent /> : null;
}
```

## Security Features

### Password Security
- **Bcryptjs hashing** with 10 salt rounds
- **Never stored in plaintext** in database
- **Minimum 6 characters** requirement
- **Comparison without leaking** user existence

### Session Management
- **JWT tokens** with 30-day expiration
- **localStorage persistence** for convenience
- **Logout** clears all stored tokens
- **Token validation** on each protected endpoint (future)

### Input Validation
- **Email format validation** (regex pattern)
- **Required field validation** on registration
- **Password confirmation** matching
- **SQL injection prevention** (MongoDB)

### Error Handling
- **Generic error messages** to prevent user enumeration
- **Detailed server logging** for debugging
- **Graceful fallback** for context usage errors

## User Flow

### Registration Flow
```
1. User navigates to /auth/register
2. Enters name, email, password
3. Submits form
4. Server validates all fields
5. Checks email uniqueness
6. Hashes password
7. Creates user in database
8. Automatically logs in user
9. Redirects to dashboard
```

### Login Flow
```
1. User navigates to /auth/login
2. Enters email and password
3. Submits form
4. Server validates credentials
5. Hashes password and compares
6. Generates JWT token
7. Stores user and token in localStorage
8. Redirects to dashboard
```

### Logout Flow
```
1. User clicks logout in navbar dropdown
2. AuthContext clears user state
3. localStorage tokens removed
4. Redirects to login page
```

### Protected Route Access
```
1. User navigates to protected page
2. Component checks isAuthenticated
3. If false, redirects to login
4. If true, displays page content
5. Shows loading state while checking
```

## Environment Setup

### Required Environment Variables

Add to `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finance-tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-in-production
```

### MongoDB Setup

1. Create MongoDB Atlas account
2. Create a cluster
3. Create a database user
4. Whitelist your IP
5. Get connection string
6. Add to .env.local

### JWT Configuration

Change `JWT_SECRET` in production:
- Use strong random string (32+ characters)
- Never commit to version control
- Use environment variable only

## Future Enhancements

### Planned Features
- [ ] Social authentication (Google, GitHub)
- [ ] Password reset via email
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] User profile picture upload
- [ ] Update password functionality
- [ ] Account deletion option
- [ ] Login history and device management
- [ ] Session timeout security
- [ ] CSRF protection

### Security Improvements
- [ ] Rate limiting on auth endpoints
- [ ] IP-based account lockout after failed attempts
- [ ] Refresh token rotation
- [ ] HTTPS enforcement
- [ ] Cookie-based secure tokens
- [ ] OAuth 2.0 implementation

## Testing

### Test Accounts

For development/demo:

```
Email: demo@example.com
Password: demo123
```

### Testing Checklist

- [ ] User can register with valid email
- [ ] Duplicate email registration fails
- [ ] Short passwords are rejected
- [ ] Password confirmation mismatch fails
- [ ] User can login with correct credentials
- [ ] Invalid password login fails
- [ ] Invalid email login fails
- [ ] Logout clears authentication
- [ ] Protected pages redirect to login
- [ ] Dashboard accessible when logged in
- [ ] Dark mode works on auth pages
- [ ] Mobile responsive on auth pages
- [ ] Error messages display correctly
- [ ] Loading states appear during submission

## Troubleshooting

### Common Issues

**"useAuth must be used within AuthProvider"**
- Ensure component is wrapped with `<AuthProvider>`
- Check that LayoutWrapper is properly configured
- Verify AuthProvider is in layout.js

**"Cannot read property 'user' of null"**
- Wait for loading to complete before accessing user
- Check isAuthenticated before using user object
- Use optional chaining: `user?.name`

**Login not persisting after refresh**
- Check localStorage is enabled in browser
- Verify JWT_SECRET matches across requests
- Check MongoDB connection is working

**Password hashing fails**
- Ensure bcryptjs is installed: `npm install bcryptjs`
- Check Node.js version is 12+
- Verify async/await syntax is correct

## API Reference

### Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created (new user) |
| 400 | Bad request (validation failed) |
| 401 | Unauthorized (wrong credentials) |
| 409 | Conflict (email exists) |
| 500 | Server error |

### Response Format

All responses are JSON:

```json
{
  "message": "Description",
  "user": { ... },
  "error": "Error message",
  "token": "JWT token"
}
```

## Security Checklist

- [x] Passwords are hashed before storage
- [x] Email validation on registration
- [x] Email uniqueness checked
- [x] JWT tokens for sessions
- [x] Error messages don't reveal user existence
- [x] Input sanitization
- [x] HTTPS ready (deploy with HTTPS)
- [x] Environment variables for secrets
- [ ] Rate limiting (future)
- [ ] CSRF tokens (future)
- [ ] 2FA support (future)

## Support

For issues or questions about authentication:
1. Check the troubleshooting section
2. Review error messages in console
3. Check MongoDB connection
4. Verify environment variables
5. Open an issue on GitHub

---

**Last Updated:** June 2026  
**Version:** 1.0.0
