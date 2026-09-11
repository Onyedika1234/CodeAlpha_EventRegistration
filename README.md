# CodeAlpha Event Registration

CodeAlpha Event Registration helps event organizers and attendees manage event bookings in one place. It handles user accounts, lets creators set up new events with capacity limits, and tracks attendee registrations to ensure events do not overbook. This provides teams with a straightforward system to coordinate gatherings without complex setup.

## Installation

Follow these steps to set up the project locally.

- Clone the repository:

```bash
git clone https://github.com/Onyedika1234/CodeAlpha_EventRegistration.git
cd CodeAlpha_EventRegistration
```

- Install dependencies:

```bash
npm install
```

- Set up environment variables by creating a .env file in the root directory. You will need to define your database connection string and authentication secrets:

```env
PORT=3000
DATABASE_URL="mysql://user:password@localhost:3306/eventdb"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"
HOST="localhost"
DATABASE_PORT="3306"
USER="user"
PASSWORD="password"
DATABASE="eventdb"
```

- Generate the database client and push the schema:

```bash
npx prisma generate
npx prisma db push
```

- Start the development server:

```bash
npm run dev
```

## Usage

Once the server is running, you can interact with the system using your preferred HTTP client. The application uses cookie-based authentication, so you will need to manage cookies when making authenticated requests.

To register a new user account, send a POST request to the sign-up endpoint with a JSON payload containing the user details:

```bash
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword",
    "role": "USER"
  }'
```

Upon successful registration or login, the server sets token and userId cookies. These cookies must be included in subsequent requests to create events or register for them.

## Features

- User Authentication: Secure account creation and login using hashed passwords and HTTP-only cookies.
- Role-Based Permissions: Distinguishes between standard attendees and event organizers to restrict event creation capabilities.
- Event Management: Organizers can publish events with specific details like date, location, and maximum capacity.
- Registration Tracking: Attendees can reserve spots for events, and the system automatically prevents overbooking once an event reaches its capacity.
- Request Rate Limiting: Built-in protection against brute-force attacks and abuse by restricting the number of requests per IP address.

## Technologies Used

| Technology                                    | Description                              |
| --------------------------------------------- | ---------------------------------------- |
| [Node.js](https://nodejs.org/)                | JavaScript runtime environment           |
| [Express](https://expressjs.com/)             | Web framework for routing and middleware |
| [Prisma](https://www.prisma.io/)              | Next-generation ORM for database access  |
| [MariaDB](https://mariadb.org/)               | Relational database management system    |
| [TypeScript](https://www.typescriptlang.org/) | Strongly typed programming language      |

## Contributing

Contributions are welcome. Feel free to open issues or submit pull requests to help improve the project. Ensure that your code follows the existing style and that you test your changes before submitting.

## Author Info

- GitHub: [Onyedika1234](https://github.com/Onyedika1234)

## Built With

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.org/)
