const pizza = async () => {
    const response = await fetch("http://127.0.0.1:9002/api/pizza");
    const allPizza = await response.json()
    return allPizza.pizza;
};

const allergens = async () => {
    const response = await fetch("http://127.0.0.1:9002/api/allergen");
    return await response.json();
};


const data = async () => {
    const result = await pizza()
    const allResult = await allergens()
    console.log(result)
    console.log(allResult)
    return
}

data()