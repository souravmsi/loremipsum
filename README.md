# Energy Trading Platform

This is an energy trading platform built with Next.js, TypeScript, and other modern web technologies. The platform includes features like real-time bidding, client management, and authentication.

## Prerequisites

Before running the project, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 16 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/energy-trading.git
cd energy-trading
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```env
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_BASE_URL=http://your-api-url.com
```

Replace `your_jwt_secret` with your JWT secret key and `http://your-api-url.com` with the base URL of your API.

### 4. Run the Development Server

Start the development server:

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 5. Build for Production

To build the project for production, run:

```bash
# Using npm
npm run build

# OR using yarn
yarn build
```

### 6. Start the Production Server

After building the project, you can start the production server:

```bash
# Using npm
npm run start

# OR using yarn
yarn start
```

### 7. Lint and Format Code

To lint and format the code, use the following commands:

```bash
# Lint the code
npm run lint

# Format the code
npm run format
```

## Features

-   **Authentication**: Secure login and token-based authentication using `jose`.
-   **Real-Time Bidding**: Manage and submit bids in real-time.
-   **Client Management**: Add, edit, and manage clients.
-   **Middleware**: Protect routes and manage access control.

## Folder Structure

```
src/
├── components/       # Reusable UI components
├── features/         # Feature-specific modules (e.g., RTM, clients)
├── pages/            # Next.js pages
├── utils/            # Utility functions and helpers
├── middleware.ts     # Middleware for route protection
├── schemas.ts        # Zod schemas for validation
```

## Middleware

The middleware in `src/middleware.ts` protects routes based on authentication. It verifies the JWT token and redirects users to the appropriate pages.

### Protected Routes

The following routes are protected and require authentication:

-   `/`
-   `/clients`
-   `/rtm/real-time-bids`
-   `/rtm`
-   `/rtm/advance-bids`

### Public Routes

The following routes are public and accessible without authentication:

-   `/sign-in`
-   `/sign-up`

## Technologies Used

-   **Next.js**: React framework for server-side rendering and static site generation.
-   **TypeScript**: Strongly typed JavaScript.
-   **Zod**: Schema validation for form and API data.
-   **Radix UI**: Accessible UI primitives.
-   **Lucide Icons**: Icon library for React.
-   **Axios**: HTTP client for API requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this `README.md` file based on your project's specific requirements.
