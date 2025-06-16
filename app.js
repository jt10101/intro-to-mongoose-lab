const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Customer = require("./models/customer");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await runQueries();
  await mongoose.disconnect();
  process.exit();
};

const runQueries = async () => {
  let isActive = true;
  console.log("Queries running.");
  mongoose.set("debug", true);

  while (isActive) {
    const prompt = require("prompt-sync")();
    console.log(
      "\nWhat would you like to do?\n\n1. Create a customer \n2. View all customers \n3. Update a customer \n4. Delete a customer\n5. Exit\n\nNumber of action to run:"
    );
    let userSelection = prompt();

    // Validation
    if (isNaN(userSelection) || userSelection > 5 || userSelection <= 0) {
      console.log("*******************************");
      console.log("Invalid input, please try again");
      console.log("*******************************");
    }

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
        break;

      case "2":
        // User selects 2 to view all customers
        const viewAll = await Customer.find({});
        console.log(
          viewAll.map((cust) =>
            console.log(`id: ${cust._id}, name: ${cust.name}, age: ${cust.age}`)
          )
        );
        break;

      case "3":
        const viewAllUpdate = await Customer.find({});
        console.log(
          viewAllUpdate.map((cust) =>
            console.log(`id: ${cust._id}, name: ${cust.name}, age: ${cust.age}`)
          )
        );
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
        break;

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
        break;
      case "5":
        console.log("... exiting application");
        isActive = false;
        break;
    }
  }
};

connect();
