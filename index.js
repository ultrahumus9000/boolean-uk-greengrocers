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

const groceryboard = document.querySelector(".item-list.store--item-list");
const ulincart = document.querySelector(".cart--item-list");

function creategrocerielists() {
  for (const good of state.goods) {
    createsingleitem(good);
  }
}

function createsingleitem(good) {
  const grocerylist = document.createElement("li");
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "store--item-icon");

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", `assets/icons/${good.id}.svg`);

  const btnEl = document.createElement("button");
  btnEl.innerText = "Add to cart";

  btnEl.addEventListener("click", function () {
    additemtocart(good);
    rendercarts();
  });

  divEl.append(imgEl, btnEl);
  grocerylist.append(divEl);
  groceryboard.append(grocerylist);
}

function additemtocart(targetItem) {
  const foundItem = state.cart.find(function (cartItem) {
    return cartItem.id === targetItem.id;
  });

  if (foundItem === undefined) {
    const cartItem = {
      id: targetItem.id,
      quantity: 1,
    };
    state.cart.push(cartItem);
  } else {
    foundItem.quantity++;
    if (foundItem.quantity > 5) {
      alert("buy no more than 5 items");
      foundItem.quantity = 5;
    }
  }
}

function rendercarts() {
  ulincart.innerText = "";
  for (const item of state.cart) {
    renderitemincart(item);
  }
  calculateprice();
}

function renderitemincart(cartItem) {
  const newgood = state.goods.find(function (good) {
    return good.id === cartItem.id;
  });
  let listincart = document.createElement("li");
  listincart.setAttribute("class", "list-in-cart");
  let imgincart = document.createElement("img");
  imgincart.setAttribute("class", "cart--item-icon");
  imgincart.setAttribute("src", `assets/icons/${cartItem.id}.svg`);

  let pincart = document.createElement("p");
  pincart.innerText = newgood.name;

  let spanprice = document.createElement("span");
  spanprice.innerText = ` ?? ${newgood.price}`;
  pincart.append(spanprice);

  let btnminusincart = document.createElement("button");
  btnminusincart.setAttribute("class", "quantity-btn remove-btn center");
  btnminusincart.innerText = "-";

  btnminusincart.addEventListener("click", function () {
    decrease(cartItem);
  });

  let spanincart = document.createElement("span");
  spanincart.setAttribute("class", `quantity-text center ${newgood.name}`);

  spanincart.innerText = cartItem.quantity;

  let btnplusincart = document.createElement("button");
  btnplusincart.setAttribute("class", "quantity-btn remove-btn center");
  btnplusincart.innerText = "+";
  btnplusincart.addEventListener("click", function () {
    increaseQuantity(cartItem);
  });

  listincart.append(
    imgincart,
    pincart,
    btnminusincart,
    spanincart,
    btnplusincart
  );
  ulincart.append(listincart);
  return listincart;
}

function calculateprice() {
  let total = 0;
  let totalprice = document.querySelector(".total-number");
  for (const item of state.cart) {
    let finditem = state.goods.find(function (good) {
      return good.id === item.id;
    });
    total = total + item.quantity * finditem.price;
  }
  totalprice.innerText = `?? ${total}`;
}

function increaseQuantity(cartdata) {
  ++cartdata.quantity;
  if (cartdata.quantity > 5) {
    alert("no more stock");
    cartdata.quantity = 5;
  }
  rendercarts();
}

function decrease(cartdata) {
  if (cartdata.quantity <= 1) {
    let deleteindex = state.cart.findIndex(function (item) {
      return item.id === cartdata.id;
    });
    state.cart.splice(deleteindex, 1);
  }
  --cartdata.quantity;
  rendercarts();
}

creategrocerielists();
