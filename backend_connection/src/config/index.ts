import * as mysql from "mysql2/promise"; 

export const dbConfig = {
  user: process.env.DB_USER || "drashti", 
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "vector",
  password: process.env.DB_PASSWORD || "test",
  port: parseInt(process.env.DB_PORT || "3306", 10),
};

// Function to establish connection
export const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Successfully connected to the MySQL database.");
    return connection; // Return the connection to use elsewhere
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to the MySQL database:", error.message);
    } else {
      console.error("Unknown error occurred while connecting to the MySQL database.");
    }
    process.exit(1); // Terminate the app on failure
  }
};
