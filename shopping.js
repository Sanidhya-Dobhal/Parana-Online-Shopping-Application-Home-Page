let xhr = new XMLHttpRequest();
let cart = [];
total = 0;
$("#cart").css("height",`${window.innerHeight-60}px`);
window.addEventListener("resize",height_setter);
function height_setter()
{
    $("#cart").css("height",`${window.innerHeight-60}px`);
}
xhr.open("GET","List.json",true);
xhr.onload = function()
{
  let res_obj = JSON.parse(xhr.responseText);
  for (i in res_obj)
  {
    const card = document.createElement("div");
    document.getElementById("pro_list").appendChild(card);
    card.style.minWidth = "200px";
    card.style.margin = "15px";
    $(card).addClass("buy_btn_present");
    $(card).addClass("all_cards");
    const prod_img = document.createElement("img");
    prod_img.setAttribute("src",`${res_obj[i].img}`);
    prod_img.classList.add("pro_list_item_image");
    card.appendChild(prod_img);
    const ele = document.createElement("p");
    ele.innerText = `Name: ${res_obj[i].name}`;
    card.appendChild(ele);
    const ele_price = document.createElement("p");
    ele_price.innerText = `Price: ₹${res_obj[i].price}`;
    card.appendChild(ele_price);
    const ele_cat = document.createElement("p");
    ele_cat.innerText = `Category: ${res_obj[i].category}`;
    card.appendChild(ele_cat);
    const but = document.createElement("button");
    but.innerText = "Add to cart";
    but.classList.add("buy_but");
    but.classList.add("btn");
    but.classList.add("btn-primary");
    $(but).css("display","block");
    $(but).css("margin","auto");
    card.appendChild(but);
    $(but).click(first_item_handler);
    let arr_obj = {
      item: res_obj[i],
      quantity: 0
    }
    cart.push(arr_obj);
  }
}
function first_item_handler(e)
{
  let all_cards = document.getElementsByClassName("all_cards");
  const but_cls=document.getElementsByClassName("buy_but");
  let i =0;
  for (i in all_cards)
    if(document.getElementsByClassName("all_cards")[i] ===$(e.target).parent()[0])
      break;
  e.target.remove();
  let pro_list=$("#pro_list");
  let new_qty_box = document.createElement("div");
  let pa = document.createElement("p");
  pa.innerText = "Qty: ";
  let inp = document.createElement("input");
  inp.setAttribute("type","number");
  inp.setAttribute("min",0);
  inp.style.width ="150px";
  inp.addEventListener("input",val_is_0);
  inp.addEventListener("input",cart_mod);
  new_qty_box.appendChild(pa);
  new_qty_box.style.borderWidth = "0px";
  pa.style.marginTop = "10px";
  new_qty_box.appendChild(inp);
  new_qty_box.style.display = "grid";
  new_qty_box.style.gridTemplateColumns = "auto auto";
  new_qty_box.style.alignItems = "center";
  let item_box = document.getElementsByClassName("all_cards")[i];
  item_box.appendChild(new_qty_box);
  item_box.classList.remove("buy_btn_present");
  item_box.classList.add("buy_btn_absent");
  inp.setAttribute("value",1);
  cart[i].quantity =1;
  list_insertion();
}
function val_is_0(event)
{
  if(event.target.value === '0'|| event.target.value ==='')
  {
    let all_cards = document.getElementsByClassName("all_cards"); 
    for (i =0;i<all_cards.length;i++)
    {
      // console.log(all_cards[i].getElementsByTagName("input")[0]);
      if(all_cards[i].getElementsByTagName("input")[0] === event.target)
      {
        all_cards[i].getElementsByTagName("input")[0].remove();
        const but = button_add_to_cart();
        all_cards[i].appendChild(but);
        all_cards[i].getElementsByTagName("div")[0].remove();
        cart[i].quantity = 0;
        }
      }
  }
  list_insertion();
  }
  function button_add_to_cart()
  {
        but  = document.createElement("button");
        but.innerText = "Add to cart";
        but.classList.add("buy_but");
        but.classList.add("btn");
        but.classList.add("btn-primary");
        but.style.display ="block";
        but.style.margin ="auto";
        $(but).click(first_item_handler);
        return but;
  }
function cart_mod(event){
  let all_cards = $(".all_cards");
  for (i=0;i<all_cards.length;i++)
  {
    if(all_cards[i].getElementsByTagName("button").length===0)//Only the elements that have quantity field present would be able to enter
    {
      let inp_field = all_cards[i].getElementsByTagName("input")[0] 
        if(inp_field === event.target)
          //This tells us the value of i in className at which the card is present in which the event occured
          cart[i].quantity = event.target.value;
    }
  }
    list_insertion();
}
function list_insertion()
{
  $("#The_real_list").remove();
  let real_list = document.createElement("div");
  real_list.setAttribute("id","The_real_list");
  document.getElementById("cart").appendChild(real_list);
for (i=0;i<cart.length;i++)
{
  if(cart[i].quantity !=0)
  {
    let cart_item = document.createElement("div");
    let cart_item_name = document.createElement("p");
    let cart_item_quant = document.createElement("p");
    cart_item_name.innerText = cart[i].item.name;
    cart_item_quant.innerText = "qauntity:";
    cart_item_quant.style.display ="inline";
    const item_num = document.createElement("input");
    item_num.setAttribute("type","text");
    item_num.style.width ="35px";
    item_num.style.height ="17px";
    item_num.style.fontSize ="15px";
    item_num.style.marginLeft ="1vw";
    item_num.value = cart[i].quantity;
    const cart_item_img = document.createElement("img");
    cart_item_img.style.width ="11vw";
    cart_item.style.width ="11.1vw";
    cart_item.style.marginTop ="10px";
    cart_item.style.border ="4px outset";
    cart_item.addEventListener("input",(e)=>{
      if ((e.target.value<'0'&& e.key>'9'))
        e.target.value = e.target.value.replace(/[^0-9]/g, '');//Used to restrict entering numbrer inside a text input field
      else{
        const cart_itm_par = ($(e.target).parent());
        const prod_name= cart_itm_par[0].getElementsByTagName("p")[0].innerText;
        const all_cards= document.getElementsByClassName("all_cards");
        let i=0;
        for (i in cart)
        {
          if(cart[i].item.name===prod_name)
            break;
        }
        all_cards[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0].value = e.target.value;
        console.log(e.target.value);
        cart[i].quantity = e.target.value;
        if(e.target.value === '0'|| e.target.value ==='')
        {
          $(e.target).parent()[0].remove();
          all_cards[i].getElementsByTagName("div")[0].remove();
          but = button_add_to_cart();
          all_cards[i].appendChild(but);
          cart[i].quantity = 0;
        }
      }
      total = total_calc();
    });
    // cart_item.style.backgroundColor ="rgb()"
    cart_item_img.setAttribute("src",cart[i].item.img);
    cart_item_img.setAttribute("pattern","\d*");
    cart_item.appendChild(cart_item_img);
    cart_item.appendChild(cart_item_name);
    cart_item.appendChild(cart_item_quant);
    cart_item.appendChild(item_num);
    real_list.appendChild(cart_item);
  }
  total = total_calc();
}
}
$("#buy_button").click(()=>{
  let total = total_calc();
  if(total===0)
  {
    alert("You have bought no items");
  }
  else{
  if(confirm(`Total amount is ₹ ${total}`))
    location.reload();
  }
});
xhr.send();
function total_calc()
{
  let tot = 0;
  let i=0;
  for(i in cart)
  {
    tot = tot + (cart[i].item.price * cart[i].quantity);
  }
  document.getElementById("Total_in_numbers").innerText = `₹ ${tot}`;
  return tot;
}
$(document).ready(function(){
  document.getElementById("Total_in_numbers").innerText = `₹ ${total}`;
  $("#cartAnchor").click(function(){
    const main_width =$("main")[0].clientWidth;
    console.log("Clicked");
    $("#cart").toggleClass("cart_inv");
    $("#cart").toggleClass("cart_vis");
    $("#main").toggleClass("main_size_mod");
    if($("#cart")[0].classList[0] ==="cart_inv")
    {
      $("#all_categories_cont div")[1].style.width=0.233* window.innerWidth;
  }
  else{
    const target_main_width = window.innerWidth*0.881
  }
    // setTimeout(responsive,200);
  });
  });
  $(window).resize(responsive);
  function responsive(){
    const main_width = $("main")[0].clientWidth;
    let i;
    $("#all_categories_cont")[0].style.width = `${main_width * 0.75}px`;
    if($("#cart")[0].classList[0]==="cart_vis")
    {
    if(main_width<=1223)
    {
      for(i=1;i<$("#all_categories_cont div").length;i++)
      {
        $("#all_categories_cont div")[i].style.width =`${0.233 *main_width}px`;
      }
      $("#all_categories_cont div")[0].style.width =`${0.466 *main_width}px`;
    }
    else{
      for(i=1;i<$("#all_categories_cont div").length;i++)
      {
        $("#all_categories_cont div")[i].style.width =`285px`;
      }
      $("#all_categories_cont div")[0].style.width =`570px`;
    }
  }
  else{
    for(i=1;i<$("#all_categories_cont div").length;i++)
      {
        $("#all_categories_cont div")[i].style.width =``;
      }
      $("#all_categories_cont div")[0].style.width =``;
  }
  };