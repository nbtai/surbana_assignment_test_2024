## Location Management API

This project is a simple RESTful API built using NestJS, TypeScript, and PostgreSQL. The system allows users to perform CRUD operations on hierarchical location data, such as buildings, floors, rooms, etc. It is designed to handle a location tree structure, which supports parent-child relationships (e.g., a building can have floors, and floors can have rooms).

## Features

- CRUD Operations: Create, Read, Update, and Delete locations.
- Location Tree Structure: Supports nested locations with parent-child relationships.
- Validation: Request data is validated before processing.
- Exception Handling: Implements clean and informative error handling.
- Logging: Built-in logging to track application behavior.
- Database: Uses PostgreSQL with TypeORM for database management.
- Swagger Documentation: Auto-generated API documentation using Swagger for easy testing and reference.

## Project Structure

The project follows the standard structure provided by NestJS:
1. Controllers: Define API endpoints and handle incoming requests.
2. Services: Implement business logic and interact with the database.
3. Entities: Represent the database models (in this case, the Location entity).
4. DTOs (Data Transfer Objects): Used to validate request payloads.

## Local Setup
For detailed instructions on setting up the project locally, please refer to the [Local Setup Guide](./docs/INSTALLATION.md).
