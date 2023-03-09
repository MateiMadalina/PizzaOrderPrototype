const result = JSON.parse(localStorage.getItem("cart"));

console.log(result);

const rootEl = document.querySelector("#root");
rootEl.insertAdjacentHTML(
  "beforeend",
  `<div id = "pizzaList">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name"><br>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email"><br>
  
  <label for="city">City:</label>
  <input type="text" id="city" name="city"><br>
  
  <label for="street">Street:</label>
  <input type="text" id="street" name="street"><br>
  
  <input type="submit" value="Submit">
</form>
`
);

const pizzaInputsEl = document.querySelector("#pizzaList");
const pizzas = document.getElementById("pizzaList")
// pizzas.insertAdjacentHTML("beforebegin", )
for (const pizza of result) {
  pizzaInputsEl.insertAdjacentHTML(
    "afterbegin",
    `<div>
      <label for="pizza-${pizza.id}">Pizza ${pizza.id}:</label>
      <input type="number" id="pizza-${pizza.id}" name="pizza-${pizza.id}" value="${pizza.amount}"><br>
    </div>`
  );
}

const form = document.getElementById("order-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

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
    id: 1,
    pizzas: cartArray,
    date: {
      year: form.elements["year"].value,
      month: form.elements["month"].value,
      day: form.elements["day"].value,
      hour: form.elements["hour"].value,
      minute: form.elements["minute"].value,
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

  console.log(order);
});
