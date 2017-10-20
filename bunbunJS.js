  /*** Object Constructors ***/
  
  /* Bun object */
  function Bun(name, image, description, ingredients, sixImage, sixDescription, twelveImage, twelveDescription) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.ingredients = ingredients;
    this.sixImage = sixImage;
    this.sixDescription = sixDescription;
    this.twelveImage = twelveImage;
    this.twelveDescription = twelveDescription;
  }

  /* Product object */
  function Product(flavor1, flavor2, flavor3, cartImage, price, amount, sumPrice, quantity) {
    this.flavor1 = flavor1;
    this.flavor2 = flavor2;
    this.flavor3 = flavor3;
    this.cartImage = cartImage;
    this.price = price;
    this.amount = amount; 
    this.sumPrice = sumPrice;
    this.quantity = quantity;
  }


  /* Function that runs on load */
  $(document).ready(function(){

    /* Parse to see if any products have been stored as added to cart */
    var cartItems = JSON.parse(localStorage.getItem("itemsArray"));
    var oldItems = [];
    console.log (cartItems);
    var totalPrice = 0;

    /* Triggered if there are items that have been added to cart */
    if (cartItems == [] | null | undefined) {

    } else {

      /* Get the length of the object array of items added to cart */
      var numCartItems = Object.keys(cartItems).length;
      
      /* Go through every item in the array */
      for (i=0; i<numCartItems; i++) {

        /* Add product photo*/
        $(".cart-holder").append('<img id=cart-photo src="' + cartItems[i].cartImage + '" width="7%">')

        /* If users did not select a second and third option, convert that to nothing*/
        if (cartItems[i].flavor2 == " -- select an option -- ") {
          cartItems[i].flavor2 = "";
        } if (cartItems[i].flavor3 == " -- select an option -- ") {
          cartItems[i].flavor3 = "";
        } 

        /* Append additional product information into the cart */
        $(".cart-holder").append('<h5 id=flavors-text>' + cartItems[i].quantity + " with " + cartItems[i].flavor1 + " " + cartItems[i].flavor2 + " " + cartItems[i].flavor3 + " " + '</h5>');
        $(".cart-holder").append('<h5 id=quantity-text>' + cartItems[i].amount + '</h5>');
        $(".cart-holder").append('<h5 id=price-text> $' + cartItems[i].sumPrice + '</h5>');
        /* Assign an id to the remove button, corresponding to the position in the array */
        $(".cart-holder").append('<button class=remove-item id=' + [i] +'> Remove </button>' + "<br><br><br><br>");

        /* Counter for shopping cart item */
        $("#cart-icon").text(numCartItems);
      }   

      /* For every cart item, add prices together for total price */
      for (i=0; i<numCartItems; i++) {
        totalPrice += parseFloat(cartItems[i].sumPrice);
      }   
      $("#total-price").text("$" + totalPrice);
    }

  /* Triggered when someone clicks the remove item button */
  $(".remove-item").click(function() { // bind handler for click event

    /* Get the item ID for the button, which is tied to it's position in the array */
    var itemID = $(this).attr('id')
    /* Remove this item from the added to cart array */
    cartItems.splice(itemID, 1);
    /* Save new array back to local Storage */
    localStorage.setItem("itemsArray", JSON.stringify(cartItems));

    /* Remove relevant elements and reload the page */
    $(this).prev().remove();
    $(this).prev().remove();
    $(this).prev().remove();
    $(this).prev().remove();
    $(this).remove();
    location.reload();
  });

  
  /* Parse the locally stored object that the user indicated interested in from the menu */
  var chosenBun = JSON.parse(localStorage.getItem("interestedItem"));
  var hasChosenBun = false;
  
  /* Only run this if there is an interested item */
  if (chosenBun == null) {
  } else {
    /* Replace the relevant text and images with bun-specific information */
    $("#bun-name").text(chosenBun.name);
    console.log(chosenBun);
    $("#bun-product-image").attr("src", chosenBun.image);
    $("#bun-description").text(chosenBun.description);
    $("#bun-ingredients").text(chosenBun.ingredients);
  }

  /* When a new radio button input is selected, run this function */
  $("input[name='options']").change(function(){
    if (this.value == '3.99') {
      /* If the value is 3.99, change text and image to the relevant info and continue to hide flavor dropdowns */
      $("#bun-product-image").attr("src", chosenBun.image);
      $("#bun-description").text(chosenBun.description);
      $("#dropdown1").hide();
      $("#dropdown2").hide();
      $("#quantity-selector").show();
    } else if (this.value == '19.99') {
      /* If the value is 19.99, change text and image to the relevant info and show flavor dropdowns */
      $("#bun-product-image").attr("src", chosenBun.sixImage);
      $("#bun-description").text(chosenBun.sixDescription);
      $("#dropdown1").show();
      $("#dropdown2").show();
      $("#quantity-selector").show();
    } else if (this.value == '29.99') {
      /* If the value is 29.99, change text and image to the relevant info and show flavor dropdowns */
      $("#bun-product-image").attr("src", chosenBun.twelveImage);
      $("#bun-description").text(chosenBun.twelveescription);
      $("#dropdown1").show();
      $("#dropdown2").show();
      $("#quantity-selector").show();

    }
  });

      /* When a user clicks on a menu image or text, create a new bun and save to local storage */

   $(".original-click").click(function() { // bind handler for click event
     var originalBun = new Bun("Original", "images/OriginalBun.png", "Our most famous cinnamon roll! Based on my mother’s original recipe, this is the ultimate crowd-pleaser, sweet, gooey and rich.", "Milk, eggs, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt.", "images/SixOriginalBun.png", "Six of our famous original buns. Hot and fresh from the oven and delivered to your doorstep!", "images/TwelveOriginalBun.png", "What's better than six cinnamon buns? Double that! Twelve cinnamon buns perfect for a party or gathering.");
     localStorage.setItem("interestedItem", JSON.stringify(originalBun));
   });

   $(".cranberry-click").click(function() { // bind handler for click event
     var cranberryBun = new Bun("Cranberry", "images/CranberryBun.png", "Cranberry is one of our most popular flavors - perfect for a cold fall day with a cup of coffee.", "Milk, eggs, sugar, baking powder, flour, yeast, butter, salt, dried cranberries");
     localStorage.setItem("interestedItem", JSON.stringify(cranberryBun));
   });

   $(".bacon-click").click(function() { // bind handler for click event
     var baconBun = new Bun("Bacon", "images/BaconBun.png", "Who doesn't like Bacon? This is the perfect bun to get your morning started off right.", "Milk, eggs, sugar, baking powder, flour, yeast, butter, salt, bacon, heavy cream");
     localStorage.setItem("interestedItem", JSON.stringify(baconBun));
   });

  $(".walnut-click").click(function() { // bind handler for click event
   var walnutBun = new Bun("Walnut", "images/WalnutBun.png", "Walnuts are one of our favorite toppings. We include a special toffee glaze with this bun to give it an extra touch of indulgence.", "Milk, eggs, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, figs, walnuts.");
   localStorage.setItem("interestedItem", JSON.stringify(walnutBun));
  });

  $(".original-gf-click").click(function() { // bind handler for click event
   var originalGFBun = new Bun("Original (Gluten Free)", "images/OriginalBun.png", "Our most famous cinnamon roll, done gluten free! Based on my mother’s original recipe, this is the ultimate crowd-pleaser, sweet, gooey and rich.", "Milk, eggs, sugar, baking powder, gluten-free flour, yeast, butter, cinammon, maple syrup, coffee, salt, figs, walnuts.");
   localStorage.setItem("interestedItem", JSON.stringify(originalGFBun));
  });

  $(".pumpkin-spice-click").click(function() { // bind handler for click event
   var pumpkinSpiceBun = new Bun("Pumpkin Spice", "images/PumpkinSpiceBun.png", "Sugar and spice and some pumpkin throw in twice. The perfect bun to split before old Hallows Eve", "Milk, eggs, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, pumpkin.");
   localStorage.setItem("interestedItem", JSON.stringify(pumpkinSpiceBun));
  });

  $(".rhubarb-click").click(function() { // bind handler for click event
   var rhubarbBun = new Bun("Strawberry Rhubarb", "images/StrawberryRhubarbBun.png", "Strawberry and Rhubarb are a classic combination that can't be beat. Inspired by our partnership with local Pennsylvanian farms.", "Milk, eggs, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, strawberries, rhubarb.");
   localStorage.setItem("interestedItem", JSON.stringify(rhubarbBun));
  });

  $(".caramel-click").click(function() { // bind handler for click event
   var caramelBun = new Bun("Caramel Pecan", "images/CaramelPecanBun.png", "Strawberry and Rhubarb are a classic combination that can't be beat. Inspired by our partnership with local Pennsylvanian farms.", "Milk, eggs, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, pecans, vanilla.");
   localStorage.setItem("interestedItem", JSON.stringify(caramelBun));
  });

  $(".original-v-click").click(function() { // bind handler for click event
   var originalVBun = new Bun("Original (Vegan)", "images/OriginalBun.png", "Our most famous cinnamon roll, done vegan! Based on my mother’s original recipe, this is the ultimate crowd-pleaser, sweet, gooey and rich.", "Soy milk, sugar, baking powder, flour, yeast, applesauce, cinammon, maple syrup, coffee, salt, pecans, vanilla.");
   localStorage.setItem("interestedItem", JSON.stringify(originalVBun));
  });

  $(".carrot-cake-click").click(function() { // bind handler for click event
  var carrotCakeBun = new Bun("Carrot Cake", "images/CarrotCakeBun.png", "Carrot cake is one of our newest flavors. Perfect with a cup of coffee after lunch, with a lighter than air cream cheese frosting.", "Milk, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, pecans, carrots, cream cheese.");
  localStorage.setItem("interestedItem", JSON.stringify(carrotCakeBun));
  });

  $(".lemon-click").click(function() { // bind handler for click event
   var lemonBun = new Bun("Lemon Lavender", "images/LemonLavenderBun.png", "Lemon and lavender is a perfect combination, especially for those with a nose for delicious smells! Our lavender is picked from our own backyard.", "Milk, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, pecans, lemon, lavender.");
   localStorage.setItem("interestedItem", JSON.stringify(lemonBun));
  });

  $(".blackberry-click").click(function() { // bind handler for click event
   var blackberryBun = new Bun("Blackberry", "images/BlackberryBun.png", "Blackberries galore! These buns have a juicy bite to them and pair perfectly with a side of vanilla ic cream", "Milk, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, pecans, blackberries.");
   localStorage.setItem("interestedItem", JSON.stringify(blackberryBun));
  });

  $(".old-fashioned-click").click(function() { // bind handler for click event
   var oldFashionedBun = new Bun("Old Fashioned Buttermilk", "images/OldFasionedBun.png", "Some call us old-fashioned, and this bun is made the old-fashioned way! Taken from an Amish recipe found on an old Pennsylvanian farm.", "Milk, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, buttermilk.");
   localStorage.setItem("interestedItem", JSON.stringify(oldFashionedBun));
  });

  $(".maple-apple-click").click(function() { // bind handler for click event
   var mapleAppleBun = new Bun("Maple Apple Pecan", "images/MapleApplePecanBun.png", "Maple apple pecan delight! This is the combination of all our favorite fall flavors, made with local Pennsylvanian apples from local orchards.", "Milk, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, pecans, apples.");
   localStorage.setItem("interestedItem", JSON.stringify(mapleAppleBun));
  });

  $(".bday-cake-click").click(function() { // bind handler for click event
   var birthdayCakeBun = new Bun("Birthday Cake", "images/BirthdayCAkeBun.png", "Happy birthday to you! The perfect treat for your special day. We'll even include a special birthday candle with your order!", "Milk, sugar, baking powder, flour, yeast, butter, cinammon, maple syrup, coffee, salt, buttercream, sprinkles, vanilla.");
   localStorage.setItem("interestedItem", JSON.stringify(birthdayCakeBun));
  });

  /* Default state should be to hide all dropdowns to preserve order flow */
  $("#dropdown1").hide();
  $("#dropdown2").hide();
  $("#quantity-selector").hide();


  /* Function triggered when you add something to cart via add to cart button */
  $("#cart-button").click(function() { // bind handler for click event
       var dropdown1Selection = $("#dropdown1 option:selected").text();
       var dropdown2Selection = $("#dropdown2 option:selected").text();
       var radioInput = $('input[type=radio][name=options]:checked').val();
       var chosenQuantity = String($('input[type=radio][name=options]:checked').attr('id'));
       var chosenAmount = parseFloat($("#quantity-selector option:selected").val());
       var chosenPrice = parseFloat(radioInput);
       var chosenSumPrice = chosenPrice * chosenAmount;

      /* Create a new product with the information obtained above */
       var chosenCartItem = new Product(chosenBun.name, dropdown1Selection, dropdown2Selection, chosenBun.image, chosenPrice, chosenAmount, chosenSumPrice, chosenQuantity);
       var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
       
       /* Add the new information to the array */
       oldItems.push(chosenCartItem);
       localStorage.setItem("itemsArray", JSON.stringify(oldItems));
     });

});

