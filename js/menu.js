const restaurant = "food-band";

const renderItems = data => {
    data.forEach(({
        id,
        description,
        image,
        name,
        price
    }) => {
        console.log(id);
        console.log(description);
        console.log(image);
        console.log(name);
        console.log(price);
    });
}

fetch(`https://delivery-food-22ada-default-rtdb.firebaseio.com/db/${restaurant}.json`)
    .then(response => response.json())
    .then(data => renderItems(data))
    .catch(error => {
        console.warn(error);
    })