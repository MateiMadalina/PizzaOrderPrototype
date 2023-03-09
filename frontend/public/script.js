let allergensArr = [];
let pizzaNameArr = [];
let filterPizza;
let result = [];
let amountNumber = 0;
const cartArray = [];
const rootEl = document.querySelector("#root");
rootEl.insertAdjacentHTML(
  "beforeend",
  `
  <div id="pizzaList">
        <div id="cartConteiner">
            <button style="font-size:24px" id="buttonCart" class="fa">&#xf07a;</button>
            <span class='badge badge-warning' id='lblCartCount'>${amountNumber}</span>
        </div>
        <h1>Pizza Menu</h1>
        <div id="sortAllergens">
            <h2 class="title">Choose your pizza without allergens:</h2>
            <div id="detailsAllergens">
                <input list="alg" id="allergensSearch" placeholder="Allergens Search"></input>
                <datalist id="alg"></datalist>
            </div>
        </div>
        <div id="menu"></div>
  </div>
`
);
const buttonCart = document.querySelector("#buttonCart")
const datalistAlg = document.getElementById("alg");
const inputAllergens = document.getElementById("allergensSearch");
const detailsAllergens = document.getElementById("detailsAllergens");
const menu = document.getElementById("menu");

const pizza = async () => {
  const response = await fetch("http://127.0.0.1:9002/api/pizza");
  const allPizza = await response.json();
  return allPizza;
};

const allergens = async () => {
  const response = await fetch("http://127.0.0.1:9002/api/allergen");
  return await response.json();
};

const data = async () => {
  const databasePizza = await pizza();
  const databaseAllergens = await allergens();

  const pizzaMap = databasePizza.map((element) => {
    const allergensMap = databaseAllergens.map((allergen) => {
      const idAllergens = element.allergens.map((id) => {
        return id === allergen.id
          ? `<li id="allergen">${allergen.name}</li>`
          : null;
      });

      return idAllergens.join("");
    });
    const ingredientsArray = element.ingredients.map((ingredient) => {
      return `<li id="ingredient">${ingredient}</li>`;
    });
    return `<div id="divPizza" data-id="${element.id}">
              <div id="namePicture">
                <h3 id="pizzaName">${element.name}</h3>
                <img src="${element.photo}">
              </div>
              <div id="ingredient">
                <h5 id="h5ing">Ingredients:</h5>
                <ul id="allIngredients">${ingredientsArray.join("")}</ul>
              </div>
              <div id="alergens">
                <h5>Allergens</h5>
                <h6 id="allAlergens">${allergensMap.join("")}</h6>
              </div>
              <h5 id="price">Price: ${element.price} €</h5>
              <button class="cart" id="addToCart">Add to cart</button>
              <input type="number"  class="amount"  placeholder="Amount" min="1">
            </div> `;
  });
  if (allergensArr.length === 0) {
    menu.innerHTML = "";
    menu.insertAdjacentHTML("beforeend", pizzaMap.join(""));
  } else {
    menu.innerHTML = "";
    let a = [];
    filterPizza = pizzaMap.map((pizza) => {
      if (!allergensArr.some((alergy) => pizza.includes(alergy))) {
        a.push(pizza);
      }
    });
    console.log(a);
    menu.insertAdjacentHTML("beforeend", a.join(""));
  }
  addToCartFunction();
  redirectToCart()
};
data();

const createOptions = async (arr) => {
  return arr.map((alg) =>
    datalistAlg.insertAdjacentHTML("beforeend", `<option value="${alg.name}">`)
  );
};

const deleteAllergens = () => {
  const buttonX = document.querySelectorAll(".buttonAll");
  const arrayBtnX = [...buttonX];
  console.log(allergensArr);
  arrayBtnX.forEach((button) => {
    if (!button.hasEventListener) {
      button.hasEventListener = true;
      button.addEventListener("click", (e) => {
        const allergenName =
          e.target.parentElement.querySelector("p").textContent;
        const allergenIndex = allergensArr.indexOf(allergenName);
        allergensArr.splice(allergenIndex, 1);
        data();
        e.target.parentElement.remove();
        console.log(allergensArr);
      });
    }
  });
};

inputAllergens.addEventListener("input", async () => {
  const databaseAllergens = await allergens();

  datalistAlg.innerHTML = "";
  if (inputAllergens.value.length > 0) {
    let allergenNames = databaseAllergens.filter((elem) =>
      elem.name.includes(inputAllergens.value)
    );
    createOptions(allergenNames);
    allergenNames.map((elem) => {
      if (detailsAllergens.innerHTML.includes(elem.name)) {
        if (elem.name === inputAllergens.value) {
          if (!allergensArr.includes(elem.name)) {
            allergensArr.push(elem.name);
            detailsAllergens.insertAdjacentHTML(
              "afterbegin",
              `
              <div class="row">
              <button class="buttonAll">X</button>
              <p>${elem.name}</p>
              </div>
              `
            );
            inputAllergens.value = "";
          }
        }
      }
    });
  }
  deleteAllergens();
  data();
});

const cart = {};

const addToCartFunction = () => {
  const addToCart = document.querySelectorAll(".cart");
  const amount = document.querySelectorAll(".amount");

  addToCart.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      const pizzaName =
      e.target.parentElement.querySelector("#pizzaName").textContent;
      const pizzaId = e.target.parentElement.dataset.id;

      const quantity = parseInt(amount[index].value || 1);
  
      if (!cart[pizzaName]) {
        cart[pizzaName] = quantity;
      } else {
        cart[pizzaName] += quantity;
      }

      amountNumber += quantity;
      document.getElementById("lblCartCount").textContent = amountNumber;

      const price = parseFloat(
        e.target.parentElement.querySelector("#price").textContent.split(" ")[1]
      );

      const totalPrice = price * quantity;

     const pizzaItem = {
        id: pizzaId,
        name: pizzaName,
        price: price,
        quantity: quantity,
        totalPrice: totalPrice,
      };

      cartArray.push(pizzaItem)
      // console.log("Cart", cart, pizzaItem);
      amount[index].value = "";
    });
  });
};

// const redirectToCart = () => {
//   buttonCart.addEventListener("click", () =>{
//   console.log(cartArray);
//   console.log(amountNumber);
//   if(amountNumber > 0) window.location.href = `http://127.0.0.1:9002/pizza/order`;
//   })

// }
const redirectToCart = () => {
  buttonCart.addEventListener("click", () => {
    console.log(cartArray);
      console.log(amountNumber);
      result = []
    cartArray.forEach(function (a) {
      if (!this[a.name]) {
        this[a.name] = {
          id: a.id,
          name: a.name,
          price: a.price,
          quantity: 0,
          totalPrice: 0,
        };
        result.push(this[a.name]);
      }
      this[a.name].quantity += a.quantity;
      this[a.name].totalPrice = a.price * this[a.name].quantity;
    }, Object.create(null));
    console.log(result);
    if (amountNumber > 0) {
      localStorage.setItem("cart", JSON.stringify(result));
      window.location.href = `http://127.0.0.1:9002/pizza/order`;
    }
  });
};
//fac POST cu id-ul de la pizza pentru acel order
//modal sau redirectionare catre o noua pagina pentru cos
    // export { cartArray };