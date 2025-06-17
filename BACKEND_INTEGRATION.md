# Backend Integration Guide

This document outlines the backend integration changes made to connect the React frontend to your backend server running on `http://localhost:5000`.

## Configuration

### API Configuration File
Created `src/config/api.js` to centralize all API endpoints and configuration:

```javascript
export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
```

## Updated Components

### 1. Authentication Components
- **Login** (`src/components/login/login.jsx`)
  - Now uses `API_ENDPOINTS.LOGIN` for user authentication
  - Stores user token and type in localStorage
  - Redirects based on user type (employer/jobseeker)

- **Signup** (`src/components/signup/signup.jsx`)
  - Now uses `API_ENDPOINTS.SIGNUP` for user registration
  - Handles both jobseeker and employer registration
  - Redirects to login after successful registration

### 2. Admin Dashboard Components
- **Admin Login** (`src/components/admin-dashboard/adminlogin/adminlogin.jsx`)
  - Uses `API_ENDPOINTS.ADMIN_LOGIN` for admin authentication
  - Stores admin token in localStorage

- **Admin Signup** (`src/components/admin-dashboard/adminsignup/adminsignup.jsx`)
  - Uses `API_ENDPOINTS.ADMIN_SIGNUP` for admin registration

- **Add Job** (`src/components/admin-dashboard/addjob/addjob.jsx`)
  - Uses `API_ENDPOINTS.ADD_JOB` to create new job postings

- **Job List** (`src/components/admin-dashboard/joblist/joblist.jsx`)
  - Uses `API_ENDPOINTS.JOBS` to fetch jobs
  - Uses `API_ENDPOINTS.DELETE_JOB(id)` to delete jobs

- **Notification Sender** (`src/components/admin-dashboard/notificationsender/notificationsender.jsx`)
  - Uses `API_ENDPOINTS.SEND_NOTIFICATION` to send notifications

- **Schedule Interview** (`src/components/admin-dashboard/scheduleinterview/scheduleinterview.jsx`)
  - Uses `API_ENDPOINTS.SEND_EMAIL` to schedule interviews

### 3. Job Components
- **JobCard** (`src/components/jobcard/jobcard.jsx`)
  - Uses `API_ENDPOINTS.JOBS` to fetch job listings
  - Replaced mock API with backend integration

### 4. Blog Component
- **Blog** (`src/components/blogs/blog.jsx`)
  - Uses `API_ENDPOINTS.BLOG` for CRUD operations
  - Uncommented and updated API calls

### 5. Resume Component
- **Resume** (`src/components/resume/resume.jsx`)
  - Uses `API_ENDPOINTS.RESUME` for saving/loading resumes
  - Added backend integration for resume management

## API Endpoints Used

The following endpoints are expected to be available on your backend:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Admin registration

### Jobs
- `GET /api/jobs` - Fetch all jobs
- `POST /api/jobs` - Create new job
- `DELETE /api/jobs/:id` - Delete job by ID

### Admin Features
- `POST /api/send-notification` - Send notifications
- `POST /api/send-email` - Send emails (for interviews)

### Blog
- `GET /api/blog` - Fetch all blog posts
- `POST /api/blog` - Create new blog post
- `DELETE /api/blog/:id` - Delete blog post

### Resume
- `GET /api/resume` - Fetch user resumes
- `POST /api/resume` - Save new resume
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume

## Environment Variables

To customize the backend URL, create a `.env.local` file in the project root:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Error Handling

All components now include proper error handling:
- Network errors are caught and displayed to users
- Loading states are managed during API calls
- Success messages are shown after successful operations

## Next Steps

1. Ensure your backend server is running on `http://localhost:5000`
2. Implement the required API endpoints on your backend
3. Test the integration by running the frontend application
4. Adjust API endpoints in `src/config/api.js` if your backend uses different routes

## Testing

To test the integration:
1. Start your backend server on port 5000
2. Run the React application: `npm run dev`
3. Test user registration and login
4. Test admin features
5. Test job posting and management
6. Test blog and resume features 