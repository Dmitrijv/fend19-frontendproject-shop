const inputElements = document.getElementsByClassName("checkout-form__input")
for (let i = 0; i < inputElements.length; i++) {
  inputElements[i].disabled = true
}

const checkoutBtn = document.querySelector(
  ".checkout-form--hidden__checkoutBtn__dim"
)

const deliverySection = document.querySelector(
  ".checkout-form__delivery-section"
)

const addDeliveryBtn = document.querySelector(".checkout-form__deliveryBtn")
const addEmailBtn = document.querySelector(".checkout-form__addBtn")
const email = document.getElementById("email")
const emailP = document.createElement("p")
const hiddenEmail = document.getElementById("email-hidden")

addDeliveryBtn.disabled = true
checkoutBtn.disabled = true

addEmailBtn.addEventListener("click", function () {
  if (addEmailBtn.textContent == "Lägg till emailadress") {
    email.parentNode.replaceChild(emailP, email)
    emailP.textContent = email.value
    for (let i = 0; i < inputElements.length; i++) {
      inputElements[i].disabled = false
    }
    addDeliveryBtn.disabled = false
    deliverySection.className = "checkout-form__delivery-section--click"
    addEmailBtn.textContent = "Ändra"
  } else {
    email.value = ""
    emailP.parentNode.replaceChild(email, emailP)

    for (let i = 0; i < inputElements.length; i++) {
      inputElements[i].disabled = true
    }
    addDeliveryBtn.disabled = true
    deliverySection.className = "checkout-form__delivery-section"
    addEmailBtn.textContent = "Lägg till emailadress"
    // to do put cursor back in inputfield
  }
  hiddenEmail.value = emailP.textContent
})

const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const tel = document.getElementById("tel")
const adress = document.getElementById("adress")
const pcode = document.getElementById("pcode")
const city = document.getElementById("city")

const fnameP = document.createElement("p")
const lnameP = document.createElement("p")
const telP = document.createElement("p")
const adressP = document.createElement("p")
const pcodeP = document.createElement("p")
const cityP = document.createElement("p")

const hiddenFname = document.getElementById("fname-hidden")
const hiddenLname = document.getElementById("lname-hidden")
const hiddenTel = document.getElementById("tel-hidden")
const hiddenAdress = document.getElementById("adress-hidden")
const hiddenPcode = document.getElementById("pcode-hidden")
const hiddenCity = document.getElementById("city-hidden")

addDeliveryBtn.addEventListener("click", function () {
  if (addDeliveryBtn.textContent == "Leverera till denna adress") {
    fname.parentNode.replaceChild(fnameP, fname)
    fnameP.textContent = fname.value
    lname.parentNode.replaceChild(lnameP, lname)
    lnameP.textContent = lname.value
    tel.parentNode.replaceChild(telP, tel)
    telP.textContent = tel.value
    adress.parentNode.replaceChild(adressP, adress)
    adressP.textContent = adress.value
    pcode.parentNode.replaceChild(pcodeP, pcode)
    pcodeP.textContent = pcode.value
    city.parentNode.replaceChild(cityP, city)
    cityP.textContent = city.value
    checkoutBtn.disabled = false
    addDeliveryBtn.textContent = "Ändra"
    checkoutBtn.className = "checkout-form--hidden__checkoutBtn"
  } else {
    fnameP.parentNode.replaceChild(fname, fnameP)
    lnameP.parentNode.replaceChild(lname, lnameP)
    telP.parentNode.replaceChild(tel, telP)
    adressP.parentNode.replaceChild(adress, adressP)
    pcodeP.parentNode.replaceChild(pcode, pcodeP)
    cityP.parentNode.replaceChild(city, cityP)
    checkoutBtn.disabled = true
    addDeliveryBtn.textContent = "Leverera till denna adress"
    checkoutBtn.className = "checkout-form--hidden__checkoutBtn__dim"
  }

  hiddenFname.value = fnameP.textContent
  hiddenLname.value = lnameP.textContent
  hiddenTel.value = telP.textContent
  hiddenAdress.value = adressP.textContent
  hiddenPcode.value = pcodeP.textContent
  hiddenCity.value = cityP.textContent
})

/* Validation */
