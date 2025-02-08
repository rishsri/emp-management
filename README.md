# Employee Management App

A simple React application built with TypeScript that allows users to create customer accounts, log in, and manage employees. The app uses **localStorage** as a database to store customer and employee data.

## Features

- **Customer Sign-Up**: Users can create a new customer account with a unique email and password.
- **Login/Logout**: Customers can log in and log out securely.
- **Employee Management**:
  - Add new employees (name, role, email).
  - View a list of employees associated with the logged-in customer.
- **Form Validation**: Ensures valid input for customer and employee forms.
- **Persistent Data**: Uses localStorage to store customer and employee data.

## Technologies Used

### Frontend:
- React (with TypeScript)
- React Router (for navigation)
- React Toastify (for notifications)
- Lucide React (for icons)

### State Management:
- React Context API (for authentication and customer data)

### Styling:
- CSS (custom styles)

### Data Storage:
- localStorage (as a mock database)

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### Installation

#### 1. Clone the repository:
```bash
git clone https://github.com/your-username/employee-management-app.git
```

#### 2. Navigate to the project directory:
```bash
cd employee-management-app
```

#### 3. Install dependencies:
```bash
npm install
```

#### 4. Start the development server:
```bash
npm start
```

#### 5. Open your browser and visit:
```
http://localhost:3000
```

## Project Structure
```bash
employee-management-app/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable components
│   ├── context/             # React Context for authentication
│   ├── routes/              # Private and public routes
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Utility functions (e.g., regex)
│   ├── URLs/                # Route URLs
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Entry point
│   └── App.css              # Global styles
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## How It Works

### 1. Sign-Up
- Users can create a new account by providing their full name, email, and password.
- The app validates the input and ensures the email is unique.
- On successful registration, the customer is logged in and redirected to the employee list page.

### 2. Login
- Users can log in using their registered email and password.
- The app validates the credentials and logs in the user if they match.

### 3. Employee Management
- **Add Employee**: Logged-in customers can add new employees by providing their name, role, and email.
- **View Employees**: Customers can view a list of employees associated with their account.

### 4. Logout
- Users can log out, which clears the current session and redirects them to the login page.

## Data Storage

The app uses **localStorage** to store customer and employee data. Here’s how the data is structured:

### `customers`
An array of all registered customers. Each customer has:
- `id`: Unique identifier.
- `fullName`: Customer's full name.
- `email`: Customer's email.
- `password`: Hashed password.
- `employees`: Array of employees associated with the customer.

#### Example:
```json
[
  {
    "id": "abc123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "hashedPassword123",
    "employees": [
      {
        "id": "emp1",
        "fullName": "Alice",
        "role": "Developer",
        "email": "alice@example.com"
      }
    ]
  }
]
```

### `currentCustomer`
The currently logged-in customer. This is a single object with the same structure as above.

## Acknowledgments

- **React** for the frontend framework.
- **TypeScript** for type safety.
- **Lucide React** for icons.
- **React Toastify** for notifications.

---

Enjoy managing your team with the **Employee Management App**! 🚀
