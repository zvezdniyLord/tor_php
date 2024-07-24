let orderArr = [];
document.addEventListener("DOMContentLoaded", (event) => {
  const data = new FormData(document.querySelector("form"));
  const inputPrice = document.querySelector(".input-price");
  const inputName = document.querySelector(".input-name");
  const inputOrder = document.querySelector(".input-order");
  let cartItems = [];

  function removeFromCart(productId) {
    cartItems = cartItems.filter((item) => item.id !== productId);
    /*arrayData.map((arr, i) => {
      if(arr.id === productId) {
        arrayData.splice(i, 1);
      }
    })*/
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
      inputCount.setAttribute("type", "hidden");
      inputCount.setAttribute("name", "name");
      inputCount.setAttribute("value", `${item.quantity}`);
      listItem.appendChild(inputCount);

      const inputPrice = document.createElement("input");
      inputPrice.setAttribute("type", "hidden");
      inputPrice.setAttribute("name", "price");
      inputPrice.setAttribute("value", `${item.price}`);
      listItem.appendChild(inputPrice);

      const inputName = document.createElement("input");
      inputName.setAttribute("type", "hidden");
      inputName.setAttribute("name", "order");
      inputName.setAttribute("value", `${item.name}`);
      listItem.appendChild(inputName);
      // Create and append the text content
      const textContent = document.createElement("span");
      textContent.classList.add("name__list");
      textContent.textContent = `${item.name} - ${
        item.price * item.quantity
      } R количество - ${item.quantity}`;
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
      orderAdd(productId, productName, productPrice, productQuantity);
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
    const cartData = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price * item.quantity,
      quantity: item.quantity,
    }));
    console.log(cartData);

    fetch("./send.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  document.querySelector(".get__offer").addEventListener("submit", () => {
    sendCartItems();
  });
});

// search +add to cart

const products = [];

document.querySelectorAll(".cat1__product").forEach((product) => {
  const id = product.getAttribute("data-product-id");
  const name = product.querySelector(".desc__name").innerText.trim();
  const description = product
    .querySelector(".desc__text")
    .innerText.trim()
    .split("\n")[0];
  const priceText = product
    .querySelector(".cost__with__weight")
    .innerText.trim();
  const price = parseInt(priceText.replace(/\D/g, ""), 10); // Extract numeric value from price text
  const image = product.querySelector(".product__image").getAttribute("src"); // Extract image source

  products.push({ id: parseInt(id, 10), name, description, price, image });
});

const inputData = document.querySelector(".input-data");

function orderAdd(productId, productName, productPrice, productQuantity) {
  orderArr.push({
    id: productId,
    name: productName,
    price: productPrice,
    count: productQuantity,
    summ: productPrice * productQuantity,
  });
  addTotalToOrderArr(orderArr);
  return orderArr;
}

function addTotalToOrderArr(orderArr) {
  const totalIndex = orderArr.findIndex((item) => item.id === "total");
  if (totalIndex !== -1) {
    orderArr.splice(totalIndex, 1);
  }
  const totalSum = orderArr.reduce((total, item) => total + item.summ, 0);
  orderArr.push({
    id: "total",
    name: "Общая сумма",
    price: totalSum,
    count: 1,
    СУММА: totalSum,
  });
  dataToInput(orderArr, inputData);
  return orderArr;
}
function dataToInput(data, input) {
  console.log(data, "data");
  let result = "";
  if (Array.isArray(data)) {
    data.forEach((d) => {
      const str = JSON.stringify(d);
      result += str;
      input.value = result;
    });
  }
  return result;
}

document.querySelector(".promo-code-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const promoCode = document.querySelector(".promo-code-input").value.trim();
  applyPromoCode(promoCode);
});

function applyPromoCode(promoCode) {
  const promoCodes = [
    { code: "a", discount: 20 }, // 20% discount
    { code: "b", discount: 10 }, // 10% discount
    // Add more promo codes here
  ];

  const promoCodeFound = promoCodes.find((code) => code.code === promoCode);

  if (promoCodeFound) {
    const numericItems = orderArr.filter(
      (item) => typeof item.summ === "number"
    );
    const totalSum = numericItems.reduce((total, item) => total + item.summ, 0);
    const discountAmount = (totalSum / 100) * promoCodeFound.discount;
    const newTotalSum = totalSum - discountAmount;

    // Remove the existing "total" item from the array
    const totalIndex = orderArr.findIndex((item) => item.id === "total");
    if (totalIndex !== -1) {
      orderArr.splice(totalIndex, 1);
    }

    // Add a new "total" item with the updated total sum
    orderArr.push({
      id: "total",
      name: "Общая сумма",
      price: newTotalSum,
      count: 1,
      summ: newTotalSum,
      СУММА: newTotalSum,
    });

    dataToInput(orderArr, inputData);
    console.log(
      ` Promo code applied: ${promoCodeFound.code} - ${promoCodeFound.discount}% discount`
    );
  } else {
    console.log("Invalid promo code");
  }
}
