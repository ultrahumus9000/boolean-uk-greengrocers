/*

This is how an item object should look like

{
      id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35 <- You can come up with your own prices
    }

*/
// Description
// In this exercise we explore a common scenario in eCommerce, adding and removing items from the cart, and calculating the total.

// Deliverables
// - A user can view a selection of items in the store
// - From the store, a user can add an item to their cart
// - From the cart, a user can view and adjust the number of items in their cart
// - If an item's quantity equals zero it is removed from the cart
// - A user can view the current total in their cart

// Instructions
// - Use this template as a starting point => https://codesandbox.io/s/js-exercise-greengrocer-template-grqi6
// - Create a state object
// - Create action functions that update state
// - Create render functions that read from state

// Tips
// - Start with the logic first, use console.log(state) to check your logic is working; when the logic is working as expected move onto styling
// - Taking HTML semantics into consideration, use a button when an action is happening on the same page

// Challenge
// Create a json-server, and make your app persist the data

// Challenge 2
// - Add filters to the store ie. filter by item type; when a user clicks a filter they will only see items of that type
// - Add sorting to the store ie. sort by price or sort alphabetically; when a user clicks sort they will see a sorted list of items

const state = {
  goods: [
    { id: "001-beetroot", name: "beetroot", price: 1, stock: 5, cart: false },
    { id: "002-carrot", name: "carrot", price: 2, stock: 5, cart: false },
    { id: "003-apple", name: "apple", price: 3, stock: 5, cart: false },
    { id: "004-apricot", name: "apricot", price: 4, stock: 5, cart: false },
    { id: "005-avocado", name: "avacado", price: 5, stock: 5, cart: false },
    { id: "006-bananas", name: "bananas", price: 6, stock: 5, cart: false },
    {
      id: "007-bell-pepper",
      name: "bellpepper",
      price: 7,
      stock: 5,
      cart: false,
    },
    { id: "008-berry", name: "berry", price: 8, stock: 5, cart: false },
    { id: "009-blueberry", name: "blueberry", price: 9, stock: 5, cart: false },
    { id: "010-eggplant", name: "eggplant", price: 10, stock: 5, cart: false },
  ],
  cart: [],
};

function creategrocerielists() {
  const groceryboard = document.querySelector("ul");
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
    const cartdata = {
      id: good.id,
      name: good.name,
      price: good.price,
      quantity: quantity,
      totalprice: quantity * good.price,
    };
    console.log(cartdata);
    let y = state.cart.find(function (data) {
      return data === cartdata;
    });
    console.log(y);

    if (state.cart.includes(cartdata)) {
      console.log(state.cart);
    } else {
      additemtocard(good, quantity);
      console.log(state.cart);
    }
  });
  divEl.append(imgEl, btnEl);
  grocerylist.append(divEl);

  return grocerylist;
}

function additemtocard(good, quantity) {
  let ulincart = document.querySelector(".cart--item-list");
  let listincart = document.createElement("li");
  listincart.setAttribute("class", "list-in-cart");
  let imgincart = document.createElement("img");
  imgincart.setAttribute("class", "cart--item-icon");
  imgincart.setAttribute("src", `assets/icons/${good.id}.svg`);

  let pincart = document.createElement("p");
  pincart.innerText = good.name;

  let spanprice = document.createElement("span");
  spanprice.innerText = ` £ ${good.price}`;
  pincart.append(spanprice);

  let btnminusincart = document.createElement("button");
  btnminusincart.setAttribute("class", "quantity-btn remove-btn center");
  btnminusincart.innerText = "-";

  btnminusincart.addEventListener("click", function () {
    quantity--;
    if (quantity <= 0) {
      listincart.remove();
    }
    spanincart.innerText = quantity;
    state.cart.pop();
    calculateprice();
  });

  let spanincart = document.createElement("span");
  spanincart.setAttribute("class", "quantity-text center");
  spanincart.innerText = quantity;

  let btnplusincart = document.createElement("button");
  btnplusincart.setAttribute("class", "quantity-btn remove-btn center");
  btnplusincart.innerText = "+";
  btnplusincart.addEventListener("click", function () {
    ++quantity;
    spanincart.innerText = quantity;
    if (quantity > 5) {
      alert("no more stock");
      quantity = 5;
      spanincart.innerText = 5;
    }

    state.cart.push(cartdata);
    calculateprice();
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
    totalprice: quantity * [good.price],
  };
  state.cart.push(cartdata);
  calculateprice();
}
function calculateprice() {
  let total = 0;
  let totalprice = document.querySelector(".total-number");
  for (const item of state.cart) {
    total = total + item.totalprice;
  }
  totalprice.innerText = `£ ${total}`;
}

creategrocerielists();
