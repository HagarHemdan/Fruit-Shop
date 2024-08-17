let shoppingCartCount = document.getElementById("shoppingCartBox--count");
let shopCardStorage = document.getElementById("shopCardStorage");
let favoriteFruitsProducts = [
    {
        id : 1,
        name : "Banana",
        description : "fresh fruit",
        img : "./images/product1.png",
        price : "50",
        discount : "20",
    },
    {
        id : 2,
        name : "Orange",
        description : "fresh fruit",
        img : "./images/product2.png",
        price : "50",
        discount : "20",
    },
    {
        id : 3,
        name : "Ananas",
        description : "fresh fruit",
        img : "./images/product3.png",
        price : "50",
        discount : "20",
    },
    {
        id : 4,
        name : "Apple",
        description : "fresh fruit",
        img : "./images/product4.png",
        price : "50",
        discount : "20",
    },
];
let fruitShopProducts = [
    {
        id : 5,
        name : "Banana",
        description : "fresh fruit",
        img : "./images/product5.png",
        price : "50",
        discount : "20",
    },
    {
        id : 6,
        name : "Orange",
        description : "fresh fruit",
        img : "./images/product6.png",
        price : "50",
        discount : "20",
    },
    {
        id : 7,
        name : "Ananas",
        description : "fresh fruit",
        img : "./images/product7.png",
        price : "50",
        discount : "20",
    },
    {
        id : 8,
        name : "Apple",
        description : "fresh fruit",
        img : "./images/product8.png",
        price : "50",
        discount : "20",
    },
    {
        id : 9,
        name : "Cherry",
        description : "fresh fruit",
        img : "./images/product9.png",
        price : "50",
        discount : "20",
    },
    {
        id : 10,
        name : "Watermelon",
        description : "fresh fruit",
        img : "./images/product10.png",
        price : "50",
        discount : "20",
    },
    {
        id : 11,
        name : "Strawberry",
        description : "fresh fruit",
        img : "./images/product11.png",
        price : "50",
        discount : "20",
    },
    {
        id : 12,
        name : "Kiwi",
        description : "fresh fruit",
        img : "./images/product12.png",
        price : "50",
        discount : "20",
    },
    {
        id : 13,
        name : "Orange",
        description : "fresh fruit",
        img : "./images/product2.png",
        price : "50",
        discount : "20",
    },  {
        id : 14,
        name : "Banana",
        description : "fresh fruit",
        img : "./images/product5.png",
        price : "50",
        discount : "20",
    },  {
        id : 15,
        name : "Orange",
        description : "fresh fruit",
        img : "./images/product6.png",
        price : "50",
        discount : "20",
    },  {
        id : 16,
        name : "Cherry",
        description : "fresh fruit",
        img : "./images/product9.png",
        price : "50",
        discount : "20",
    },
];
let allProductsInStorage = JSON.parse(sessionStorage.getItem("shoppingCartItems")) || [];
function incrementItemCount(ele){
    let productCount = document.getElementById(`productCount-${ele.id}`).innerText;
    productCount = +productCount + 1;
    updateProductCount(ele.id , productCount);
}
function decrementItemCount(ele) {
    let productCount = document.getElementById(`productCount-${ele.id}`).innerText;
    productCount = +productCount > 1 ? +productCount - 1 : 1;
    updateProductCount(ele.id , productCount);
}


function renderAllAddedItemsInStorage() {
    allProductsInStorage.forEach((item) => {
        shopCardStorage.innerHTML += `
            <li> 
                <img src="${item?.img}" />
                <p>${item.name}</p>
            </li>
        `
    });
    let totalLength = 0;
    allProductsInStorage.forEach((item) => {
        if(+item?.qty) {
            totalLength += (item.qty ? +item.qty : 0);
        }
    });
    shoppingCartCount.textContent = totalLength;
}
renderAllAddedItemsInStorage();

function updateProductCount(id , count){
    const countElement = document.getElementById(`productCount-${id}`);
    if (count) {
        countElement.textContent = count;   
    }
}

function addToCard(ele) {
    let productId = +ele.id;
    let productQty =  document.getElementById(`productCount-${ele.id}`).textContent;
    for (let item of favoriteFruitsProducts) {
        if (item?.id === productId) {
            item.qty = productQty;
            break; // Stop looping once the item is found and updated
        }
    }
    for (let item of fruitShopProducts) {
        if (item?.id === productId) {
            item.qty = productQty;
            break; // Stop looping once the item is found and updated
        }
    } 
    let totalLength = 0;
    [...favoriteFruitsProducts,...fruitShopProducts].forEach((item) => {
        if(+item?.qty) {
            totalLength += (item.qty ? +item.qty : 0);
        }
    });
    shoppingCartCount.textContent = totalLength;

    let productAdded = [...favoriteFruitsProducts,...fruitShopProducts]?.find((item) => {
      return item.id === productId;
    }); 
    sessionStorage.setItem("shoppingCartItems" , JSON.stringify([...allProductsInStorage,productAdded]));
    renderAllAddedItemsInStorage();
}

let productTemplate = (name , description , price , newPrice , imgSrc , id) => {   
    return `
    <div class="Favorite_Fruits__products--product">
        <div>
            <img src="${imgSrc}">
        </div>
        <div class="Favorite_Fruits__products--product--desc">
            <h3>${name}</h3>
            <p>${description}</p>
            <span class="Favorite_Fruits__products--product--desc--span1">${newPrice}</span> 
            <span class="Favorite_Fruits__products--product--desc--span2">${price}</span>
            <div class="Favorite_Fruits__products--product--desc--buts">
                <div class="but1">
                    <span id=${id} onclick="incrementItemCount(this)">+</span>
                    <span id=${`productCount-${id}`}>1</span>
                    <span id=${id} onclick="decrementItemCount(this)">-</span>
                </div>
                <button id="${id}" onclick="addToCard(this)">Buy Now</button>
            </div>
        </div>
    </div>
    `;
}

(function renderFavoriteFruitsProducts(){
    let favoriteFruitsProductsContainer = document.getElementById("Favorite_Fruits__products--container");
    favoriteFruitsProducts.forEach((item) => {
        favoriteFruitsProductsContainer.innerHTML += productTemplate(item.name , item.description , item.price , "20" , item.img , item.id );
    })
}());

(function renderFruitShopFruitsProducts(){
    let favoriteFruitsProductsContainer = document.getElementById("fruitShop__products--container");

    fruitShopProducts.forEach((item) => {
        favoriteFruitsProductsContainer.innerHTML += productTemplate(item.name , item.description , item.price , "20" , item.img , item.id );
    })
}());


