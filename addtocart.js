
// const data = new FormData();
// let cartItems = [];

// function removeFromCart(productId) {
//   cartItems = cartItems.filter((item) => item.id !== productId);
//   displayCartItems();
// }

// function addToCart(
//   productId,
//   productName,
//   productPrice,
//   productImage,
//   productQuantity
// ) {
//   data.append("name", productName);
//   data.append("price", productPrice);
//   data.append("kol-vo", productQuantity);

//   cartItems.push({
//     id: productId,
//     name: productName,
//     price: productPrice,
//     quantity: productQuantity,
//     image: productImage,
//   });
//   displayCartItems();
// }

// document.querySelectorAll(".add__to__cart").forEach((button) => {
//   button.addEventListener("click", (event) => {
//     const productElement = event.target.closest(".cat1__product");
//     const productId = productElement.getAttribute("data-product-id");
//     const productName = productElement
//       .querySelector(".desc__name")
//       .textContent.trim();
//     const productPrice = productElement
//       .querySelector(".cost__with__weight")
//       .textContent.split(" ")[0]
//       .trim();
//     const productImage = productElement
//       .querySelector(".product__image")
//       .getAttribute("src"); // Assuming the image element has a class 'product__image'
//     const productQuantity = productElement.querySelector(".itog").textContent;
//     addToCart(
//       productId,
//       productName,
//       productPrice,
//       productImage,
//       productQuantity
//     );
//   });
// });

// function displayCartItems() {
//   const cartContainer = document.getElementById("cartItems");
//   cartContainer.innerHTML = ""; // Очистить контейнер перед добавлением новых элементов

//   cartItems.forEach((item) => {
//     const listItem = document.createElement("li");
//     listItem.classList.add("cart__list");
//     // Create and append the image element
//     const imageElement = document.createElement("img");
//     imageElement.src = item.image;
//     imageElement.alt = item.name;
//     imageElement.classList.add("cartImg");
//     listItem.appendChild(imageElement);

//     // Create and append the text content
//     const textContent = document.createElement("span");
//     textContent.classList.add("name__list");
//     textContent.textContent = `${item.name} - ${item.price} R колличество - ${item.quantity}`;
//     listItem.appendChild(textContent);

//     // Создаем кнопку для удаления товара
//     const removeButton = document.createElement("button");
//     removeButton.classList.add("del");
//     removeButton.textContent = "Удалить";
//     removeButton.addEventListener("click", () => removeFromCart(item.id));

//     listItem.appendChild(removeButton);
//     cartContainer.appendChild(listItem);
//   });
// }

// document.addEventListener("DOMContentLoaded", (event) => {
//   // Функция для увеличения значения
//   function increase(event) {
//     if (event.target.classList.contains("plus")) {
//       let itog = event.target.closest(".ads").querySelector(".itog");
//       itog.textContent = parseInt(itog.textContent) + 1;
//     }
//   }

//   // Функция для уменьшения значения
//   function decrease(event) {
//     if (event.target.classList.contains("minus")) {
//       let itog = event.target.closest(".ads").querySelector(".itog");
//       itog.textContent = parseInt(itog.textContent) - 1;
//     }
//   }

//   // Добавляем обработчики событий для всех кнопок на странице
//   document.querySelectorAll(".plus").forEach((button) => {
//     button.addEventListener("click", increase);
//   });

//   document.querySelectorAll(".minus").forEach((button) => {
//     button.addEventListener("click", decrease);
//   });
// });

// function sendCartItems() {
//   console.log('a')
//   const cartData = cartItems.map(item => ({
//     id: item.id,
//     name: item.name,
//     price: item.price,
//     quantity: item.quantity,
//   }));

//   fetch('/submit-cart', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(cartData)
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }
// // Пример вызова функции при нажатии на кнопку "Отправить корзину"
// document.querySelector('.get__offer').addEventListener('click', () => {
//   sendCartItems();
// })

document.addEventListener("DOMContentLoaded", (event) => {
  const data = new FormData(document.querySelector("form"));
  const inputPrice = document.querySelector(".input-price");
  const inputName = document.querySelector(".input-name");
  const inputOrder = document.querySelector(".input-order");
  let cartItems = [];

  function removeFromCart(productId) {
    cartItems = cartItems.filter((item) => item.id !== productId);
    displayCartItems();
  }

  function addToCart(
    productId,
    productName,
    productPrice,
    productImage,
    productQuantity
  ) {
    cartItems.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: parseInt(productQuantity, 10),
      image: productImage,
    });
    displayCartItems();
  }

  function displayCartItems() {
    const cartContainer = document.getElementById("cartItems");
    cartContainer.innerHTML = ""; // Clear container before adding new items

    cartItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("cart__list");

      // Create and append the image element
      const imageElement = document.createElement("img");
      imageElement.src = item.image;
      imageElement.alt = item.name;
      imageElement.classList.add("cartImg");
      listItem.appendChild(imageElement);



      const inputCount = document.createElement("input");
      inputCount.setAttribute("type", 'hidden');
      inputCount.setAttribute('name', 'name');
      inputCount.setAttribute('value', `${item.quantity}`);
      listItem.appendChild(inputCount);

      const inputPrice = document.createElement("input");
      inputPrice.setAttribute("type", 'hidden');
      inputPrice.setAttribute('name', 'price');
      inputPrice.setAttribute('value', `${item.price}`);
      listItem.appendChild(inputPrice);

      const inputName = document.createElement("input");
      inputName.setAttribute("type", 'hidden');
      inputName.setAttribute('name', 'order');
      inputName.setAttribute('value', `${item.name}`);
      listItem.appendChild(inputName);
      // Create and append the text content
      const textContent = document.createElement("span");
      textContent.classList.add("name__list");
      textContent.textContent = `${item.name} - ${item.price * item.quantity} R количество - ${item.quantity}`;
      /*inputName.setAttribute("value", item.name);
      inputPrice.setAttribute("value", item.price * item.quantity);
      inputOrder.setAttribute("value", item.quantity);*/
      listItem.appendChild(textContent);

      // Create and append the remove button
      const removeButton = document.createElement("button");
      removeButton.classList.add("del");
      removeButton.textContent = "Удалить";
      removeButton.addEventListener("click", () => removeFromCart(item.id));

      listItem.appendChild(removeButton);
      cartContainer.appendChild(listItem);
    });
  }

  document.querySelectorAll(".add__to__cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productElement = event.target.closest(".cat1__product");
      const productId = productElement.getAttribute("data-product-id");
      const productName = productElement
        .querySelector(".desc__name")
        .textContent.trim();
      const productPrice = productElement
        .querySelector(".cost__with__weight")
        .textContent.split(" ")[0]
        .trim();
      const productImage = productElement
        .querySelector(".product__image")
        .getAttribute("src");
      const productQuantity = productElement.querySelector(".itog").textContent;
      addToCart(
        productId,
        productName,
        productPrice,
        productImage,
        productQuantity
      );
    });
  });

  function increase(event) {
    if (event.target.classList.contains("plus")) {
      let itog = event.target.closest(".ads").querySelector(".itog");
      itog.textContent = parseInt(itog.textContent, 10) + 1;
    }
  }

  function decrease(event) {
    if (event.target.classList.contains("minus")) {
      let itog = event.target.closest(".ads").querySelector(".itog");
      itog.textContent = Math.max(0, parseInt(itog.textContent, 10) - 1);
    }
  }

  document.querySelectorAll(".plus").forEach((button) => {
    button.addEventListener("click", increase);
  });

  document.querySelectorAll(".minus").forEach((button) => {
    button.addEventListener("click", decrease);
  });

  function sendCartItems() {
    const cartData = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price * item.quantity,
      quantity: item.quantity,
    }));
    console.log(cartData)

    fetch('./send.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  document.querySelector('.get__offer').addEventListener('submit', () => {
    sendCartItems();
  });
});


// search +add to cart

const products = [];

document.querySelectorAll('.cat1__product').forEach(product => {
    const id = product.getAttribute('data-product-id');
    const name = product.querySelector('.desc__name').innerText.trim();
    const description = product.querySelector('.desc__text').innerText.trim().split('\n')[0];
    const priceText = product.querySelector('.cost__with__weight').innerText.trim();
    const price = parseInt(priceText.replace(/\D/g, ''), 10); // Extract numeric value from price text
    const image = product.querySelector('.product__image').getAttribute('src'); // Extract image source

    products.push({ id: parseInt(id, 10), name, description, price, image });
});

const json = [
  {id: 1, price: 300, name: 'sushi', count: 4},
  {id: 2, price: 3010, name: 'sushi', count: 2},
  {id: 3, price: 3200, name: 'sushi', count: 42},
  {id: 4, price: 4300, name: 'sushi', count: 41},
];
const inputData = document.querySelector('.input-data');

function dataToInput(data) {
  let result = ""
  if(Array.isArray(data)) {
    data.forEach(d => {
      const str = JSON.stringify(d);
      result += str;
      inputData.value = result;
    })
  }
  console.log(result);
  return result;
}

dataToInput(json);
