const rootEl = document.querySelector("#root");
rootEl.insertAdjacentHTML("beforeend", `
<div id="pizzaList">
<h1>Pizza Menu</h1>
</div>
`)
const pizza = async () => {
    const response = await fetch("http://127.0.0.1:9002/api/pizza");
    const allPizza = await response.json()
    return allPizza;
};

const allergens = async () => {
    const response = await fetch("http://127.0.0.1:9002/api/allergen");
    return await response.json();
};


const data = async () => {
    const databasePizza = await pizza()
    const databaseAllergens = await allergens()
    console.log(databasePizza)
    console.log(databaseAllergens)

   
    const pizzaMap = databasePizza.map(element => {
        const allergensMap = databaseAllergens.map(allergen => {
            const idAllergens = element.allergens.map(id => {
                // if (id === allergen.id) {
                //     return `<li>${allergen.name}</li>`
                // } 
                return id === allergen.id ? `<li>${allergen.name}</li>` : null
            })

            return idAllergens.join("")
        })
        const ingredientsArray = element.ingredients.map(ingredient => {
            return `<li>${ingredient}</li>`
        }) 
        return `<h3 id="pizzaName">${element.name}</h3>
                <img src="${element.photo}">
                <h5>Ingredients:</h5>
                <ul>${ingredientsArray.join("")}</ul>
                <h4>${element.price}</h4>
                <h5>Allergens</h5>
                <h6>${allergensMap.join("")}</h6> `
    })
    console.log(pizzaMap)
    document.querySelector("#pizzaList").insertAdjacentHTML("beforeend", pizzaMap.join(""))
}

data();

//fac POST cu id-ul de la pizza pentru acel order

