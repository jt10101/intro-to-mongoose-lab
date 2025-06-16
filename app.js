const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Customer = require("./models/customer");

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

const runQueries = async () => {
  console.log("Queries running.");
  mongoose.set("debug", true);

  // Prompt
  const prompt = require("prompt-sync")();
  const userSelection = prompt(
    "\nWhat would you like to do?\n\n1. Create a customer \n2. View all customers \n3. Update a customer \n4. Delete a customer\n5. Exit\n\nNumber of action to run:\n"
  );

  switch (userSelection) {
    case "1":
      // User selects 1 to create a new customer
      const newCustName = prompt("\nAdding a new customer\nCustomer name:");
      const newCustAge = prompt("\nAdding a new customer\nCustomer age:");
      const newCustDetails = {
        name: newCustName,
        age: Number(newCustAge),
      };
      await Customer.create(newCustDetails);

      break;
    case "2":
      // User selects 2 to edit an existing customer
      console.log("Select 2");
      const custData = await Todo.find({});

    case "3":
      console.log("Select 3");
    case "4":
      console.log("Select 4");
  }
};

connect();

// const prompt = require("prompt-sync")();
// const username = prompt("What is your name? ");
// const userSelection = prompt(
//   "\nWhat would you like to do?\n\n1. Create a customer \n2. View all customers \n3. Update a customer \n4. Delete a customer\n5. Exit\n\nNumber of action to run:\n"
// );

// if (userSelection === 1) {
// }

// // console.log(`Your name is ${userSelection}`);
