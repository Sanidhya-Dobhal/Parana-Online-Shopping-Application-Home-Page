console.log(location.search);
let xhr = new XMLHttpRequest();
xhr.open("GET", "../List.json", true);
xhr.onload = function () {
  const list = JSON.parse(xhr.responseText);
  const currElement =
    list[location.search.substring(1, location.search.length)];
  $("#product-image")[0].setAttribute("src", `../${currElement.img}`);
  $("#product-name")[0].innerText = currElement.descriptiveName;
  $("#product-description")[0].innerText = currElement.description;
};
$("#back-button").click(navigateToHomePage);
xhr.send();
function navigateToHomePage() {
  location.href = "../";
}
