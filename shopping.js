let xhr = new XMLHttpRequest();
let cart = [];
total = 0;
flag = 0;//Flag is used for responsiveness, it will be set to 1 when width<1160 and used when the width is between 1160 and 12
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
  inp.setAttribute("max",999);
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
  if(event.target.value>999)
  {
    event.target.value = Math.floor(event.target.value/10);
  }
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
    item_num.setAttribute("maxlength","3");
    item_num.style.width ="35px";
    item_num.style.height ="17px";
    item_num.style.fontSize ="15px";
    item_num.style.marginLeft ="1vw";
    item_num.value = cart[i].quantity;
    const cart_item_img = document.createElement("img");
    cart_item_img.style.height ="155px";
    item_num.addEventListener("input",(e)=>{
      if (e.data!== null){
        // e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if(e.data[0]<'0'|| e.data[0]>'9')//this if statement is used to restrict the user from entering anything other than number 
        {
          console.log(e.data);
          let j=0;
          for(j=0;j<e.target.value.length;j++){
            if(e.target.value.charAt(j)===e.data){
              console.log("caught");
              break;
            }
            
          }
          if(j===e.target.value.length-1)
                e.target.value = e.target.value.substring(0,e.target.value.length-1);
              else
              {
                 e.target.value = e.target.value.substring(0,j) + e.target.value.substring(j+1,e.target.value.length);
              }
        }
      }
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
        cart[i].quantity = e.target.value;
        if(e.target.value === '0'|| e.target.value ==='')
        {
          $(e.target).parent()[0].remove();
          all_cards[i].getElementsByTagName("div")[0].remove();
          but = button_add_to_cart();
          all_cards[i].appendChild(but);
          cart[i].quantity = 0;
      }
      total = total_calc();
    });
    cart_item_img.setAttribute("src",cart[i].item.img);
    cart_item.classList.add("cart_item_cls");
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
  $("#cartAnchor").parent().click(function(){
    $("#cart").toggleClass("cart_inv");
    $("#cart").toggleClass("cart_vis");
  if(window.innerWidth >600 && $("#cart")[0].classList[0] === "cart_vis")
    $("#main").addClass("main_size_mod");
  else if(window.innerWidth>600)
  $("#main").removeClass("main_size_mod");
  responsive();
  });
  });

  function responsive(){//We will not be directly using main's client width as there is a transition time of 0.2s
    if(window.innerWidth>600){
    console.log($("#all_categories_cont")[0].clientWidth);
    if($("#cart")[0].classList[0]==="cart_vis")
    {
      $("#all_categories_cont")[0].style.width = `${0.8*window.innerWidth * .881}px`;
      $("#main").addClass("main_size_mod");
      for(i=1;i<$("#all_categories_cont div").length;i++)
      {
        $("#all_categories_cont div")[i].style.width=`${0.31 * 0.8*window.innerWidth * .881}px`;//What I am doing here is that initially the width of all_categories_cont is 75vw, but when the cart is open I want it to become 80vw, so it the categories div's have to be adjusted in the same proportion.
        //So I caclulated what is the width of each div with respect to the all_categories_cont and the 23.3%(initially the width was calculated with respect to main) of main width comes out to be 31% of all_categories_cont. Mathematically, 23.3*100/75=31.0 as the all_cont_div is initially set to 75vw.
        //This is required as when the cart is visible the all_categories_cont is made 80% of main width instead of 75% so the categories take more space than initial. 
        //I am doing all this as when the cart is visible then 75% width seems to utilize less space for contenet an more space is left vacant
      }
      $("#all_categories_cont div:nth-child(1)")[0].style.width = `${0.31 *  0.8*window.innerWidth * .881* 2}px`;
      $("#The_features")[0].style.width = `${0.85*window.innerWidth * .881}px`;//window.innerWidth*0.881 =main's width)
      if(window.innerWidth <= 1260 && window.innerWidth>=1180)
    {
      for(i=0;i<$(".Featured-item").length;i++)
      {
        $(".Featured-item")[i].style.width = `${300-(1260-window.innerWidth)/3}px`;
      }
    }
    else if(window.innerWidth > 1260){//Assuming when the screen size is greater than 1260
      for(i=0;i<$(".Featured-item").length;i++)
      {
        $(".Featured-item")[i].style.width = "300px";
      }
    }
    if(window.innerWidth<=1160)
    {
      flag = 1;
      for(i=1;i<=4;i++)
      {
        $("#all_categories_cont div")[i].style.width = `${$("#all_categories_cont")[0].clientWidth/2 -50}px`;
      }
      $("#all_categories_cont div:nth-child(1)")[0].style.width = `${$("#all_categories_cont")[0].clientWidth -50}px`;
      $("#The_features")[0].style.width = "928px";
      $("#The_features").parent()[0].style.overflowX ="scroll";

    }
    }
    else{//The cart is not visible 
      if(flag===1)
      {
        flag = 0;
        for(i=0;i<$("#all_categories_cont div").length;i++)
        {
          $("#all_categories_cont div")[i].style.transitionDuration = "0s";
        }
        $("#all_categories_cont")[0].style.transitionDuration = "0s";
      }
      for(i=1;i<$("#all_categories_cont div").length;i++)
      {
        $("#all_categories_cont div")[i].style.width=`${0.233 * window.innerWidth}px`;
      }
      $("#all_categories_cont div:nth-child(1)")[0].style.width = `${0.233 * window.innerWidth * 2}px`;
      $("#all_categories_cont")[0].style.width = `${0.75*window.innerWidth}px`;
      $("#The_features")[0].style.width = `${0.8*window.innerWidth}px`;
      if(window.innerWidth <= 1210 && window.innerWidth>=1130)
    {
      for(i=0;i<$(".Featured-item").length;i++)
      {
        $(".Featured-item")[i].style.width = `${300-(1210-window.innerWidth)/3}px`;
      }
    }
      else if(window.innerWidth > 1210){//Assuming when the screen size is greater than 1210
      for(i=0;i<$(".Featured-item").length;i++)
      {
        $(".Featured-item")[i].style.width = "300px";
      }
    }
    for(i=0;i<$("#all_categories_cont div").length;i++)//This is if the trasitionDuration was set to 0
        {
          $("#all_categories_cont div")[i].style.transitionDuration = "0.2s";
        }
    }
    if(window.innerWidth<=1160)//For the first section, featured items
    {
      flag = 1;
      for(i=1;i<=4;i++)
        $("#all_categories_cont div")[i].style.width = `${$("#all_categories_cont")[0].clientWidth/2 -50}px`;
      $("#all_categories_cont div:nth-child(1)")[0].style.width = `${$("#all_categories_cont")[0].clientWidth -50}px`;
      $("#The_features")[0].style.width = "928px";
      $("#The_features").parent()[0].style.overflowX ="scroll";
    }
    if(window.innerWidth<=800)
    {
      $("#all_categories_cont")[0].style.display = "block";
      $("#tech_img")[0].setAttribute("src","Tech_cat_for_phone.png");
      $("#tech_img")[0].style.width = "200px";
      $("#tech_img").siblings()[0].style.width = "125px";
      for(i=0;i<$("#all_categories_cont div").length;i++)
        $("#all_categories_cont div")[i].style.width = `${$("#all_categories_cont")[0].clientWidth -50}px`;
    }
    else if(window.innerWidth<=911)
    {

      if((($("main")[0].clientWidth === window.innerWidth) && ($("#cart")[0].classList[0]==="cart_vis")))//if cart is clicked and is going to be visible
      {
        $("#all_categories_cont")[0].style.display = "block";
        $("#tech_img")[0].setAttribute("src","Tech_cat_for_phone.png");
      $("#tech_img")[0].style.width = "200px";
      // $("#tech_img").siblings()[0].style.width = "125px";
      for(i=0;i<$("#all_categories_cont div").length;i++)
        $("#all_categories_cont div")[i].style.width = `${(0.8*window.innerWidth * .881) -50}px`;
      }
      else if(($("main")[0].clientWidth !== window.innerWidth) && ($("#cart")[0].classList[0]==="cart_inv")){//This implies the cart is going to be invisible
        console.log("heaven");
        $("#all_categories_cont")[0].style.display ="grid";
        $("#tech_img")[0].setAttribute("src","tech_category_img.png");
        $("#tech_img").siblings()[0].style.width = "250px";
        $("#tech_img")[0].style.width = "";
    }
    else if(($("main")[0].clientWidth !== window.innerWidth)){//Implies the cart is visible 
      $("#all_categories_cont")[0].style.display ="block";
      for(i=0;i<$("#all_categories_cont div").length;i++)
        $("#all_categories_cont div")[i].style.width = `${(0.8*window.innerWidth * .881) -50}px`;
        $("#tech_img")[0].setAttribute("src","Tech_cat_for_phone.png");
        $("#tech_img")[0].style.width = "200px";
    }
  }
    else{
      $("#all_categories_cont")[0].style.display ="grid";
      $("#tech_img")[0].setAttribute("src","tech_category_img.png");
      $("#tech_img").siblings()[0].style.width = "250px";
      $("#tech_img")[0].style.width = "";
    }
  }
  else{
    $("main")[0].style.width = window.innerWidth;
    $("#all_categories_cont")[0].style.display ="block";
    $("#all_categories_cont")[0].style.width =0.8;
    $("#tech_img")[0].setAttribute("src","Tech_cat_for_phone.png");
    $("#all_categories_cont")[0].style.width = `${0.9 *window.innerWidth * .9}px`;
    for(i=0;i<$("#all_categories_cont div").length;i++)
      $("#all_categories_cont div")[i].style.width = `${$("#all_categories_cont")[0].clientWidth -50}px`;
    $("#The_features").parent()[0].style.overflowX ="scroll";
    $("main")[0].classList.remove("main_size_mod");

  }
  //Overlay:
  if($("#cart")[0].classList[0]=== "cart_vis" && window.innerWidth<=600){
    $("#overlay")[0].style.display ="block";
  }
  else{
    $("#overlay")[0].style.display ="none";
  }
}
window.addEventListener("resize",responsive);
responsive();