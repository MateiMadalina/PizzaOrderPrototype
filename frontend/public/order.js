const cartArray = JSON.parse(localStorage.getItem("cart"));

console.log(cartArray);
let totalPriceFromCart = 0
const rootEl = document.querySelector("#root");
rootEl.insertAdjacentHTML(
    "beforeend",
    `
  <div id="coverOrder">  
    <h1>Your Order:</h1>
    <div id = "pizzaList"></div>
    <form id="order-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"><br>
        <label for="city">City:</label>
        <input type="text" id="city" name="city"><br>
        <label for="street">Street:</label>
        <input type="text" id="street" name="street"><br>
        <input type="submit" value="Place your order" id="placeOrder">
    </form>
`
);

const pizzaInputsEl = document.querySelector("#pizzaList");
const pizzas = document.getElementById("pizzaList")

for (const pizza of cartArray) {
    totalPriceFromCart += pizza.totalPrice
    pizzaInputsEl.insertAdjacentHTML(
        "afterbegin",
        `<h4 id="pizzaAndQuantity">${pizza.name}   x   ${pizza.quantity}</h4>`
    );
}

pizzaInputsEl.insertAdjacentHTML("beforeend", `<p id="totalPriceFromCart">Total price: ${totalPriceFromCart} €</p>`)

const form = document.getElementById("order-form");
form.addEventListener("submit", async (event) =>{
    event.preventDefault(); 
    console.log("submit")
    const pizzas = [];
   
    for (const pizza of cartArray) {
        const pizzaInput = form.elements[`pizza-${pizza.id}`];
        if (pizzaInput) {
            pizzas.push({
                id: pizza.id,
                amount: parseInt(pizzaInput.value),
            });
        }
    }

    const order = {
        pizzas: cartArray,
        date: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
        },
        customer: {
            name: form.elements["name"].value,
            email: form.elements["email"].value,
            address: {
                city: form.elements["city"].value,
                street: form.elements["street"].value,
            },
        },
    };


    const response = await fetch(`http://127.0.0.1:9002/api/orders`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(order),
    });

    window.location.href = `http://127.0.0.1:9002/pizza/list`;
    const responseData = await response.json();
    console.log(responseData);

    console.log(order);
});
