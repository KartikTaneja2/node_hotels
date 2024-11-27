const mongoose=require('mongoose'); 

// define the Mongodb connection URL //

const mongoURL='mongodb://localhost:27017/hotels' // Replace 'mydatabase' with your database name //

// Set up MongodB connection //

mongoose.connect(mongoURL);

// Get the default connection //
// Mongoose maintains a default connection object representing the MongoDB connection. //

const db=mongoose.connection;

// Define event listener for database connection //

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
});

db.on('error',(err)=>{
    console.log('MongoDB connection error:',err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

// Export the database connection //

module.exports=db;
