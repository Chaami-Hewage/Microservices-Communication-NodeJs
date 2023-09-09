# Microservices Architecture Project README

This project demonstrates a simple microservices architecture implemented using Node.js, Express.js, and various databases. The architecture consists of three microservices:

1. **User Management Microservice** - Responsible for managing user data.
2. **Order Placement Microservice** - Handles order-related operations.
3. **Inventory Management Microservice** - Manages product inventory.

A Gateway microservice is used to route requests to the appropriate microservice based on the request URL.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Setting Up Microservices](#setting-up-microservices)
4. [Database Integration](#database-integration)
5. [Microservices Communication](#microservices-communication)
6. [Running the Project](#running-the-project)
7. [Testing with Postman](#testing-with-postman)
8. [Postman Collection](#postman-collection)
9. [Git Repository](#git-repository)
10. [Contributing](#contributing)
11. [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB, PostgreSQL, and MySQL (depending on the microservices)
- Postman (for testing)
- Git (optional, for version control)

## Project Structure

The project is organized into the following directories:

- **User Management**: User-related microservice.
- **Order Placement**: Order management microservice.
- **Inventory Management**: Inventory-related microservice.
- **Gateway**: Microservices communication and routing.

Each microservice has its own folder containing code, routes, and database configurations.

## Setting Up Microservices

### User Management Microservice

1. Navigate to the `User Management` directory.
2. Create a `.env` file and set the MySQL database connection details.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the User Management microservice.

### Order Placement Microservice

1. Navigate to the `Order Placement` directory.
2. Create a `.env` file and set the PostgreSQL database connection details.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the Order Placement microservice.

### Inventory Management Microservice

1. Navigate to the `Inventory Management` directory.
2. Create a `.env` file and set the MongoDB connection string.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the Inventory Management microservice.

## Database Integration

Each microservice uses a different database:

- User Management: MySQL
- Order Placement: PostgreSQL
- Inventory Management: MongoDB

Refer to the `.env` files in each microservice's directory for database configuration.

## Microservices Communication

The Gateway microservice handles communication between microservices by routing requests to the appropriate service based on the URL path.

## Running the Project

1. Start each microservice as described in the "Setting Up Microservices" section.
2. Start the Gateway microservice from its directory:
   - cd Gateway
   - npm install
   - npm start

## Testing with Postman

You can use Postman to test the microservices' endpoints. Import the provided Postman script to simplify testing.

## Postman Collection

Access our Postman collection to explore and test the API endpoints: [Postman Collection](https://interstellar-satellite-980339.postman.co/workspace/New-Team-Workspace~852ec3c5-76a7-424c-8a86-377ffe6f1bcc/collection/29481774-d601791f-8ce3-4516-8585-870a478ca3c6?action=share&creator=29481774)

## Git Repository

Find the project's source code and documentation on our GitHub repository: [GitHub Repository](https://github.com/Chaami-Hewage/Microservices-Communication-NodeJs.git)

## Contributing

Contributions are welcome! Please follow our [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
