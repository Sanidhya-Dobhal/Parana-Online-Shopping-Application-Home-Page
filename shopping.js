let xhr = new XMLHttpRequest();
let cart = [];
total = 0;
flag = 0; //Flag is used for responsiveness, it will be set to 1 when width<1160 and used when the width is between 1160 and 12
let respObject;
$("#cart").css("height", `${window.innerHeight - 60}px`);
window.addEventListener("resize", heightSetter);
function heightSetter() {
  $("#cart").css("height", `${window.innerHeight - 60}px`);
}
xhr.open("GET", "List.json", true);
xhr.onload = function () {
  respObject = JSON.parse(xhr.responseText);
  featuredItemsRandomizer(respObject);
  for (let i in respObject) {
    if (localStorage.getItem("cartItems")) {
      cart = JSON.parse(localStorage.getItem("cartItems"));
    } else {
      let arr_obj = {
        item: respObject[i],
        quantity: 0,
      };
      cart.push(arr_obj);
    }
    const card = cardGenerator(i);
    $(card).addClass("all-cards");
    $("#pro_list")[0].appendChild(card);
  }
  for (let i = 0; i < cart.length; i++) {
    let qtyBoxInProductList;
    if (cart[i]?.quantity > 0) {
      qtyBoxInProductList = generateInputBoxInItemList(cart[i].quantity);
      let itemCard = $(".all-cards")[i];
      itemCard
        .getElementsByClassName("product-details-div")[0]
        .appendChild(qtyBoxInProductList);
      itemCard.classList.remove("buy_btn_present");
      itemCard.classList.add("buy_btn_absent");
      itemCard.getElementsByTagName("button")[1].remove();
    }
  }
  cartItemsRenderer();
  setTimeout(() => window.scrollTo(0, 0), 10); //be at the top when document loads
};
xhr.onerror = function () {
  for (i = 0; i <= 2; i++) {
    $(".featured-item")[i].innerText = "Error getting data";
    $(".featured-item")[i].style.display = "flex";
    $(".featured-item")[i].style.justifyContent = "center";
    $(".featured-item")[i].style.alignItems = "center";
  }
};
function cardGenerator(i) {
  const card = document.createElement("div");
  const productDetailsDiv = document.createElement("div");
  productDetailsDiv.classList.add("product-details-div");
  $(card).addClass("buy_btn_present");
  const productImgDiv = document.createElement("div");
  productImgDiv.classList.add("product-image-div");
  const productImg = document.createElement("img");
  productImg.setAttribute("src", `${respObject[i].img}`);
  productImg.classList.add("pro_list_item_image");
  productImg.addEventListener("dblclick", () => {
    location = `./individualItemPage/index.html?${i}`;
  });
  productImgDiv.appendChild(productImg);
  card.appendChild(productImgDiv);
  const productName = $(`<p><span>Name:</span> ${respObject[i].name}</p>`);
  productName.css("margin-top", "12px");
  productDetailsDiv.appendChild(productName[0]);
  const productPrice = document.createElement("p");
  productPrice.innerText = `₹${respObject[i].price}`;
  productDetailsDiv.appendChild(productPrice);
  productPrice.style.fontSize = "20px";
  const elementCategory = document.createElement("p");
  elementCategory.innerHTML = `<span>Category:</span> ${respObject[i].category}`;

  elementCategory.classList.add("product-category");
  productDetailsDiv.appendChild(elementCategory);
  const infoButton = document.createElement("button");
  infoButton.classList.add("btn");
  infoButton.classList.add("btn-outline-info");
  infoButton.classList.add("item-buttons-in-product-list");
  infoButton.style.display = "block";
  infoButton.innerText = "More details";
  infoButton.addEventListener("click", () => {
    location = `./individualItemPage/index.html?${i}`;
  });
  productDetailsDiv.appendChild(infoButton);
  const addToCartButton = addToCartButtonGenerator();
  productDetailsDiv.appendChild(addToCartButton);
  card.appendChild(productDetailsDiv);
  return card;
}
function firstItemHandler(e) {
  let all_cards = document.getElementsByClassName("all-cards");
  let i = 0;
  let addToCartButton = e.target;
  console.log("e.target parent", $(addToCartButton).parent());
  for (i in all_cards)
    if (
      document.getElementsByClassName("all-cards")[i] ===
      $(addToCartButton).parent().parent()[0]
    )
      break;
  addToCartButton.remove();
  let new_qty_box = generateInputBoxInItemList(1);
  let item_box = document.getElementsByClassName("all-cards")[i];
  let itemBoxDetails = item_box.getElementsByClassName(
    "product-details-div"
  )[0];
  console.log(item_box);
  itemBoxDetails.appendChild(new_qty_box);
  item_box.classList.remove("buy_btn_present");
  item_box.classList.add("buy_btn_absent");
  cart[i].quantity = 1;
  cartItemsRenderer();
}
function generateInputBoxInItemList(number) {
  let new_qty_box = document.createElement("div");
  let pa = document.createElement("p");
  pa.innerText = "Qty: ";
  pa.style.marginBottom = 0;
  pa.style.marginRight = "4px";
  let inp = document.createElement("input");
  inp.setAttribute("type", "number");
  inp.setAttribute("min", 0);
  inp.setAttribute("max", 999);
  inp.style.width = "136px";
  inp.addEventListener("change", valueIs0);
  inp.addEventListener("input", cartUpdater);
  inp.setAttribute("value", number);
  new_qty_box.appendChild(pa);
  new_qty_box.style.borderWidth = "0px";
  new_qty_box.appendChild(inp);
  new_qty_box.style.display = "flex";
  new_qty_box.style.flesDirection = "row";
  new_qty_box.style.alignItems = "center";
  new_qty_box.style.padding = "0 10px";
  return new_qty_box;
}
function valueIs0(event) {
  if (event.target.value === "0" || event.target.value === "") {
    let all_cards = $(".all-cards");
    for (i = 0; i < all_cards.length; i++) {
      if (all_cards[i].getElementsByTagName("input")[0] === event.target) {
        all_cards[i].getElementsByTagName("input")[0].remove();
        const but = addToCartButtonGenerator();
        all_cards[i]
          .getElementsByClassName("product-details-div")[0]
          .appendChild(but);
        all_cards[i]
          .getElementsByTagName("div")[1]
          .getElementsByTagName("div")[0]
          .remove();
        cart[i].quantity = 0;
      }
    }
  }
  cartItemsRenderer();
}
function addToCartButtonGenerator() {
  but = document.createElement("button");
  but.innerText = "Add to cart";
  but.classList.add("btn");
  but.classList.add("btn-primary");
  but.classList.add("item-buttons-in-product-list");
  but.style.display = "block";
  but.style.marginBottom = "12px";
  $(but).click(firstItemHandler);
  return but;
}
function cartUpdater(event) {
  let all_cards = $(".all-cards");
  if (event.target.value > 999) {
    event.target.value = Math.floor(event.target.value / 10);
  }
  for (i = 0; i < all_cards.length; i++) {
    if (all_cards[i].getElementsByTagName("input").length !== 0) {
      //Only the elements that have quantity field present would be able to enter
      let inp_field = all_cards[i].getElementsByTagName("input")[0];
      if (inp_field === event.target) cart[i].quantity = event.target.value;
    }
  }
  cartItemsRenderer();
}
function cartItemsRenderer() {
  $("#item-list-in-cart").remove();
  let cartItemsList = document.createElement("div");
  cartItemsList.setAttribute("id", "item-list-in-cart");
  $("#cart")[0].appendChild(cartItemsList);
  for (i = 0; i < cart.length; i++) {
    if (cart[i].quantity != 0) {
      let cart_item = document.createElement("div");
      let cart_item_name = document.createElement("p");
      let itemPrice = document.createElement("p");
      cart_item_name.innerText = cart[i].item.name;
      itemPrice.innerHTML = `<b>₹${cart[i].item.price}</b> x`;
      itemPrice.style.display = "inline";
      const item_num = document.createElement("input");
      item_num.setAttribute("type", "text");
      item_num.setAttribute("maxlength", "3");
      item_num.style.width = "35px";
      item_num.style.height = "17px";
      item_num.style.fontSize = "15px";
      item_num.style.marginLeft = "1vw";
      item_num.value = cart[i].quantity;
      const cart_item_img = document.createElement("img");
      cart_item_img.style.height = "155px";
      item_num.addEventListener("input", (e) => {
        if (e.data !== null) {
          // e.target.value = e.target.value.replace(/[^0-9]/g, '');
          if (e.data[0] < "0" || e.data[0] > "9") {
            //this if statement is used to restrict the user from entering anything other than number
            console.log(e.data);
            let j = 0;
            for (j = 0; j < e.target.value.length; j++) {
              if (e.target.value.charAt(j) === e.data) {
                break;
              }
            }
            if (j === e.target.value.length - 1)
              e.target.value = e.target.value.substring(
                0,
                e.target.value.length - 1
              );
            else {
              e.target.value =
                e.target.value.substring(0, j) +
                e.target.value.substring(j + 1, e.target.value.length);
            }
          }
        }
        const cart_itm_par = $(e.target).parent();
        const prod_name =
          cart_itm_par[0].getElementsByTagName("p")[0].innerText;
        const all_cards = document.getElementsByClassName("all-cards");
        let i = 0;
        for (i in cart) {
          if (cart[i].item.name === prod_name) break;
        }
        all_cards[i].getElementsByTagName("input")[0].value = e.target.value;
        cart[i].quantity = e.target.value;
        if (e.target.value === "0" || e.target.value === "") {
          $(e.target).parent()[0].remove();
          all_cards[i]
            .getElementsByTagName("div")[1]
            .getElementsByTagName("div")[0]
            .remove();
          but = addToCartButtonGenerator();
          all_cards[i]
            .getElementsByClassName("product-details-div")[0]
            .appendChild(but);
          cart[i].quantity = 0;
        }
        total = totalCostCalculatonAndLocalStorage();
      });
      cart_item_img.setAttribute("src", cart[i].item.img);
      cart_item.classList.add("cart_item_cls");
      cart_item.appendChild(cart_item_img);
      cart_item.appendChild(cart_item_name);
      cart_item.appendChild(itemPrice);
      cart_item.appendChild(item_num);
      cartItemsList.appendChild(cart_item);
    }
    total = totalCostCalculatonAndLocalStorage();
  }
}
$("#buy-button-in-cart").click(() => {
  let total = totalCostCalculatonAndLocalStorage();
  if (total === 0) {
    alert("You have bought no items");
  } else {
    if (confirm(`Total amount is ₹ ${total}`)) {
      cart.forEach((item) => {
        item.quantity = 0;
      });
      localStorage.setItem("cartItems", JSON.stringify(cart));
      location.reload();
    }
  }
});
xhr.send();
function totalCostCalculatonAndLocalStorage() {
  let tot = 0;
  let i = 0;
  for (i in cart) {
    tot = tot + cart[i].item.price * cart[i].quantity;
  }
  $("#total-in-numbers")[0].innerText = `₹ ${tot}`;
  localStorage.setItem("cartItems", JSON.stringify(cart));
  return tot;
}
$(document).ready(function () {
  $("#total-in-numbers")[0].innerText = `₹ ${total}`;
  $("#cart-anchor-in-header")
    .parent()
    .click(function () {
      $("#cart").toggleClass("cart_inv");
      $("#cart").toggleClass("cart_vis");
      if (window.innerWidth > 600 && $("#cart")[0].classList[0] === "cart_vis")
        $("#main").addClass("main_size_mod");
      else if (window.innerWidth > 600) $("#main").removeClass("main_size_mod");
      responsive();
    });
});

function responsive() {
  //We will not be directly using main's client width as there is a transition time of 0.2s
  if (window.innerWidth > 600) {
    console.log($("#all_categories_cont")[0].clientWidth);
    if ($("#cart")[0].classList[0] === "cart_vis") {
      $("#all_categories_cont")[0].style.width = `${
        0.8 * window.innerWidth * 0.881
      }px`;
      $("#main").addClass("main_size_mod");
      for (i = 1; i < $("#all_categories_cont div").length; i++) {
        $("#all_categories_cont div")[i].style.width = `${
          0.31 * 0.8 * window.innerWidth * 0.881
        }px`; //What I am doing here is that initially the width of all_categories_cont is 75vw, but when the cart is open I want it to become 80vw, so it the categories div's have to be adjusted in the same proportion.
        //So I caclulated what is the width of each div with respect to the all_categories_cont and the 23.3%(initially the width was calculated with respect to main) of main width comes out to be 31% of all_categories_cont. Mathematically, 23.3*100/75=31.0 as the all_cont_div is initially set to 75vw.
        //This is required as when the cart is visible the all_categories_cont is made 80% of main width instead of 75% so the categories take more space than initial.
        //I am doing all this as when the cart is visible then 75% width seems to utilize less space for contenet an more space is left vacant
      }
      $("#all_categories_cont div:nth-child(1)")[0].style.width = `${
        0.31 * 0.8 * window.innerWidth * 0.881 * 2
      }px`;
      $("#The_features")[0].style.width = `${
        0.85 * window.innerWidth * 0.881
      }px`; //window.innerWidth*0.881 =main's width)
      if (window.innerWidth <= 1260 && window.innerWidth >= 1180) {
        for (i = 0; i < $(".featured-item").length; i++) {
          $(".featured-item")[i].style.width = `${
            300 - (1260 - window.innerWidth) / 3
          }px`;
        }
      } else if (window.innerWidth > 1260) {
        //Assuming when the screen size is greater than 1260
        for (i = 0; i < $(".featured-item").length; i++) {
          $(".featured-item")[i].style.width = "300px";
        }
      }
      if (window.innerWidth <= 1160) {
        flag = 1;
        for (i = 1; i <= 4; i++) {
          $("#all_categories_cont div")[i].style.width = `${
            $("#all_categories_cont")[0].clientWidth / 2 - 50
          }px`;
        }
        $("#all_categories_cont div:nth-child(1)")[0].style.width = `${
          $("#all_categories_cont")[0].clientWidth - 50
        }px`;
        $("#The_features")[0].style.width = "928px";
        $("#The_features").parent()[0].style.overflowX = "scroll";
      }
    } else {
      //The cart is not visible
      if (flag === 1) {
        flag = 0;
        for (i = 0; i < $("#all_categories_cont div").length; i++) {
          $("#all_categories_cont div")[i].style.transitionDuration = "0s";
        }
        $("#all_categories_cont")[0].style.transitionDuration = "0s";
      }
      for (i = 1; i < $("#all_categories_cont div").length; i++) {
        $("#all_categories_cont div")[i].style.width = `${
          0.233 * window.innerWidth
        }px`;
      }
      $("#all_categories_cont div:nth-child(1)")[0].style.width = `${
        0.233 * window.innerWidth * 2
      }px`;
      $("#all_categories_cont")[0].style.width = `${
        0.75 * window.innerWidth
      }px`;
      $("#The_features")[0].style.width = `${0.8 * window.innerWidth}px`;
      if (window.innerWidth <= 1210 && window.innerWidth >= 1130) {
        for (i = 0; i < $(".featured-item").length; i++) {
          $(".featured-item")[i].style.width = `${
            300 - (1210 - window.innerWidth) / 3
          }px`;
        }
      } else if (window.innerWidth > 1210) {
        //Assuming when the screen size is greater than 1210
        for (i = 0; i < $(".featured-item").length; i++) {
          $(".featured-item")[i].style.width = "300px";
        }
      }
      for (
        i = 0;
        i < $("#all_categories_cont div").length;
        i++ //This is if the trasitionDuration was set to 0
      ) {
        $("#all_categories_cont div")[i].style.transitionDuration = "0.2s";
      }
    }
    if (window.innerWidth <= 1160) {
      //For the first section, featured items
      flag = 1;
      for (i = 1; i <= 4; i++)
        $("#all_categories_cont div")[i].style.width = `${
          $("#all_categories_cont")[0].clientWidth / 2 - 50
        }px`;
      $("#all_categories_cont div:nth-child(1)")[0].style.width = `${
        $("#all_categories_cont")[0].clientWidth - 50
      }px`;
      $("#The_features")[0].style.width = "928px";
      $("#The_features").parent()[0].style.overflowX = "scroll";
    }
    if (window.innerWidth <= 800) {
      $("#all_categories_cont")[0].style.display = "block";
      $("#tech_img")[0].setAttribute(
        "src",
        "Images/Categories/Tech_cat_for_phone.png"
      );
      $("#tech_img")[0].style.width = "200px";
      $("#tech_img").siblings()[0].style.width = "125px";
      for (i = 0; i < $("#all_categories_cont div").length; i++)
        $("#all_categories_cont div")[i].style.width = `${
          $("#all_categories_cont")[0].clientWidth - 50
        }px`;
    } else if (window.innerWidth <= 911) {
      if (
        $("main")[0].clientWidth === window.innerWidth &&
        $("#cart")[0].classList[0] === "cart_vis"
      ) {
        //if cart is clicked and is going to be visible
        $("#all_categories_cont")[0].style.display = "block";
        $("#tech_img")[0].setAttribute(
          "src",
          "Images/Categories/Tech_cat_for_phone.png"
        );
        $("#tech_img")[0].style.width = "200px";
        // $("#tech_img").siblings()[0].style.width = "125px";
        for (i = 0; i < $("#all_categories_cont div").length; i++)
          $("#all_categories_cont div")[i].style.width = `${
            0.8 * window.innerWidth * 0.881 - 50
          }px`;
      } else if (
        $("main")[0].clientWidth !== window.innerWidth &&
        $("#cart")[0].classList[0] === "cart_inv"
      ) {
        //This implies the cart is going to be invisible
        $("#all_categories_cont")[0].style.display = "grid";
        $("#tech_img")[0].setAttribute(
          "src",
          "Images/Categories/tech_category_img.png"
        );
        $("#tech_img").siblings()[0].style.width = "250px";
        $("#tech_img")[0].style.width = "";
      } else if ($("main")[0].clientWidth !== window.innerWidth) {
        //Implies the cart is visible
        $("#all_categories_cont")[0].style.display = "block";
        for (i = 0; i < $("#all_categories_cont div").length; i++)
          $("#all_categories_cont div")[i].style.width = `${
            0.8 * window.innerWidth * 0.881 - 50
          }px`;
        $("#tech_img")[0].setAttribute(
          "src",
          "Images/Categories/Tech_cat_for_phone.png"
        );
        $("#tech_img")[0].style.width = "200px";
      }
    } else {
      $("#all_categories_cont")[0].style.display = "grid";
      $("#tech_img")[0].setAttribute(
        "src",
        "Images/Categories/tech_category_img.png"
      );
      $("#tech_img").siblings()[0].style.width = "250px";
      $("#tech_img")[0].style.width = "";
    }
  } else {
    $("main")[0].style.width = window.innerWidth;
    $("#all_categories_cont")[0].style.display = "block";
    $("#all_categories_cont")[0].style.width = 0.8;
    $("#tech_img")[0].setAttribute(
      "src",
      "Images/Categories/Tech_cat_for_phone.png"
    );
    $("#all_categories_cont")[0].style.width = `${
      0.9 * window.innerWidth * 0.9
    }px`;
    for (i = 0; i < $("#all_categories_cont div").length; i++)
      $("#all_categories_cont div")[i].style.width = `${
        $("#all_categories_cont")[0].clientWidth - 50
      }px`;
    $("#The_features").parent()[0].style.overflowX = "scroll";
    $("main")[0].classList.remove("main_size_mod");
  }
  //Overlay:
  if ($("#cart")[0].classList[0] === "cart_vis" && window.innerWidth <= 600) {
    $("#overlay")[0].style.display = "block";
  } else {
    $("#overlay")[0].style.display = "none";
  }
}
function featuredItemsRandomizer(allItemsObjectsArr) {
  const randomIndexSet = new Set();
  while (randomIndexSet.size !== 3) {
    randomIndexSet.add(
      Math.floor(Math.random() * Object.keys(allItemsObjectsArr).length) + 1
    );
  }
  const randomIndexArr = Array.from(randomIndexSet);
  randomIndexArr.sort(); //Will work correctly only till products are <10 as the function sorts alphabatecally
  for (i = 0; i <= 2; i++) {
    const currObjFromRandomArray =
      allItemsObjectsArr[`Product${randomIndexArr[i]}`];
    const currFeaturedDivChildren = $(".featured-item")[i].children;
    currFeaturedDivChildren[0].setAttribute("src", currObjFromRandomArray.img);
    currFeaturedDivChildren[0].style.visibility = "visible";
    currFeaturedDivChildren[1].innerText = currObjFromRandomArray.name;
    currFeaturedDivChildren[2].innerText = `₹${currObjFromRandomArray.price}`;
    currFeaturedDivChildren[3].getElementsByTagName(
      "button"
    )[0].style.visibility = "visible";
  }
}
function selectChange(event) {
  if (event.target.value === "Categories") {
    $("#categories-and-prod-list")[0].scrollIntoView();
  } else {
    $("#products-list-section")[0].scrollIntoView();
  }
}
window.addEventListener("resize", responsive);
responsive();
