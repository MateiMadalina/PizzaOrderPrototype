let allergensArr = [];
let filterPizza;
const rootEl = document.querySelector("#root");
rootEl.insertAdjacentHTML(
  "beforeend",
  `
  <div id="pizzaList">
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
    return `<div id="divPizza">
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
              <button id="addToCart">Add to cart</button>
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

//fac POST cu id-ul de la pizza pentru acel order
