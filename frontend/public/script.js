const pizza = async () => {
    const response = await fetch("http://127.0.0.1:9002/api/pizza");
    return await response.json();
};

