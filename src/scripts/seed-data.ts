import { Location } from '../location/entities/location.entity';
import { typeOrmConfig } from '../config/ormconfig';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';

async function createDatabaseIfNotExists(databaseName: string) {
    const connection = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
    });

    await connection.initialize();

    // Check if the database exists
    const dbExists = await connection.query(`SELECT 1 FROM pg_database WHERE datname='${databaseName}'`);
    if (dbExists.length === 0) {
        // Create the database if it does not exist
        await connection.query(`CREATE DATABASE "${databaseName}"`);
        console.log(`Database "${databaseName}" created.`);
    } else {
        console.log(`Database "${databaseName}" already exists.`);
    }

    await connection.destroy(); // Close the initial connection
}

// Create a new DataSource instance
const dummyData = async () => {
    await createDatabaseIfNotExists(process.env.DATABASE_NAME!);

    try {
        await typeOrmConfig.initialize();
        console.log('Database connection established.');
    
        // Read seed data from JSON file
        const seedDataPath = path.join(__dirname, 'seed-data.json');
        const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

        const locationRepository = typeOrmConfig.getRepository(Location);

        const saveLocations = async (data: any, parent: Location | null = null) => {
            for (const locationData of data) {
                // Create a new Location entity
                const location = locationRepository.create({
                    name: locationData.name,
                    address: locationData.address,
                    area: locationData.area,
                    parent,
                });

                // Save the location to the database
                const savedLocation = await locationRepository.save(location);

                // If there are children, recursively save them
                if (locationData.children && locationData.children.length > 0) {
                    await saveLocations(locationData.children, savedLocation);
                }
            }
        };

        // Start saving the locations
        await saveLocations(seedData);
        console.log('Dummy data created successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await typeOrmConfig.destroy(); // Ensure the connection is closed
    }
};

// Run the dummy data script
dummyData().catch(error => {
    console.error('Error creating dummy data:', error);
});
