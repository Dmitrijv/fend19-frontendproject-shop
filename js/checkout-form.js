let elements = document.getElementsByClassName("checkout-form__input")
for (let i = 0; i < elements.length; i++) {
  elements[i].disabled = true
}

const deliverySection = document.querySelector(
  ".checkout-form__delivery-section"
)
const addEmailBtn = document.querySelector(".checkout-form__btn")
const email = document.getElementById("email")
const emailP = document.createElement("p")
const hiddenEmail = document.getElementById("email-hidden")

addEmailBtn.addEventListener("click", (e) => {
  if (addEmailBtn.textContent == "Lägg till emailadress") {
    email.parentNode.replaceChild(emailP, email)
    emailP.textContent = email.value
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = false
    }

    deliverySection.className = "checkout-form__delivery-section--click"
    addEmailBtn.textContent = "Ändra"
  } else {
    email.value = ""
    emailP.parentNode.replaceChild(email, emailP)
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = true
    }
    deliverySection.className = "checkout-form__delivery-section"
    addEmailBtn.textContent = "Lägg till emailadress"
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

const addDeliveryBtn = document.querySelector(".checkout-form__btn2")

addDeliveryBtn.addEventListener("click", (e) => {
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

    addDeliveryBtn.textContent = "Ändra"
  } else {
    fnameP.parentNode.replaceChild(fname, fnameP)
    lnameP.parentNode.replaceChild(lname, lnameP)
    telP.parentNode.replaceChild(tel, telP)
    adressP.parentNode.replaceChild(adress, adressP)
    pcodeP.parentNode.replaceChild(pcode, pcodeP)
    cityP.parentNode.replaceChild(city, cityP)

    addDeliveryBtn.textContent = "Leverera till denna adress"
  }

  hiddenFname.value = fname.textContent
  hiddenLname.value = lname.textContent
  hiddenTel.value = tel.textContent
  hiddenAdress.value = adress.textContent
  hiddenPcode.value = pcode.textContent
  hiddenCity.value = city.textContent
})
