# Distributed Microservices Project

Welcome to our distributed microservices project that includes User Management, Order Placement, and Inventory Management microservices. These microservices communicate with each other using RabbitMQ for message queuing and perform various tasks related to user management, order placement, and inventory management.

## Table of Contents

- [Project Overview](#project-overview)
- [Microservices Architecture](#microservices-architecture)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Postman Collection](#postman-collection)

## Project Overview

This project demonstrates a distributed microservices architecture for managing users, orders, and products. Each microservice is responsible for a specific domain:

- **User Management Microservice:** Manages user data, including user creation, retrieval, update, and deletion.

- **Order Placement Microservice:** Handles order creation, retrieval, update, and deletion, and communicates with the User Management Microservice.

- **Inventory Management Microservice:** Manages product information, including creation, retrieval, update, and deletion. It also communicates with the User Management Microservice.

The microservices communicate with each other through RabbitMQ queues to maintain data consistency across the system.

## Microservices Architecture

The microservices are designed to follow a distributed architecture. They use RESTful APIs for communication and RabbitMQ for asynchronous messaging. Each microservice is contained in its own directory and has its own configuration files:

### User Management

- `index.js`
- `routes/`
- `models/`
- ...

### Order Placement

- `index.js`
- `routes/`
- `models/`
- ...

### Inventory Management

- `index.js`
- `routes/`
- `models/`
- ...

## Technologies Used

The project utilizes the following technologies:

- **Node.js** and **Express.js** for building the microservices.
- **MySQL**, **PostgreSQL**, and **MongoDB** for data storage in respective microservices.
- **RabbitMQ** for asynchronous messaging and communication between microservices.
- **Sequelize** and **Mongoose** as Object-Relational Mapping (ORM) libraries.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GevinN99/NodeJS-Microservice.git
   cd <repository-directory>

2. Install dependencies for each microservice:

    cd user-management
    npm install

    Repeat this step for the Order Placement and Inventory Management microservices.

3. Set up the required environment variables by creating .env files for each microservice based on the provided     examples.

4. Create and configure the databases as mentioned in the .env files.

5. Start each microservice:

    npm start

You can run each microservice on a different port or use a process manager like PM2 for production deployments.

## Usage

To use the microservices, you can send HTTP requests to their respective endpoints.

## Contributing

If you'd like to contribute to this project, please follow the standard GitHub Fork and Pull Request workflow. Be sure to adhere to the project's coding style and guidelines.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Postman Collection

Access our Postman collection to explore and test the API endpoints: [Postman Collection](https://www.postman.com/avionics-operator-73461619/workspace/adbms-assignment-01/collection/26510408-ba20ad31-6b5c-4721-a991-0183ffb3b232?action=share&creator=26510388)
