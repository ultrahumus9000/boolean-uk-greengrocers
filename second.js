// function addItemToCart(targetItem) {
//   // IS THIS ITEM ALREADY IN THE CART
//   // APPROACH 1
//   let itemIsInCart = false;
//   for (const item of state.cart) {
//     if (item.id === targetItem.id) {
//       itemIsInCart = true;
//       item.quantity++;
//     }
//   }

//   if (!itemIsInCart) {
//     const cartItem = {
//       id: targetItem.id,
//       quantity: 1
//     };

//     state.cart.push(cartItem);

//  }
// approch one

const state = {
  goods: [
    { id: "001-beetroot", name: "beetroot", price: 1, stock: 5 },
    { id: "002-carrot", name: "carrot", price: 2, stock: 5 },
    { id: "003-apple", name: "apple", price: 3, stock: 5 },
    { id: "004-apricot", name: "apricot", price: 4, stock: 5 },
    { id: "005-avocado", name: "avacado", price: 5, stock: 5 },
    { id: "006-bananas", name: "bananas", price: 6, stock: 5 },
    {
      id: "007-bell-pepper",
      name: "bellpepper",
      price: 7,
      stock: 5,
      cart: false,
    },
    { id: "008-berry", name: "berry", price: 8, stock: 5 },
    { id: "009-blueberry", name: "blueberry", price: 9, stock: 5 },
    { id: "010-eggplant", name: "eggplant", price: 10, stock: 5 },
  ],
  cart: [],
};

function creategrocerielists() {
  const groceryboard = document.querySelector(".item-list.store--item-list");
  for (const good of state.goods) {
    let grocerylist = createsingleitem(good);
    groceryboard.append(grocerylist);
  }
}

function createsingleitem(good) {
  let quantity = 0;
  const grocerylist = document.createElement("li");
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "store--item-icon");

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", `assets/icons/${good.id}.svg`);

  const btnEl = document.createElement("button");
  btnEl.innerText = "Add to cart";
  btnEl.addEventListener("click", function () {
    quantity++;
    let exist = state.cart.find(function (data) {
      return data.id === good.id;
    });
    if (exist) {
      let spanincart = document.querySelector(`.${good.name}`);
      increaseQuantity(exist, spanincart);
    } else {
      let quantity = 1;
      additemtocart(good, quantity);
    }
  });
  divEl.append(imgEl, btnEl);
  grocerylist.append(divEl);
  return grocerylist;
}

function additemtocart(good, quantity) {
  let ulincart = document.querySelector(".cart--item-list");
  let listincart = document.createElement("li");
  listincart.setAttribute("class", "list-in-cart");
  let imgincart = document.createElement("img");
  imgincart.setAttribute("class", "cart--item-icon");
  imgincart.setAttribute("src", `assets/icons/${good.id}.svg`);

  let pincart = document.createElement("p");
  pincart.innerText = good.name;

  let spanprice = document.createElement("span");
  spanprice.innerText = ` ?? ${good.price}`;
  pincart.append(spanprice);

  let btnminusincart = document.createElement("button");
  btnminusincart.setAttribute("class", "quantity-btn remove-btn center");
  btnminusincart.innerText = "-";

  btnminusincart.addEventListener("click", function () {
    decrease(cartdata, spanincart, listincart);
  });

  let spanincart = document.createElement("span");
  spanincart.setAttribute("class", `quantity-text center ${good.name}`);

  spanincart.innerText = quantity;

  let btnplusincart = document.createElement("button");
  btnplusincart.setAttribute("class", "quantity-btn remove-btn center");
  btnplusincart.innerText = "+";
  btnplusincart.addEventListener("click", function () {
    increaseQuantity(cartdata, spanincart);
  });

  listincart.append(
    imgincart,
    pincart,
    btnminusincart,
    spanincart,
    btnplusincart
  );
  ulincart.append(listincart);

  const cartdata = {
    id: good.id,
    name: good.name,
    price: good.price,
    quantity: quantity,
  };
  state.cart.push(cartdata);
  calculateprice();
  return listincart;
}

function calculateprice() {
  let total = 0;
  let totalprice = document.querySelector(".total-number");
  for (const item of state.cart) {
    total = total + item.quantity * item.price;
  }
  totalprice.innerText = `?? ${total}`;
}

function increaseQuantity(cartdata, spanincart) {
  ++cartdata.quantity;
  spanincart.innerText = cartdata.quantity;
  if (cartdata.quantity > 5) {
    alert("no more stock");
    cartdata.quantity = 5;
    spanincart.innerText = 5;
  }
  calculateprice();
}

function decrease(cartdata, spanincart, listincart) {
  --cartdata.quantity;
  spanincart.innerText = cartdata.quantity;
  if (cartdata.quantity <= 0) {
    listincart.remove();
    state.cart.pop();
  }
  calculateprice();
}

creategrocerielists();
