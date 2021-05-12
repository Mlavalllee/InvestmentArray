// Investment Accounts Assignment Start Code

// HTML Variables
let containerEl = document.getElementById("container");
let outputEl = document.getElementById("output");
let goBtnEl = document.getElementById("go");
let menuEl = document.getElementById("menu");

// Global Variable
let accounts = [];
let maxAmount = 5000; // account values should be b/t 0 and max
let count = 0;
let AccountsOpen = 200;

// Display Data

RandomArrayValues();

function RandomArrayValues() {
  for(let i = 0; i < 200; i++) {
    accounts.push(Math.floor(Math.random()* 5001));
  }
}

drawArray();

function drawArray() {
  let outputStr = "";
  let divHeight;
  for (let i = 0; i < accounts.length; i++) {
    divHeight = (accounts[i] / maxAmount) * 600; // Scale accounts to fit in array visualizer container
    outputStr += `<div style="height:${divHeight}px"></div>`;
  }
  containerEl.innerHTML = outputStr;
}

// Main Menu & Go Button
goBtnEl.addEventListener("click", mainMenu);

function mainMenu() {
  // Get value of menu select element
  let selection = menuEl.value;

  // Take action based on menu selection
  if (selection === "count-range") {
    countRange();
  } else if (selection === "donor") {
    generousDonor();
  } else if (selection === "hacker") {
    hackerAttack();
  } else if (selection === "stats") {
    investmentStats();
  } else if (selection === "add") {
    addAccount();
  } else if (selection === "remove-low") {
    removeLow();
  } else if (selection === "robin-hood") {
    robinHood();
  }

  // Redraw array to show any changes
  drawArray();
}

// ******************************************************
// MENU SELECTION FUNCTIONS
// ******************************************************
function countRange() {
  // Output the number of accounts with amounts between $2,000 and $4,000, inclusive
  count = 0;
    for(let i = 0; i < accounts.length; i++) {
      if(accounts[i] >= 2000 && accounts[i] <= 4000) {
        count++;
      }
    }
  outputEl.innerHTML = count + " " + "accounts have been evaluated to be worth between $2000 and $4000 dollars";
}

function generousDonor() {
  // A generous donor has decided to give $500 to every investment
  // account that has less than $2000. 
  // Modify the investment account array to apply this donation.
  // Output the total amount of money that was donated.
  count = 0;
  for(let i = 0; i < accounts.length; i++) {
    if(accounts[i] < 2000) {
      accounts[i] = accounts[i] + 500;
      count = count + 500;
    }
  }
outputEl.innerHTML = "$" + count + " " + "in total has been donated to invesments under $2000";
}

function hackerAttack() {
  // A hacker steals 5% from every account.
  // Modify the investment account array to apply this theft.
  // Output the total amount that was stolen.
  let stolen = 0;
  count = 0;
  for(let i = 0; i < accounts.length; i++) {
    stolen = accounts[i] * 0.05;
    accounts[i] = accounts[i] - stolen;
    count = count + stolen;
  }
  outputEl.innerHTML = "A Hacker stole a total of " + "$" + count + " from invsesments!";
}

function investmentStats() {
  // Output the minimum account amount, the maximum account amount
  // and the average account amount.
  let Max = 0;
  let Min = 5000;
  let Avg = 0;
  count = 0;
  let AvgCount = 0;
  for (let i = 0; i < accounts.length; i++) {
    count = accounts[i];
    AvgCount = AvgCount + accounts[i];
    if(count >= Max ) {
      Max = count;
    }if(count <= Min ) {
      Min = count;
    }
  }
  Avg = AvgCount / AccountsOpen;
  outputEl.innerHTML = "The maximum account amount is $" + Max + ", The minimum account amount is $" + Min + ", and The average amount of the accounts is $" + Avg;
}

function addAccount() {
  // Prompt for a new account amount and add this to the invesment account
  // array. Output a confirmation that a new account was added with an
  // opening amount of _______.
  let amount
  amount = Math.floor(Math.random()* 5001);
  accounts.push(amount)
  AccountsOpen++;
  outputEl.innerHTML = "an account with $" + amount + " has been added.";
}

function removeLow() {
  // Remove all accounts that are below $500.
  // Output how many accounts were removed.
  count = 0;
  for (let i = 0; i < accounts.length; i++) {
    if(accounts[i] < 500 ){
      accounts.splice(i, 1);
      count++;
      AccountsOpen--;
      i = i - 1;
    }
  }
  outputEl.innerHTML = count + " accounts under $500 removed";
}


function robinHood() {
  // Steal from the rich and give to the poor.
  // Take $400 from every account that has over $4000.
  // Then evenly distribute the total amount taken between all the
  // accounts that have less than $1000.
  // Output how many accounts received money and 
  // how much each account received.
  let Stolen = 0;
  let StolenTotal = 0;
  let under1000 = 0;
  let StolenFrom = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 1000) {
      under1000++;
    }
  }
  for (let i = 0; i < accounts.length; i++) {
    if(under1000 > 0 && accounts[i] > 4000) {
      Stolen = Stolen + 400;
      StolenTotal = StolenTotal + 400;
      accounts[i] = accounts[i] - 400;
      StolenFrom++;
    }
  }
  Stolen = Stolen / under1000;
  for (let i =0; i<accounts.length; i++) {
    if (accounts[i] < 1000) {
      accounts[i] = accounts[i] + Stolen;
    }
  }
  if (under1000 >=1 && StolenFrom >=1){
    outputEl.innerHTML = "Robin Hood has stolen $" + StolenTotal + " from "  + StolenFrom + " accounts and handed out $" + Stolen + " evenly between to a total of " +under1000 + " accounts under $1000";
  } else if (under1000 <= 0)  {
    outputEl.innerHTML = "there where no accounts under $1000 left to give to so robin hood didn't steal anything."
  } else {
    outputEl.innerHTML = "There where no accounts above $4000 left for robin hood to steal from."
  }
}    