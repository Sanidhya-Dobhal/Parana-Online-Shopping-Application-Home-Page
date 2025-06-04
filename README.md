<h1> 🛒  Parana: An Online shopping website UI
<br> 
<img src = "./Images/Logos/jQuery.png" style = "height:25px; margin-top:20px"/></h1>

## 🖼️ Layout Overview

1. **Header**

- Responsive navigation bar with links: Home | Products | Categories | Contact
- Search input + Go button to filter products by name

2. **Main Content**

- **Featured Products**: Three handpicked items (image, name, price, “Go to item” button)
- **Categories**: Grid of five categories: Electronics| Fashion| Kitchen| Home| Sports

- **Product Listings:** A dynamic product listing section where products are loaded asynchronously using **jQuery's AJAX** from a JSON file. Each product card include:
  - Product image
  - Product name
  - Price
  - "Add to Cart" button

3. **Shopping Cart**: A side panel that displays the items in the user's shopping cart. The cart shows

   - Product names
   - Quantities
   - Total price

4. **Footer**: Contact information and links
5. **Product details page**: A separate page displays a detailed description when more details button for a product is clicked.

## Features

1. **Element width aware resposiveness**:

- Beyond simple CSS media queries: the main content area resizes based on whether the cart sidebar is visible
- Also ensures layout never overflow viewport

2. **Persistent Cart Storage**:

- Items added to the cart are stored in `localStorage` to persist across multiple sessions

3. **Searching**:

- Users search for an item in the header search bar → click **Go**
- If product match (case-insensitive) matching product card appear
- If no products match, a “No results” lottie + text is displayed

4. **Interactive and Intuitive UI with Thoughtful Details**:

- Smooth hover effects on header navigation elements enhance user experience

- Context-aware product cards: display an “Add to Cart” button for new items, switch to a number input for items already in the cart, and revert back to the button if the quantity reaches 0.

- This level of detail has been maintained throughout the application.

## Live Demo 

https://sanidhya-dobhal.github.io/Parana-Online-Shopping-Application-Home-Page/

## Screenshots

### 💻 Desktop View

1. **On Load (Desktop)**
   ![On Load Dekstop](./Images/ScreenShots%20for%20Readme/OnLoad%20Dekstop.png)

2. **Single Search Result (Desktop)**
   ![1 result found](./Images//ScreenShots%20for%20Readme/Top%20of%20web%20page%20with%201%20result%20in%20dekstop.png)

3. **Product added to cart and product section showing different states of individual product item**
   ![product section image](./Images/ScreenShots%20for%20Readme/Products%20section%20with%20products%20addded%20to%20cart.png)

4. **Individual product item page**
   ![Individual product page](./Images/ScreenShots%20for%20Readme/Individual%20product%20page.png)

---

### 📱 Mobile View

<img src ="Images/ScreenShots for Readme/OnLoad mobile.jpeg" style = "height: 450px"> &nbsp; <img src = "Images/ScreenShots for Readme/Top of webapp with no results in phone.jpeg" style = "height: 450px">
<img src ="Images/ScreenShots for Readme/products added in cart in phone.jpeg" style = "height: 450px">
<img src ="Images/ScreenShots for Readme/individual items page mobile.jpeg" style = "height: 450px">

## Tech Stack

- This project uses
  <img src = https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg style = "height:20px;"></img> Bootstrap,
  <img src = "./Images/Logos/jQuery.png" style = "height:20px; "/>and AJAX in javaScript</p>
- **LocalStorage** for persisting cart data
- **JSON** file as a mock database (`products.json`)
- HTML, CSS and javaScript at the core

## Contact

If you catch any bug please raise it as a new issue in the [issues' tab](https://github.com/Sanidhya-Dobhal/Parana-Online-Shopping-Application-Home-Page/issues)

or you can email me at sanidhya.dobhal@gmail.com
.

---
