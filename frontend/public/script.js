const allergensArr = [];

const deleteAllergens = () => {
  const buttonX = document.querySelectorAll(".buttonAll");
  const arrayBtnX = [...buttonX];

  arrayBtnX.forEach((button) => {
    if (!button.hasEventListener) {
      button.hasEventListener = true;

      button.addEventListener("click", (e) => {
        const allergenName =
          e.target.parentElement.querySelector("p").textContent;
        const allergenIndex = allergensArr.indexOf(allergenName);

        allergensArr.splice(allergenIndex, 1);
        console.log(allergenIndex);
        e.target.parentElement.remove();
      });
    }
  });
};

 

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

    console.log(allergensArr);
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
    return `<h3 id="pizzaName">${element.name}</h3>
            <img src="${element.photo}">
            <h5>Ingredients:</h5>
            <ul id="allIngredients">${ingredientsArray.join("")}</ul>
            <h5 id="price">Price: ${element.price} €</h5>
            <h5>Allergens</h5>
            <h6 id="allAlergens">${allergensMap.join("")}</h6> `;
  });
  if (allergensArr.length === 0) {
deleteAllergens();
    menu.innerHTML = "";
    menu.insertAdjacentHTML("beforeend", pizzaMap.join(""));
console.log(allergensArr);
  } else if (allergensArr.length >0){
    deleteAllergens();
    console.log(allergensArr);
    menu.innerHTML = "";
       const filteredPizzas = pizzaMap.filter((pizza) => {
         const allergensList = pizza.match(/<li id="allergen">(.*?)<\/li>/g);
         for (let i = 0; i < allergensList.length; i++) {
           const allergen = allergensList[i].match(
             /<li id="allergen">(.*?)<\/li>/
           )[1];
           if (allergensArr.includes(allergen)) {
             return false;
           }
         }
         return true;
       });

    menu.insertAdjacentHTML("beforeend", filteredPizzas.join(""));
  }
};

data();

const createOptions = async (arr) => {
  return arr.map((alg) =>
    datalistAlg.insertAdjacentHTML("beforeend", `<option value="${alg.name}">`)
  );
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
    });
    }
    

  data();

});

//fac POST cu id-ul de la pizza pentru acel order
