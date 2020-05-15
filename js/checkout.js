/* What have been done */
/* Email length restrain?? 64 + 255 (https://blog.moonmail.io/what-is-the-maximum-length-of-a-valid-email-address-f712c6c4bc93) */
/* use modifier i to reduce regex pattern */
/* Tel: 08?? not now*/
/* Name pattern:  Anna-Lena  |  Af Trolle */
/* Address: Orvar odds väg 2 / Robert almströmsgatan 1 */
/* a-z-åöäéáóíøæèüêû */

/* Name: 2-20 (no longer require user's name must be capitalized, no number allowed)
  E-mail: name@gmail.com
  Telephone: Matches 	+46 8 123 456 78 | 08-123 456 78 | 0123-456 78 | +46789123456 | 0712345678 | 
            "+46 7 +467 07 Followed by 0/2/3/6/9, (a possible space), 4 digits, (a possible space), 3 digits" some pattern for mobile number
  Address: no longer require ends with gatu/vägen... with 1~several number and/or several char, allows multiple words
  Postnumber: 123 45 | 12345 (both way works)
  Ort: uppercase/lowercase */
const confirmBtn = document.querySelector(".checkout-form__delivery-section__deliveryBtn");
const keepShoppingBtn = document.querySelector(".checkout-form__cart-section__keep-shopping-btn");
// let subTotal = 0;

shopLib.drawOrderList();

/* Validation related part, Strategy pattern is implemented here. */
const _validator = (function () {
  return function (ruleList) {
    return {
      strategyFn: [],
      ruleList: ruleList,
      add: function (dom, rules) {
        let that = this;
        for (let i = 0, len = rules.length; i < len; i++) {
          (function (i) {
            that.strategyFn.push(function () {
              let info = [];
              let method = rules[i].strategy.split(":"),
                methodName = method[0],
                errMsg = rules[i].msg,
                val = dom.value;
              info.push(val);
              if (method[1]) {
                info.push(method[1]);
              }
              info.push(errMsg);
              return that.ruleList[methodName].apply(dom, info);
            });
          })(i);
        }
      },
      start: function () {
        for (i in this.strategyFn) {
          if (this.strategyFn.hasOwnProperty(i)) {
            let msg = this.strategyFn[i]();
            if (msg) {
              return msg;
            }
          }
        }
      }
    };
  };
})();

/* rule-list */
const _rules = (function () {
  const rulelist = {
    isBlank: function (value, errorMsg) {
      if (value === "") {
        return errorMsg;
      }
    },

    isName: function (value, errorMsg) {
      // uppercase/lowercase/multiple words
      if (
        !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
          value
        )
      ) {
        return errorMsg;
      }
    },

    minLength: function (value, length, errorMsg) {
      if (value.length < length) {
        return errorMsg;
      }
    },

    maxLength: function (value, length, errorMsg) {
      if (value.length > length) {
        return errorMsg;
      }
    },

    isPhone: function (value, errorMsg) {
      const reg1 = /\+?(?:0{0,2}[46]*){1}7{1}[0-9]{8}$/;
      /* Matches 0798789678 */
      const reg2 = /^(([+]\d{2}[ ][1-9]\d{0,2}[ ])|([0]\d{1,3}[-]))((\d{2}([ ]\d{2}){2})|(\d{3}([ ]\d{3})*([ ]\d{2})+))$/;
      /* Matches 	+46 8 123 456 78 | 08-123 456 78 | 0123-456 78 */
      if (!reg1.test(value) && !reg2.test(value)) {
        return errorMsg;
      }
    },

    isEmail: function (value, errorMsg) {
      const regNew = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*\@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)?(\.[A-Za-z]{2,})$/;
      if (!regNew.test(value)) {
        return errorMsg;
      }
    },

    isSpace: function (value, errorMsg) {
      if (
        [...value].every(item => {
          return item === " ";
        })
      ) {
        return errorMsg;
      }
    },

    isAdress: function (value, errorMsg) {
      /* Pattern: uppercase/lowercase/multiple words allowed*/
      const reg1 = /^[a-z0-9-åöäéáóíøæèüêû\s]+(\.|\,)?(.*\d{1,})(\.)?([a-z0-9-åöäéáóíøæèüêû\s]{0,})$/i;
      if (!reg1.test(value)) {
        return errorMsg;
      }
    },

    isPcode: function (value, errorMsg) {
      /* very rough way, not accurate enough */
      if (!/^\d{3}\s*\d{2}$/.test(value)) {
        return errorMsg;
      }
    },

    isCounty: function (value, errorMsg) {
      // first letter no longer required to be capitalized
      // allow space between words (https://sv.wikipedia.org/wiki/Lista_%C3%B6ver_st%C3%A4der_i_Sverige) Gamla Lödöse | Karl Johans stad
      if (!/^[a-zåöäéáóíøæèüêû\s]+$/i.test(value)) {
        return errorMsg;
      }
    }
  };
  return {
    rulelist: rulelist
  };
})();

/* Do validation */
const validator = _validator(_rules.rulelist);

const forms = document.querySelector(".checkout-form");

/* Add method */
validator.add(forms.email, [{
    strategy: "isBlank",
    msg: "Var god ange en email-address"
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten"
  },
  {
    strategy: "isEmail",
    msg: "Ange en giltig email-address"
  },
  {
    strategy: "maxLength:254",
    msg: "E-post får ej vara längre än 254 tecken"
  }
]);

validator.add(forms.fname, [{
    strategy: "isBlank",
    msg: "Var god ange ett förnamn"
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten"
  },
  {
    strategy: "isName",
    msg: "Ange namn med bokstav, använd endast bokstäver"
  },
  {
    strategy: "minLength:2",
    msg: "Ange minst 2 bokstäver"
  },
  {
    strategy: "maxLength:20",
    msg: "Förnamn får ej vara längre än 20 tecken"
  }
]);

validator.add(forms.lname, [{
    strategy: "isBlank",
    msg: "Ange efternamn"
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten"
  },
  {
    strategy: "isName",
    msg: "Ange namn med bokstav, använd endast bokstäver"
  },
  {
    strategy: "minLength:2",
    msg: "Ange minst 2 bokstäver"
  },
  {
    strategy: "maxLength:20",
    msg: "Förnamn får ej vara längre än 20 tecken"
  }
]);

validator.add(forms.phone, [{
    strategy: "isBlank",
    msg: "Ange ett telefonnummer"
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten"
  },
  {
    strategy: "isPhone",
    msg: "Ange ett giltigt telefonnummer"
  },
  {
    strategy: "maxLength:12",
    msg: "Telefonnummret får inte innehålla mer än 12 tecken"
  }
]);

validator.add(forms.adress, [{
    strategy: "isBlank",
    msg: "Ange en adress"
  },
  {
    strategy: "isAdress",
    msg: "Ange en giltig adress"
  },
  {
    strategy: "isSpace",
    msg: "Ange en giltig adress"
  },
  {
    strategy: "maxLength:50",
    msg: "Adressen får inte innehålla mer än 50 tecken"
  }
]);

validator.add(forms.pcode, [{
    strategy: "isBlank",
    msg: "Ange ett postnummer"
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten"
  },
  {
    strategy: "isPcode",
    msg: "Ange ett giltigt postnummer"
  }
]);

validator.add(forms.county, [{
    strategy: "isBlank",
    msg: "Ange stad"
  },
  {
    strategy: "isSpace",
    msg: "Ortfältet är tom"
  },
  {
    strategy: "minLength:2",
    msg: "Ort namnet måste innehålla minst 2 tecken"
  },
  {
    strategy: "maxLength:50",
    msg: "Ort namnet får ej vara längre än 50 tecken"
  },
  {
    strategy: "isCounty",
    msg: "Ange en giltig ort"
  }
]);

// Call validation
// confirm pay btn should be disabled until finish validation and check delivery fee.
const editInfoBtn = document.querySelector(".changeInput");
let inputs = document.querySelectorAll(".checkout-form__delivery-section__input");
const goToOrderBtn = document.querySelector(".checkout-form__btn-section__checkoutBtn--dim");

editInfoBtn.addEventListener("click", editInputArea);

function editInputArea() {
  goToOrderBtn.disabled = "disabled";
  confirmBtn.disabled = "";
  inputs.forEach(input => {
    input.removeAttribute("readonly");
    input.classList.toggle("toWhite");
  });
}

// console.log(getTotalAmount());
// if (getTotalAmount() >= 500) {
//   document.querySelector('.deliveryFeeRow').innerHTML = `Frakt: 0 kr <span class="deliveryFeeText hidden">50 kr</span> `
// } 

confirmBtn.onclick = function (event) {
  // call errormsg
  const errMsg = validator.start(),
    errTips = document.querySelector(".err-tips");

  if (errMsg) {
    errTips.innerHTML = errMsg;
    return;
  }

  if (isThereDeletedProduct() && JSON.parse(localStorage.getItem("products")).length === 1) {
    goToOrderBtn.disabled = true;
    turnWhite();
    localStorage.removeItem("products");
    shopLib.drawOrderList();
    getCartAmount();
    clearCart();
    refreshCartList();

    return;
  }

  function getCartAmount() {
    let amount = 0;
    if (!localStorage.hasOwnProperty("products")) {
      document.querySelector(".item-in-cart-amount").textContent = 0;
      return;
    }
    const productsInCart = JSON.parse(localStorage.getItem("products"));
    productsInCart.map(item => {
      amount += item.qty;
    });
    document.querySelector(".item-in-cart-amount").textContent = amount;
    return amount;
  }

  if (isThereDeletedProduct() && shopLib.getShoppingCart().length > 1) {
    const list = document.querySelector(".checkout-form__cart-section__product-list");
    const allProducts = list.childNodes;
    for (let i = 0; i < allProducts.length; i++) {
      if (/"Borttagen produkt."/.test(allProducts[i].innerHTML)) {
        // alert('Produkt som inte är längre tillgängliga ska tas bort');
        turnWhite();
        allProducts[i].classList.add("highlight");
        allProducts[i].addEventListener("click", e => {
          console.log(e.currentTarget);
          let localStorageIds = shopLib.getShoppingCart().map(item => item.id);
          let deleteIndex = localStorageIds.indexOf(e.currentTarget.dataset.id);
          e.currentTarget.remove();
          updateLocalStorage(deleteIndex);
          hideImageAndReduceAmount();
          document.querySelector(".open-overlay").removeEventListener("click", openCart); //disable cartBtn
          goToOrderBtn.disabled = "";
        });
      }
    }

    function hideImageAndReduceAmount() {
      let productAmountInCart = document.querySelector(".item-in-cart-amount");
      let beginNumber = productAmountInCart.textContent;
      productAmountInCart.textContent = beginNumber - 1;
    }
    return;
  }

  errTips.innerHTML = "";
  goToOrderBtn.disabled = "";
  goToOrderBtn.style.backgroundcolor = "#218838";
  keepShoppingBtn.disabled = true; //disable buyMoreBtn
  document.querySelector(".open-overlay").removeEventListener("click", openCart); //disable cartBtn
  checkDeliveryFee();
  turnWhite(); //remove input red border
  editInfoBtn.disabled = "";

  /* setItem in localStorage about customer info + delivery fee (if any) */
  let email = document.querySelector("#email").value;
  const forename = formatName(document.querySelector("#fname").value);
  const aftername = formatName(document.querySelector("#lname").value);
  const name = forename + " " + aftername;
  const phone = removeSpace(document.querySelector("#tel").value);
  const address = formatName(document.querySelector("#adress").value);
  const pcode = formatZipcode(document.querySelector("#pcode").value);
  const city = formatName(document.querySelector("#city").value);

  redrawCustomerInfoTable();

  function formatName(nameAreaValue) {
    return nameAreaValue
      .split(" ")
      .filter(name => {
        if (name != "") return name;
      })
      .map(name => capitalizeFirstLetter(name))
      .join(" ");
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function removeSpace(string) {
    return string.replace(/\s/g, "");
  }

  function formatZipcode(string) {
    return string
      .replace(/\s/g, "")
      .split(/(\d{3})/)
      .join(" ")
      .trim();
  }

  function redrawCustomerInfoTable() {
    // email = email;
    document.querySelector("#fname").value = forename;
    document.querySelector("#lname").value = aftername;
    document.querySelector("#tel").value = phone;
    document.querySelector("#adress").value = address;
    document.querySelector("#pcode").value = pcode;
    document.querySelector("#city").value = city;
  }

  //remove input border's color
  function turnWhite() {
    inputs.forEach(input => {
      input.classList.add("toWhite");
      input.setAttribute("readonly", "readonly"); //lock input area
    });
    confirmBtn.disabled = true;
  }

  /* To check delivery fee */
  function checkDeliveryFee() {
    const deliveryFeeTextArea = document.querySelector(".deliveryFeeText");
    const zipcode = document.querySelector("#pcode");
    const county = document.querySelector("#city").value.toLowerCase();
    let realTotalPriceArea = document.querySelector(".item-total");
    let subTotal = getTotalAmount();
    console.log(subTotal)
    /* Now double check if zipcode & county spelling belong to Stockholm region */
    if (subTotal >= 500 || /^1\d{2}.?\d{2}$/.test(zipcode.value)) {
      // free delivery
      console.log('free delivery');
      deliveryFeeTextArea.textContent = "0";
      deliveryFeeTextArea.classList.remove("hidden");
      realTotalPriceArea.innerHTML = `Totalt: ${subTotal} kr`;
      realTotalPrice = subTotal;
    } else {
      // add 50 kr
      if (deliveryFeeTextArea.classList.contains("hidden")) {
        console.log('pay 50 condition 1');
        deliveryFeeTextArea.classList.remove("hidden");
        realTotalPriceArea.innerHTML = `Totalt: ${subTotal + 50} kr`;
        realTotalPrice = subTotal + 50;
        return;
      } else {
        console.log('pay 50 condition 2');
        deliveryFeeTextArea.textContent = "50";
        realTotalPriceArea.innerHTML = `Totalt: ${subTotal + 50} kr`;
        realTotalPrice = subTotal + 50;
        return;
      }
    }
  }

  function isThereDeletedProduct() {
    const productListArea = document.querySelector(".checkout-form__cart-section__product-list");
    return /"Borttagen produkt."/.test(productListArea.innerHTML);
  }

  function updateLocalStorage(position) {
    let originLocalStorageValue = shopLib.getShoppingCart();
    originLocalStorageValue.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(originLocalStorageValue));
  }

};

// add shopping cart data to form
const hiddenCartLabel = document.querySelector('input[name="shoppingCart"]');
hiddenCartLabel.value = localStorage.getItem("products");

function getTotalAmount() {
  return shopLib.getShoppingCart().reduce((total, item) => total + (Number(item.price.replace(/ kr/, "")) * Number(item.qty)), 0)
}