/* TODO */
/* Name pattern:  Anna-Lena  |  Af Trolle */
/* Tel: 08?? */
/* Address: Orvar odds väg 2 / Robert almströmsgatan 1 */
/* A-ZÅÖÄåöäéáó  a-zöäåéáó */
/* Name: 2-20 éáó(no longer require user's name must be capitalized, only no number; no space allowed for now)
  E-mail: name@gmail.com
  Telephone: Matches 	+46 8 123 456 78 | 08-123 456 78 | 0123-456 78 | +46789123456 | 0712345678 | 
  Address: no longer require ends with gatu/vägen... with 1~several number and/or several char, allows multiple words
  Postnumber: 123 45 | 12345 (both way works)
  Ort: must be captalized */

/* A typical address would look like this:
  Sven Nilsson (First, and last name)
  Roslagsgatan 10 (Street, and number)
  113 51  STOCKHOLM (Postcode, and geographic location) */

/* Generate order list */
const listArea = document.querySelector(
  ".checkout-form__cart-section__product-list"
)
const confirmBtn = document.querySelector(
  ".checkout-form__delivery-section__deliveryBtn"
)
const shoppingCart = JSON.parse(localStorage.getItem("products"))
let realTotalPrice = 0
let subTotal = 0
let itemsCountTotal = 0

/* from Martin */
let productList = document.querySelector(
  ".checkout-form__cart-section__product-list"
)
let totalSumCart = document.querySelector(
  ".checkout-form__cart-section__totalsum"
) //delivery fee check is in the bottom
let totalSumForm = document.querySelector(".checkout-form__price")
const keepShoppingBtn = document.querySelector(
  ".checkout-form__cart-section__keep-shopping-btn"
)
keepShoppingBtn.addEventListener("click", function () {
  location.href = "/fend19-frontendproject-shop/index.php"
})

/* object structure: id | name | img | price | qty */
/* Sorry about this part, so tired of correcting every ES5 pieces back to its old way. */
if (localStorage.hasOwnProperty("products")) {
  var length = shoppingCart.length
  for (var a = 0; a < length; a++) {
    var item = shoppingCart[a]
    var itemName = item.name
    var name = itemName.split("-").pop() //new
    var itemCount = item.qty * 1
    var itemPrice = item.price.slice(0, -3)
    var itemImage = item.img
    var itemTotalPrice = Math.round(1 * itemCount * (1 * itemPrice))
    subTotal += itemTotalPrice
    itemsCountTotal += itemCount

    productList.innerHTML += `
    <div class="checkout-form__cart-section__product-container">
      <div class="checkout-form__cart-section__img-container">
        <img class="checkout-form__cart-section__img-container--img" src="${itemImage}" alt="${itemName}">
      </div>
      <p class="item-name">"${name}"</p>
      <p class="checkout-form__cart-section__item-qty"></p>
      <p class="checkout-form__cart-section__item-price">${itemCount} st, ${itemPrice} kr</p>
    </div>`
  }

  if (itemsCountTotal === 1) {
    totalSumCart.innerHTML += "<p>"
      .concat(itemsCountTotal, ' st Artikel</p><p class="item-total" >Totalt: ')
      .concat(subTotal, " kr</p>")
  } else {
    totalSumCart.innerHTML += "<p>"
      .concat(
        itemsCountTotal,
        ' st Artiklar</p><p class="item-total" >Totalt: '
      )
      .concat(subTotal, " kr</p>")
  }
} else {
  confirmBtn.disabled = true
  productList.innerHTML +=
    '<h2 class="checkout-form__cart-section__product-container">Varukorgen \xE4r tom</h2>'
}

/* Validation related part, Strategy mode is implemented here. */
const _validator = (function () {
  return function (ruleList) {
    return {
      strategyFn: [],
      ruleList: ruleList,
      add: function (dom, rules) {
        let that = this
        for (let i = 0, len = rules.length; i < len; i++) {
          ;
          (function (i) {
            that.strategyFn.push(function () {
              let info = []
              let method = rules[i].strategy.split(":"),
                methodName = method[0],
                errMsg = rules[i].msg,
                val = dom.value
              info.push(val)
              if (method[1]) {
                info.push(method[1])
              }
              info.push(errMsg)
              return that.ruleList[methodName].apply(dom, info)
            })
          })(i)
        }
      },
      start: function () {
        for (i in this.strategyFn) {
          if (this.strategyFn.hasOwnProperty(i)) {
            let msg = this.strategyFn[i]()
            if (msg) {
              return msg
            }
          }
        }
      },
    }
  }
})()

/* rule-list */
const _rules = (function () {
  const rulelist = {
    isBlank: function (value, errorMsg) {
      if (value === "") {
        return errorMsg
      }
    },

    isName: function (value, errorMsg) {
      // uppercase/lowercase/multiple words
      if (!/^[a-zA-Z0-9-ÅÖÄåöäéáó\s]+(\.)?/.test(value)) {
        return errorMsg
      }
    },

    minLength: function (value, length, errorMsg) {
      if (value.length < length) {
        return errorMsg
      }
    },

    maxLength: function (value, length, errorMsg) {
      if (value.length > length) {
        return errorMsg
      }
    },

    isPhone: function (value, errorMsg) {
      const reg1 = /\+?(?:0{0,2}[46]*){1}7{1}[0-9]{8}/
      /* Matches 0798789678 */
      const reg2 = /^(([+]\d{2}[ ][1-9]\d{0,2}[ ])|([0]\d{1,3}[-]))((\d{2}([ ]\d{2}){2})|(\d{3}([ ]\d{3})*([ ]\d{2})+))$/
      /* Matches 	+46 8 123 456 78 | 08-123 456 78 | 0123-456 78 */
      if (!reg1.test(value) && !reg2.test(value)) {
        return errorMsg
      }
    },

    isEmail: function (value, errorMsg) {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          value
        )
      ) {
        return errorMsg
      }
    },

    isSpace: function (value, errorMsg) {
      if (
        [...value].every((item) => {
          return item === " "
        })
      ) {
        return errorMsg
      }
    },

    isAdress: function (value, errorMsg) {
      /* Pattern: uppercase/lowercase/multiple words allowed*/
      const reg1 = /^[a-zA-Z0-9-ÅÖÄåöäéáó\s]+(\.)?(\d{1,})(\.)?([a-zA-Z0-9-ÅÖÄåöäéáó\s]{0,})$/
      if (!reg1.test(value)) {
        return errorMsg
      }
    },

    isPcode: function (value, errorMsg) {
      /* very rough way, not accurate enough */
      if (!/^\d{3}\s*\d{2}$/.test(value)) {
        return errorMsg
      }
    },

    isCounty: function (value, errorMsg) {
      // first letter no longer required to be capitalized
      if (!/^([A-ZÅÖÄåöäéáó])[a-zöäåéáó]+/.test(value)) {
        return errorMsg
      }
    },
  }
  return {
    rulelist: rulelist,
  }
})()

/* Do validation */
const validator = _validator(_rules.rulelist)

const forms = document.querySelector(".checkout-form")

/* Add method */
validator.add(forms.email, [{
    strategy: "isBlank",
    msg: "Var god ange en email-address",
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten",
  },
  {
    strategy: "isEmail",
    msg: "Ange en giltig email-address",
  },
])

validator.add(forms.fname, [{
    strategy: "isBlank",
    msg: "Var god ange ett förnamn",
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten",
  },
  {
    strategy: "isName",
    msg: "Ange namn med stor bokstav, använd endast bokstäver",
  },
  {
    strategy: "minLength:2",
    msg: "Ange minst 2 bokstäver",
  },
  {
    strategy: "maxLength:20",
    msg: "Förnamn får ej vara längre än 20 tecken",
  },
])

validator.add(forms.lname, [{
    strategy: "isBlank",
    msg: "Ange efternamn",
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten",
  },
  {
    strategy: "isName",
    msg: "Ange namn med stor bokstav, använd endast bokstäver",
  },
  {
    strategy: "minLength:2",
    msg: "Ange minst 2 bokstäver",
  },
  {
    strategy: "maxLength:20",
    msg: "Förnamn får ej vara längre än 20 tecken",
  },
])

validator.add(forms.phone, [{
    strategy: "isBlank",
    msg: "Ange ett telefonnummer",
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten",
  },
  {
    strategy: "isPhone",
    msg: "Ange ett giltigt telefonnummer",
  },
])

validator.add(forms.adress, [{
    strategy: "isBlank",
    msg: "Ange en adress",
  },
  {
    strategy: "isAdress",
    msg: "felaktig adress, ange en giltig adress",
  },
  {
    strategy: "isSpace",
    msg: "Please input valid text",
  },
])

validator.add(forms.pcode, [{
    strategy: "isBlank",
    msg: "Ange ett postnummer",
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten",
  },
  {
    strategy: "isPcode",
    msg: "Ange ett giltigt postnummer",
  },
])

validator.add(forms.county, [{
    strategy: "isBlank",
    msg: "Ange stad",
  },
  {
    strategy: "isSpace",
    msg: "Var god fyll i uppgiftsfälten",
  },
  {
    strategy: "isCounty",
    msg: "Ange en giltig stad",
  },
])

// Call validation
// confirm pay btn should be disabled until finish validation and judge delivery fee.
/* TODO:
  Once clicked, lock input, prevent change content!
*/
confirmBtn.onclick = function (event) {
  // call errormsg
  const goToOrderBtn = document.querySelector(
    ".checkout-form__btn-section__checkoutBtn--dim"
  )
  const errMsg = validator.start(),
    errTips = document.querySelector(".err-tips")

  if (errMsg) {
    // console.log(errMsg);
    errTips.innerHTML = errMsg
  } else {
    errTips.innerHTML = ""
    goToOrderBtn.disabled = ""
    goToOrderBtn.style.backgroundcolor = "#218838"
    keepShoppingBtn.disabled = true //disable buyMoreBtn
    document
      .querySelector(".open-overlay")
      .removeEventListener("click", openCart) //disable cartBtn
    turnWhite() //remove input red border
  }

  /* To check delivery fee */
  const deliveryFeeTextArea = document.querySelector(".deliveryFeeText")
  const zipcode = document.querySelector("#pcode")
  let realTotalPriceArea = document.querySelector(".item-total")
  if (/^1\d{2}\s\d{2}$/.test(zipcode.value) || subTotal > 500) {
    // free delivery
    deliveryFeeTextArea.textContent = "0"
    deliveryFeeTextArea.classList.remove("hidden")
    realTotalPriceArea.innerHTML = `Totalt: ${subTotal} kr`
    realTotalPrice = subTotal
  } else {
    // add 50 kr
    deliveryFeeTextArea.classList.remove("hidden")
    realTotalPriceArea.innerHTML = `Totalt: ${subTotal + 50} kr`
    realTotalPrice = subTotal + 50
  }

  /* setItem in localStorage about customer info + delivery fee (if any) */
  let email = document.querySelector("#email").value
  const forename = capitalizeFirstLetter(document.querySelector("#fname").value)
  const aftername = capitalizeFirstLetter(
    document.querySelector("#lname").value
  )
  const name = forename + " " + aftername
  const phone = removeSpace(document.querySelector("#tel").value)
  const address = capitalizeFirstLetter(document.querySelector("#adress").value)
  const pcode = formatZipcode(document.querySelector("#pcode").value)
  const city = capitalizeFirstLetter(document.querySelector("#city").value)
  const fullAddress = address + ", " + pcode + ", " + city
  redrawCustomerInfoTable()

  const detail = {
    name: name,
    phone: phone,
    fullAddress: fullAddress,
    totalPrice: realTotalPrice,
  }
  /* customer number: Random or what..
    customer name: Forename + aftername
    phone number: phone
    address: Gatuadress + zipcode + Ort
    order number: Random
    date */
  // localStorage.setItem("customer", JSON.stringify(detail))

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function removeSpace(string) {
    return string.replace(/\s/g, "")
  }

  function formatZipcode(string) {
    return string
      .replace(/\s/g, "")
      .split(/(\d{3})/)
      .join(" ")
      .trim()
  }

  function redrawCustomerInfoTable() {
    // email = email;
    document.querySelector("#fname").value = forename
    document.querySelector("#lname").value = aftername
    document.querySelector("#tel").value = phone
    document.querySelector("#adress").value = address
    document.querySelector("#pcode").value = pcode
    document.querySelector("#city").value = city
  }

  //remove input border's color
  function turnWhite() {
    const inputs = document.querySelectorAll(
      ".checkout-form__delivery-section__input"
    )
    inputs.forEach((input) => {
      input.classList.add("toWhite");
      input.setAttribute("readonly", "readonly");//lock input area
    })
    confirmBtn.disabled = true;
  }
}

// add shopping cart data to form
const hiddenCartLabel = document.querySelector('input[name="shoppingCart"]')
hiddenCartLabel.value = localStorage.getItem("products")