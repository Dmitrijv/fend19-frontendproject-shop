function validateSearchForm() {
  let input = document.forms["searchform"]["searchinput"].value

  if (input.length < 2) {
    alert("Minimum 2 letters required to do a search")
    document.forms["searchform"]["searchinput"].value = null
    return false
  }
}
