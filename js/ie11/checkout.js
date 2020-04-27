/* name: 2-20
   E-mail:
   Telephone: Swedish ? 
   Address: Gatu/Vägen... Postnumber / Ort */

/* A typical address would look like this:
Sven Nilsson (First, and last name)
Roslagsgatan 10 (Street, and number)
113 51  STOCKHOLM (Postcode, and geographic location) */

var _validator = (function () {
  return function (ruleList) {
    return {
      strategyFn: [],
      ruleList: ruleList,
      add: function (dom, rules) {
        var that = this;
        for (var i = 0, len = rules.length; i < len; i++) {
          (function (i) {
            that.strategyFn.push(function () {
              var info = [];
              var method = rules[i].strategy.split(":"),
                methodName = method[0],
                errMsg = rules[i].msg,
                val = dom.value;
              info.push(val);
              if (method[1]) {
                info.push(method[1])
              }
              info.push(errMsg);
              return that.ruleList[methodName].apply(dom, info)
            })
          })(i)
        }
      },
      start: function () {
        for (i in this.strategyFn) {
          if (this.strategyFn.hasOwnProperty(i)) {
            var msg = this.strategyFn[i]();
            if (msg) {
              return msg
            }
          }
        }
      }
    }
  }
})()


/* rule-list */
var _rules = (function () {
  var rulelist = {
    isBlank: function (value, errorMsg) {
      if (value === '') {
        return errorMsg;
      };
    },

    minLength: function (value, length, errorMsg) {
      if (value.length < length) {
        return errorMsg;
      };
    },

    maxLength: function (value, length, errorMsg) {
      if (value.length > length) {
        return errorMsg;
      };
    },

    isPhone: function (value, errorMsg) {
      var reg1 = /\+?(?:0{0,2}[46]*){1}7{1}[0-9]{8}/
      /* Matches 0798789678 */
      var reg2 = /^(([+]\d{2}[ ][1-9]\d{0,2}[ ])|([0]\d{1,3}[-]))((\d{2}([ ]\d{2}){2})|(\d{3}([ ]\d{3})*([ ]\d{2})+))$/
      /* Matches 	+46 8 123 456 78 | 08-123 456 78 | 0123-456 78 */
      if (!reg1.test(value) && !reg2.test(value)) {
        return errorMsg;
      }
    },

    isEmail: function (value, errorMsg) {
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
        return errorMsg;
      };
    },

    isSpace: function (value, errorMsg) {
      if ([...value].every(item => {
          return item === ' ';
        })) {
        return errorMsg;
      };
    },

    isAdress: function (value, errorMsg) {
      /* Pattern: (just for test, meaningless)
      Öästervägen 10a
      Öästervägen 10A
      Öästergatan 10A */
      var reg1 = /^[A-ZÖÄÅ][a-zöäå]+(gatan|vägen)\s\d\d([A-Z]|[a-z])*$/
      if (!reg1.test(value)) {
        return errorMsg;
      }
    },

    isPcode: function (value, errorMsg) {
      /* very rough way, not accurate enough */
      if (!/^\d*3\s\d*2$/.test(value)) {
        return errorMsg;
      };
    },

    isCounty: function (value, errorMsg) {
      if (!/^[A-ZÖÄÅ][a-zöäå]+/.test(value)) {
        return errorMsg;
      };
    }
  }
  return {
    rulelist: rulelist
  }
})()


/* do validation */
var validator = _validator(_rules.rulelist);

var forms = document.querySelector('.checkout-form')

/* add method */

// validator.add(forms.adress, [{
//         strategy: 'isBlank',
//         msg: 'Address cannot be empty'
//     },
//     {
//         strategy: 'isAdress',
//         msg: 'Wrong format of address'
//     },
//     {
//         strategy: 'isSpace',
//         msg: 'Please input valid text'
//     }
// ])

validator.add(forms.email, [{
    strategy: 'isBlank',
    msg: 'You need to input email-address'
  },
  {
    strategy: 'isSpace',
    msg: 'Please input valid text'
  },
  {
    strategy: 'isEmail',
    msg: 'Wrong email-address'
  }
])

validator.add(forms.fname, [{
    strategy: 'isBlank',
    msg: 'You need to input forename'
  },
  {
    strategy: 'isSpace',
    msg: 'Please input valid text'
  },
  {
    strategy: 'minLength:2',
    msg: 'Forename cannot be less than 2'
  }, {
    strategy: 'maxLength:20',
    msg: 'Forename cannot be more than 20'
  }
])

validator.add(forms.lname, [{
    strategy: 'isBlank',
    msg: 'You need to input lastname'
  },
  {
    strategy: 'isSpace',
    msg: 'Please input valid text'
  },
  {
    strategy: 'minLength:2',
    msg: 'Forename cannot be less than 2'
  }, {
    strategy: 'maxLength:20',
    msg: 'Forename cannot be more than 20'
  }
])

validator.add(forms.phone, [{
    strategy: 'isBlank',
    msg: 'Phonenumber cannot be empty'
  },
  {
    strategy: 'isSpace',
    msg: 'Please input valid text'
  },
  {
    strategy: 'isPhone',
    msg: 'Wrong phone number'
  }
])


validator.add(forms.pcode, [{
    strategy: 'isBlank',
    msg: 'Zipcode cannot be empty'
  },
  {
    strategy: 'isSpace',
    msg: 'Please input valid text'
  },
  {
    strategy: 'isPcode',
    msg: 'Wrong format of zipcode'
  }
])

validator.add(forms.county, [{
    strategy: 'isBlank',
    msg: 'County cannot be empty'
  },
  {
    strategy: 'isSpace',
    msg: 'Please input valid text'
  },
  {
    strategy: 'isCounty',
    msg: 'Wrong format of county'
  }
])


// validator.add(forms.adress, [{
//         strategy: 'isBlank',
//         msg: 'Address cannot be empty'
//     },
//     {
//         strategy: 'isAdress',
//         msg: 'Wrong format of address'
//     }
// ])


// validation
document.querySelector('.checkout-form__delivery-section__checkoutBtn--dim').onclick = function (event) {

  // call errormsg
  var errMsg = validator.start(),
    errTips = document.querySelector('.err-tips');
  event.preventDefault();

  if (errMsg) {
    console.log(errMsg)
    errTips.innerHTML = errMsg;
    event.preventDefault();
  } else {
    errTips.innerHTML = 'successfully paid';
    event.preventDefault();
  }
}