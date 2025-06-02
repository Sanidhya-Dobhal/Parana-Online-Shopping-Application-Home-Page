function itemSearch() {
  let inputValue = $("#search-bar")[0].value;
  inputValue = inputValue.trim();
  inputValue = inputValue.toLowerCase();
  inputValue = inputValue[0].toUpperCase() + inputValue.substring(1);
  $("#search-result-div")[0]?.remove();
  $("#search-result-none-div")[0]?.remove();
  let noOfMatchedProducts = 0;
  let DOMmain = $("#main")[0];
  for (i in respObject) {
    if (respObject[i].name === inputValue) {
      //remove the function cardGenerator and proceed by making something like the divs in featured products section
      noOfMatchedProducts++;
      let searchResultDiv = document.createElement("div");
      searchResultDiv.setAttribute("id", "search-result-div");
      const resultCard = cardGenerator(i);
      //below code is resposible for making the card look like what it actually is.
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
    `<p style = "margin-left:24px;">Showing ${noOfMatchedProducts} results for "${inputValue}"</p>`
  );
  if ($("#search-result-div")[0])
    //implies some result is there as it is first removed and would only be added when some result is matched
    $("#search-result-div")[0].prepend(noOfProductsPara[0]);
  else {
    let searchResultNoneDiv = document.createElement("div");
    searchResultNoneDiv.setAttribute("id", "search-result-none-div");
    DOMmain.prepend(searchResultNoneDiv);
    const noProductsPara = $(
      `<p style ="margin-bottom: 24px;">No results for '${inputValue}'</p>`
    );
    const noResultsLottie = $(`
      <lottie-player src="NoResults.json" speed="1"
      style="width: 200px; height: 200px"
      autoplay></lottie-player
      <br>`);
    $("#search-result-none-div")[0].prepend(noProductsPara[0]);
    $("#search-result-none-div")[0].prepend(noResultsLottie[0]);
  }
}
$(".search-button").click(itemSearch);
$("#search-bar").keypress((e) => {
  if (e.key === "Enter") {
    itemSearch();
  }
});
