const menu = () => {
    const cardsMenu = document.querySelector('.cards-menu');

    const cartArray = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];

    const changeTitle = restaurant => {
        const restaurantTitle = document.querySelector('.restaurant-title');
        restaurantTitle.textContent = restaurant.name;
        const cardInfo = document.querySelector('.card-info');
        cardInfo.innerHTML = `
            <div class="rating">${restaurant.stars}</div>
            <div class="price">От ${restaurant.price} ₽</div>
            <div class="category">${restaurant.kitchen}</div>
        `
    }

    const addToCart = (cartItem) => {
        if(cartArray.some(item => item.id === cartItem.id)){
            cartArray.map(item => {
                if(item.id === cartItem.id){
                    item.count++
                }
                return item
            })
        } else {
            cartArray.push(cartItem)
            localStorage.setItem('cart', JSON.stringify(cartArray))
        }
    }

    const renderItems = data => {
        data.forEach(({id, description, image,  name, price }) => {
            const card = document.createElement('div')
            card.classList.add('card');
            card.innerHTML = `
                <img src="${image}" alt="${name}" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name}</h3>
                    </div>
                    <!-- /.card-heading -->
                    <div class="card-info">
                        <div class="ingredients">
                            ${description}
                        </div>
                    </div>
                    <!-- /.card-info -->
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price} ₽</strong>
                    </div>
                </div>
                <!-- /.card-text -->
            `
            card.querySelector('.button-card-text').addEventListener('click', () => {
                addToCart({ name, price, id, count: 1})
            })
            cardsMenu.append(card)
        });
    }

    if(localStorage.getItem('restaurant')){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'))
        changeTitle(restaurant)
        fetch(`https://delivery-food-22ada-default-rtdb.firebaseio.com/db/${restaurant.products}`)
            .then(response => response.json())
            .then(data => renderItems(data))
            .catch(error => {
                console.warn(error);
            })
    } else {
        window.location.href = '/'
    }
}
menu()