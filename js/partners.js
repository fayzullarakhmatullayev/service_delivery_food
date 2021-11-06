const renderItems = data => {
    data.forEach(({
        image,
        kitchen,
        name,
        price,
        stars,
        time_of_delivery
    }) => {
        console.log(image);
        console.log(kitchen);
        console.log(name);
        console.log(price);
        console.log(stars);
        console.log(time_of_delivery);
    });
}

fetch('https://delivery-food-22ada-default-rtdb.firebaseio.com/db/partners.json')
    .then(response => response.json())
    .then(data => renderItems(data))
    .catch(error => {
        console.warn(error);
    })