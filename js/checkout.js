/* TODO: 
  1. Change input bordercolor after validation is finised - test 1/ fail
  2. Remove postnumber's demand of space */

/* Name: 2-20 (no longer require user's name must be capitalized, only no number; no space allowed for now)
  E-mail: name@gmail.com
  Telephone: Matches 	+46 8 123 456 78 | 08-123 456 78 | 0123-456 78 | +46789123456 | 0712345678 | 
  Address: Swedish address, ends with gatu/vägen... with 1~several number and/or several char
  Postnumber: 123 45 | 12345 (both way works)
  Ort: must be captalized */

/* A typical address would look like this:
  Sven Nilsson (First, and last name)
  Roslagsgatan 10 (Street, and number)
  113 51  STOCKHOLM (Postcode, and geographic location) */

/* Generate order list */
const listArea = document.querySelector('.checkout-form__cart-section__product-list');
const confirmBtn = document.querySelector('.checkout-form__delivery-section__deliveryBtn');
const shoppingCart = JSON.parse(localStorage.getItem("products"));
let realTotalPrice = 0;
let subTotal = 0;
let itemsCountTotal = 0;

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
    var itemTotalPrice = Math.ceil(1 * itemCount * (1 * itemPrice))
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
          ;(function (i) {
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
      // Don't care if capitalized
      if (!/^([A-ZÅÖÄ]|[a-zåöä])*$/.test(value)) {
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
      /* Pattern: (just for test, meaningless): Öästervägen 10a | Öästervägen 10A | Öästergatan 10A */
      const reg1 = /^[A-ZÖÄÅ][a-zöäå]+(gatan|vägen)\s\d+([A-Z]|[a-z])?$/
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
      if (!/^[A-ZÖÄÅ][a-zöäå]+/.test(value)) {
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
validator.add(forms.email, [
  {
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

validator.add(forms.fname, [
  {
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

validator.add(forms.lname, [
  {
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

validator.add(forms.adress, [
  {
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

validator.add(forms.phone, [
  {
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

validator.add(forms.pcode, [
  {
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

validator.add(forms.county, [
  {
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
confirmBtn.onclick = function (event) {
  // call errormsg
  const goToOrderBtn = document.querySelector(
    ".checkout-form__delivery-section__checkoutBtn--dim"
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
  }

  /* To check delivery fee */
  const deliveryFeeTextArea = document.querySelector('.deliveryFeeText');
  const zipcode = document.querySelector('#pcode');
  let realTotalPriceArea = document.querySelector('.item-total');
  if (/^1\d{2}\s\d{2}$/.test(zipcode.value) || (subTotal > 500)) {
    // free delivery 
    deliveryFeeTextArea.classList.remove('hidden');
    deliveryFeeTextArea.textContent = '0';
    realTotalPriceArea.innerHTML = `Totalt: ${subTotal} kr`;
    realTotalPrice = subTotal;
  } else {
    // add 50 kr
    deliveryFeeTextArea.classList.remove('hidden');
    realTotalPriceArea.innerHTML = `Totalt: ${subTotal + 50} kr`;
    realTotalPrice = subTotal + 50;
  }

  //remove input border's color
  /* Failed again */
  // document.querySelector('input').style.borderColor = '#fff';

  /* setItem in localStorage about customer info + delivery fee (if any) */
  const forename = document.querySelector('#fname').value;
  const aftername = document.querySelector('#lname').value;
  const name = forename + " " + aftername;
  const phone = document.querySelector('#tel').value;
  const address = document.querySelector('#adress').value;
  const pcode = document.querySelector('#pcode').value;
  const city = document.querySelector('#city').value;
  const fullAddress = address + " " + pcode + " " + city;

  const detail = {
    name: name,
    phone: phone,
    fullAddress: fullAddress,
    totalPrice: realTotalPrice
  };
  /* customer number: Random or what..
    customer name: Forename + aftername
    phone number: phone
    address: Gatuadress + zipcode + Ort
    order number: Random
    date */
  localStorage.setItem("customer", JSON.stringify(detail))
}
