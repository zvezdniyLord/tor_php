

// function searchProducts() {
//     const input = document.getElementById('searchInput').value.toLowerCase();
//     const resultsContainer = document.getElementById('searchResultsContainer');
//     const resultsList = document.getElementById('searchResults');
//     resultsList.innerHTML = '';

//     if (input) {
//         const filteredProducts = products.filter(product =>
//             product.name.toLowerCase().includes(input) ||
//             product.description.toLowerCase().includes(input)
//         );

//         filteredProducts.forEach(product => {
//             const listItem = document.createElement('li');
//             listItem.style.listStyle = 'none';
//             listItem.innerHTML = `
//                 <div class="search__product">
//                     <img src="${product.image}" alt="${product.name}" style="width:100px;height:auto;">
//                     <h3>${product.name}</h3>
//                     <p>${product.description}</p>
//                     <p>Цена: ${product.price} ₽</p>
//                     <button class="add__to__cart" onclick="addToCart(${product.id})">Добавить в корзину</button>
//                 </div>
//             `;
//             resultsList.appendChild(listItem);
//         });

//         resultsContainer.style.display = 'block';
//     } else {
//         resultsContainer.style.display = 'none';
//     }
// }
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItems = document.getElementById('cartItems');
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart__list')
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cartImg">
           <span class="name__list"> ${product.name} - ${product.price} ₽</span>
        `;
        cartItems.appendChild(cartItem);
    }
}
function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResultsContainer');
    const resultsList = document.getElementById('searchResults');
    resultsList.innerHTML = '';

    if (input) {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(input) ||
            product.description.toLowerCase().includes(input)
        );

        if (filteredProducts.length > 0) {
            filteredProducts.slice(0, 3).forEach(product => {
                const listItem = document.createElement('li');
                listItem.style.listStyle = 'none';
                listItem.innerHTML = `
                    <div class="search__product">
                        <img src="${product.image}" alt="${product.name}" style="width:100px;height:auto;">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Цена: ${product.price} ₽</p>
                        <button class="add__to__cart" onclick="addToCart(${product.id})">Добавить в корзину</button>
                    </div>
                `;
                resultsList.appendChild(listItem);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    } else {
        resultsContainer.style.display = 'none';
    }
}