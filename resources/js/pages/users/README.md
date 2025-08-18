# Users Management Module

This directory contains the complete users management system for the Laravel + Inertia.js application with driver functionality.

## Features

### User Management Pages

#### 1. Users Index (`/users`)
- **Data Table**: Server-side paginated table with sorting and filtering
- **Search**: Full-text search across name, email, phone, user type, and address
- **Filters**: Multi-select filters for user type, status, and blood group
- **Actions**: View, Edit, and Delete buttons for each user
- **Stats**: Dashboard showing total users, active users, drivers, and admins
- **User Avatars**: Profile images with fallback initials

#### 2. User Show Page (`/users/{id}`)
- **User Profile**: Complete user information display with avatar
- **Contact Information**: Email, phone, WhatsApp, address
- **System Information**: User ID, email verification, login details
- **Status Badges**: Visual status indicators with icons
- **Actions**: Edit and Delete buttons

#### 3. User Edit Page (`/users/{id}/edit`)
- **Form Validation**: Client and server-side validation
- **Pre-filled Data**: Form populated with existing user data
- **Password Update**: Optional password change functionality
- **Comprehensive Fields**: All user fields including personal and contact info

#### 4. User Create Page (`/users/create`)
- **New User Form**: Complete form for adding new users
- **Validation**: Required field validation and unique email
- **User Types**: Admin, Driver, Manager, Employee selection
- **Default Values**: Sensible defaults (active status)

## Database Schema

The users table includes comprehensive fields:
- `id` - Primary key
- `name` - Full name
- `email` - Unique email address
- `password` - Hashed password
- `phone` - Phone number
- `user_type` - User role (admin, driver, manager, employee)
- `blood_group` - Blood type (A+, A-, B+, B-, AB+, AB-, O+, O-)
- `image` - Profile image URL
- `status` - Account status (active, inactive, suspended)
- `address` - Full address
- `whatsapp_id` - WhatsApp contact
- `last_login_at` - Last login timestamp
- `last_login_ip` - Last login IP address
- `last_login_location` - Last login location
- `last_login_device` - Last login device
- `last_login_country` - Last login country
- `last_login_timezone` - Last login timezone
- `email_verified_at` - Email verification timestamp
- `department_id` - Department association
- `created_at` / `updated_at` - Timestamps

## Driver Functionality

### Conditional Sidebar Navigation
- **Driver Portal**: Only visible to users with `user_type = 'driver'`
- **Role-based Access**: Automatically shows/hides based on user authentication
- **Driver Pages**: My Routes, My Vehicle, Delivery Tracking, Work Schedule

### Driver-Specific Features
- **Route Management**: View assigned delivery routes
- **Vehicle Monitoring**: Check vehicle status and fuel levels
- **Delivery Tracking**: Track active deliveries and priorities
- **Work Schedule**: View upcoming shifts and assignments

## Backend Implementation

### UserController
- **index()**: Paginated listing with search and filters
- **create()**: Show create form with options
- **store()**: Save new user with validation
- **show()**: Display single user profile
- **edit()**: Show edit form with pre-filled data
- **update()**: Update existing user (optional password)
- **destroy()**: Delete user (with protection for current user)

### Request Validation Classes
- **UserIndexRequest**: Search, sort, filter, pagination validation
- **UserStoreRequest**: New user creation validation
- **UserUpdateRequest**: User update validation with unique email rule

### Routes
All standard RESTful routes:
- `GET /users` - Index page
- `GET /users/create` - Create form
- `POST /users` - Store new user
- `GET /users/{user}` - Show user
- `GET /users/{user}/edit` - Edit form
- `PUT/PATCH /users/{user}` - Update user
- `DELETE /users/{user}` - Delete user

## Sample Data

The `UserSeeder` creates:
- **1 Admin**: System Administrator with full access
- **3 Drivers**: John Driver, Sarah Wilson, Mike Johnson
- **2 Managers**: Alice Manager, Bob Supervisor
- **3 Employees**: Emma Employee, David Worker, Lisa Staff
- **10 Random Users**: Generated using factory
- **Mixed Statuses**: Active, inactive, and suspended users
- **Complete Profiles**: All fields populated with realistic data

## User Types & Access Control

### User Types
- **Admin**: Full system access
- **Driver**: Access to driver portal + standard features
- **Manager**: Management-level access
- **Employee**: Standard user access

### Status Types
- **Active**: Full access to the system
- **Inactive**: Limited or no access
- **Suspended**: Account temporarily disabled

## Navigation Integration

### Main Navigation
- **Users Menu**: Added to main sidebar and header navigation
- **Users Icon**: Users icon from Lucide React
- **Breadcrumbs**: Consistent navigation context

### Driver Portal
- **Conditional Display**: Only shows for driver user types
- **Separate Section**: "Driver Portal" section in sidebar
- **Driver Routes**: `/driver/routes`, `/driver/vehicle`, `/driver/tracking`, `/driver/schedule`

## UI Components & Features

### Data Table Features
- **Server-side Processing**: Efficient pagination and filtering
- **Advanced Search**: Multi-field search functionality
- **Column Sorting**: Sortable columns with direction indicators
- **Multi-select Filters**: User type, status, blood group filters
- **Row Actions**: View, edit, delete actions per row
- **Click to View**: Row click navigation to user details

### Form Features
- **Comprehensive Fields**: All user attributes covered
- **Validation**: Real-time and server-side validation
- **Password Confirmation**: Secure password handling
- **Optional Fields**: Flexible form with required/optional fields
- **Responsive Layout**: Mobile-friendly form design

### Visual Elements
- **User Avatars**: Profile images with fallback initials
- **Status Badges**: Color-coded status indicators with icons
- **User Type Badges**: Role identification badges
- **Blood Group Display**: Monospace font for medical info
- **Contact Icons**: Email, phone, location icons

## File Structure

```
resources/js/pages/users/
├── index.tsx           # User listing page
├── create.tsx          # User creation form
├── edit.tsx           # User edit form
├── show.tsx           # User details page
└── README.md          # This documentation

app/Http/
├── Controllers/
│   └── UserController.php      # User CRUD operations
└── Requests/
    ├── UserIndexRequest.php    # Index validation
    ├── UserStoreRequest.php    # Create validation
    └── UserUpdateRequest.php   # Update validation

database/
├── migrations/
│   └── 0001_01_01_000000_create_users_table.php
└── seeders/
    └── UserSeeder.php          # Sample user data

resources/js/pages/driver/
├── routes.tsx          # Driver route management
├── vehicle.tsx         # Driver vehicle status
├── tracking.tsx        # Driver delivery tracking
└── schedule.tsx        # Driver work schedule
```

## Testing

### Sample Login Credentials
- **Admin**: `admin@example.com` / `12345678`
- **Driver**: `driver@example.com` / `12345678`
- **Manager**: `alice.manager@example.com` / `12345678`
- **Employee**: `emma.employee@example.com` / `12345678`

### Testing Scenarios
1. **User Management**: Create, edit, delete users
2. **Driver Portal**: Login as driver to see driver-specific navigation
3. **Role-based Access**: Test different user types
4. **Search & Filter**: Test advanced filtering capabilities
5. **Status Management**: Test different user statuses

## Future Enhancements

Potential features to add:
- **Role Permissions**: Granular permission system
- **User Import/Export**: Bulk user management
- **Profile Pictures**: File upload for avatars
- **Two-Factor Authentication**: Enhanced security
- **User Activity Logs**: Track user actions
- **Department Management**: Enhanced department integration
- **Notification System**: User communication features
