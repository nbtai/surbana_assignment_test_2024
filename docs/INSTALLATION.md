
## Getting Started: Local Environment Setup

Follow these steps to set up the project on your local machine:

### Prerequisites

Ensure you have the following installed:

-   **Node.js** (v14.x or later) – [Download and install Node.js](https://nodejs.org/)
-   **NestJS CLI** – install globally using:
    
    `npm install -g @nestjs/cli`
    
-   **PostgreSQL** – make sure PostgreSQL is installed and running locally, or have access to a PostgreSQL instance. [Install PostgreSQL](https://www.postgresql.org/download/)

### Installation Steps

1.  **Clone the repository:**
    
    `git clone git@github.com:nbtai/surbana_assignment_test_2024.git`
    
2.  **Install dependencies:** Run the following command to install all required Node.js modules:
    
    `npm install` 
    
3.  **Set up the PostgreSQL database:**
    
    -   Create a new PostgreSQL database for the project (e.g., `location_db`).
    -   Note the database credentials (host, port, username, password, and database name).

4.  **Configure environment variables:** Create a `.env` file in the project root (or update the configuration in `app.module.ts` to pull from the environment), and add the necessary environment variables for your PostgreSQL setup. Example:

    ```DATABASE_HOST=localhost
        DATABASE_PORT=5432
        DATABASE_USER=your_db_user
        DATABASE_PASSWORD=your_db_password
        DATABASE_NAME=location_db
    
5.  ~~**Run database migrations (if any):** Use TypeORM to run any migrations (optional, based on your configuration).~~
   
    ~~`npm run typeorm migration:run`~~

6.  **Run seed data**

    `npm run seed:data` 
    
7.  **Start the development server:** After successfully setting up the database and installing the dependencies, run the NestJS development server:

    `npm run start:dev` 
    
    This will start the application at http://localhost:3000.
    

### Testing the API

1.  **Swagger Documentation:** You can access the auto-generated API documentation using Swagger. Open the following URL in your browser:

    `http://localhost:3000/api` 
    
    This provides a visual interface for interacting with the API, including creating, reading, updating, and deleting locations.
    
2.  **Sample API Requests:**
    
    -   **Get All Locations:**
        
        `GET /locations` 
        
    -   **Create Location:**
        
        `POST /locations
        {
          "name": "Building A",
          "locationNumber": "A-01",
          "area": 100.5
        }` 
        
3.  **Running Tests:** The project comes with basic unit and integration tests. You can run them using:
    
    `npm run test` 
    

### Troubleshooting

-   **Database Connection Issues:** Ensure that PostgreSQL is running and the connection details in your `.env` file are correct. You can test the connection separately using `psql` or a tool like `pgAdmin`.
    
-   **Port Conflicts:** If port 3000 is already in use, modify the `main.ts` file or provide an alternative port in the `.env` file.
