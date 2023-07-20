const balance = document.getElementById("balance");

const money_plus = document.getElementById("money-plus");

const money_minus = document.getElementById("money-minus");

const list = document.getElementById("list");

const form = document.getElementById("form");

const text = document.getElementById("text");

const amount = document.getElementById("amount");

const localstorageGetItem = JSON.parse(localStorage.getItem("Transaction"));

let Transaction = localstorageGetItem;

function addTransDOM(Transaction){
    const sign = Transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        Transaction.amount < 0 ? "minus" : "plus"
    )
    
    item.innerHTML = `
    ${Transaction.text}<span>${sign}$${Math.abs(Transaction.amount)}</span><button class="delete-btn" onClick="removeTrans(${Transaction.id})">x</button>
    `;

    list.appendChild(item);
}


function removeTrans(id){
    Transaction = Transaction.filter((transactions) => transactions.id !== id);
    init();
    LSt();
}

function updateValues(){
    //maps the arrays of amount
    const amounts = Transaction.map(transaction => transaction.amount);
    // reduce => it returns the single value 
    // acc, item => acc+= item it sum 
    // (acc+= item, 0) => initial value
    // .toFixed(2) => toFixed roundOff number, (2) => after decimal point two 0's
    const total = amounts.reduce((acc, item) => (acc+=item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc+=item),0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc+=item),0)* -1).toFixed(2);
    //  console.log(total);

    balance.innerText = `$${total}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
}

//init app
function init(){
    list.innerHTML = "";
    //forEach it loops the addTransdom list
    Transaction.forEach(addTransDOM);
    updateValues();
}

init();

form.addEventListener("submit", addTransaction);

function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === "" || amount.value.trim() === ""){
        alert("Please Enter Text and Amount");
    }else{
        const transaction = {
            id : genId(),
            text : text.value,
            amount : +amount.value,
        };

        Transaction.push(transaction);
        addTransDOM(transaction);
        updateValues();
        LSt();
        text.value = "";
        amount.value = "";
    }
}

function genId(){
    return Math.floor(Math.random()*100000000);
}

//local storage
function LSt(){
    localStorage.setItem(
        "Transaction",
        JSON.stringify(Transaction)
    );
}