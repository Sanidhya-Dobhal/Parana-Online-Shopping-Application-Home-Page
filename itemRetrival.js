function itemSearch() {
  let inputValue = $("#search-bar")[0].value;
  inputValue = inputValue.trim();
  inputValue = inputValue.toLowerCase();
  inputValue = inputValue[0].toUpperCase() + inputValue.substring(1);
  $("#search-result-div")[0]?.remove();
  let noOfMatchedProducts = 0;
  let DOMmain = $("#main")[0];
  for (i in respObject) {
    if (respObject[i].name === inputValue) {
      //remove the function cardGenerator and proceed by making something like the divs in featured products section
      noOfMatchedProducts++;
      let searchResultDiv = document.createElement("div");
      searchResultDiv.setAttribute("id", "search-result-div");
      const resultCard = cardGenerator(i);
      resultCard.classList.add("card-in-search-result");
      resultCard
        .getElementsByClassName("item-buttons-in-product-list")[1]
        .remove();
      let goToItem = $("<button>Go to item</button>");
      goToItem.addClass("btn");
      goToItem.addClass("btn-primary");
      goToItem.addClass("item-buttons-in-product-list");
      goToItem.css("display", "block");
      goToItem.click(() => {
        $("#products-list-section")[0].scrollIntoView();
      });
      resultCard
        .getElementsByClassName("product-details-div")[0]
        .append(goToItem[0]);
      searchResultDiv.prepend(resultCard);
      DOMmain.prepend(searchResultDiv);
    }
  }
  let noOfProductsPara = $(
    `<p>Showing ${noOfMatchedProducts} results for "${inputValue}"</p>`
  );
  $("#search-result-div")[0]?.prepend(noOfProductsPara[0]);
}
$(".search-button").click(itemSearch);
$("#search-bar").keypress((e) => {
  if (e.key === "Enter") {
    itemSearch();
  }
});
