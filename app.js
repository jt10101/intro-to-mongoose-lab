const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Customer = require("./models/customer");

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  //   console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  //   console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

const runQueries = async () => {
  console.log("Queries running.");
  mongoose.set("debug", true);

  // Prompt
  const prompt = require("prompt-sync")();
  console.log(
    "\nWhat would you like to do?\n\n1. Create a customer \n2. View all customers \n3. Update a customer \n4. Delete a customer\n5. Exit\n\nNumber of action to run:"
  );
  const userSelection = prompt();

  switch (userSelection) {
    case "1":
      // User selects 1 to create a new customer
      console.log(
        "\nAdding a new customer\n\nWhat is the customer's new name?"
      );
      const newCustName = prompt();
      console.log("What is the customer's age?");
      const newCustAge = prompt();
      const newCustDetails = {
        name: newCustName,
        age: Number(newCustAge),
      };
      await Customer.create(newCustDetails);
      connect();

    case "2":
      // User selects 2 to view all customers
      const viewAll = await Customer.find({});
      console.log(viewAll);
      connect();

    case "3":
      console.log(await Customer.find({}));

      console.log(
        "Copy and paste the id of the customer you would like to update here: "
      );
      const updatingID = prompt();
      console.log("What is the customer's new name?");
      const updateCustName = prompt();
      console.log("What is the customer's new age?");
      const updateCustAge = prompt();

      await Customer.findByIdAndUpdate(
        updatingID,
        { name: updateCustName, age: updateCustAge },
        { new: true }
      );
      connect();

    case "4":
      console.log(await Customer.find({}));
      console.log(
        "Copy and paste the id of the customer you would like to delete here: "
      );
      const deletingID = prompt();
      console.log("Confirm? [Y/N]");
      const confirmation = prompt();
      if (confirmation === "Y") {
        await Customer.findByIdAndDelete(deletingID);
      }
      connect();

    case "5":
      console.log("... exiting application");
      break;
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
