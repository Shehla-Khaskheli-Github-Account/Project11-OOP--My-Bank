#! /usr/bin/env node
import inquirer from "inquirer"

// Bank Account Interface
   interface bankAccount{

    accountNumber: number;                                   //property
    userBalance: number;
    withdraw(amount: number) : void                          // void does not return any value just perfrm the operations
    deposit(amount: number) : void 
    checkBalance() : void 
   }

// Creating Bank Account Class
   class bankAccount implements bankAccount{
    accountNumber: number;
    userBalance: number;

    constructor(accountNumber: number, userBalance: number){  // constructor is a method that initialize the object of the class
    this.accountNumber = accountNumber;                       // this keyword in constructor represent the current object of the class
    this.userBalance = userBalance;
    }

// Withdraw
   withdraw(amount: number): void {
    if(this.userBalance >= amount){
        this.userBalance -= amount;
        console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.userBalance}`);
    }
    else{
        console.log("Insufficient Balance.");
    }
}
// Depsite
   deposit(amount: number): void {
       if(amount > 100){
        amount -= 1;                                           // $1 fee charged if more than $100 is deposted
       }
       this.userBalance += amount;
       console.log(`Deposit of $${amount} successful. Remaining balance: $${this.userBalance}`);
   }
// Check Balance
   checkBalance(): void {
    console.log(`Current balance: $${this.userBalance}`);
}
}
// Customer Class
   class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    contactNo: number;
    account: bankAccount;

    constructor( firstName: string, lastName: string,  gender: string, age: number, contactNo: number, account: bankAccount){
        {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.contactNo = contactNo;
        this.account = account;
        }
   }

   }
// Create Bank Accounts
   let accounts: bankAccount[] = [
    new bankAccount(1001, 500),
    new bankAccount(1002, 1000),
    new bankAccount(1003, 2000),
];

// Create Customers
   let customers:  Customer[] =[
    new Customer("Shehla", "Ali", "Female", 24, 3043678756, accounts[0]),
    new Customer("Sheeba", "Ali", "Female", 28, 3153678756, accounts[1]),
    new Customer("Jamshed", "Ali", "Male", 22, 3413678756, accounts[2])
];

// Function to interact with bank account:
   async function service(){
    do{
       const accountNumberInput = await inquirer.prompt({
       
        name: "accountNumber",
        type: "number",
        message: " Enter your account number: "
       })
       const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
       if(customer)
        {
        console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
        const ans = await inquirer.prompt([{
        name: "select",
        type: "list",
        message: " Select an operation",
        choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
        }]);
    // switchCase"
       switch(ans.select){
        case "Depoit":
            let depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to deposit: "
            })
            customer.account.deposit(depositAmount.amount);
            break;

         case "Withdraw":
            let withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to withdraw: "
            })
            customer.account.withdraw(withdrawAmount.amount);
            break;

        case "Check Balance":
            customer.account.checkBalance();
            break;

         case "Exit":
            console.log("Exiting Bank Program...");
            console.log("\n Thankyou for using Bank services. Have a nice day!");
            return;
        }
       }
       else{
        console.log("Invalid account number. Please try again.")
       }
    }
while(true)
}
// Fuction Call
   service()

   