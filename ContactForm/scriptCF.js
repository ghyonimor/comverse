document.addEventListener("DOMContentLoaded", function() { 
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  document.getElementById("jsEnabled").style.display = "inline-block";
  //Form submittion validation.
  var submit = document.querySelector('input[type="submit"]');
  submit.addEventListener("click", validate);

  //IMPORTANT NOTE: Elements with "invalid" class are marked with a red border.
  //IMPORTANT NOTE: Intype validation starts only after first submittion.

  //Input: Click event.
  //Output: Display a red border and an error message if an input field is empty and must be filled. Prevents form submittion if any field is invalid (regardless if empty or illegal).
  function validate(e) {
    var allRequiredEmpty = document.querySelectorAll('[am-required~="empty"]');
    //Init errors.
    var elements = document.getElementsByClassName('error');
    while (elements[0])   
      //Note: What do I do when a few error fields have the same parent node?
      elements[0].parentNode.removeChild(elements[0]);
    //Iteration on all [am-required*="empty"] fields.
    for (var i = 0; i < allRequiredEmpty.length; i++) {
      var element = allRequiredEmpty[i];
      if (element.value.replace(/\s+/g, '') === "") {
        element.className = "invalid";
        //Inject error message.
        var message = "Please fill out this field.";
        createError(element, message);
      }
    }
    var allRequired = document.querySelectorAll('[am-required]');
    //Iteration on all [am-required] fields.
    for (var elm = 0; elm < allRequired.length; elm++){
      var elem = allRequired[elm];
      if (elem.value.replace(/\s+/g, '') !== "") {
        //Check if legal input.
        isLegal(elem);
      } 
      //Intype validation.
      elem.addEventListener("input", intypeValidate);
    }
    //Don't send form if any input fields are invalid.
    var allInvalid = document.getElementsByClassName("invalid");
    if (allInvalid.length > 0)
      e.preventDefault();
    else
      displayMessage();
  };

  //Input: content change event;
  //Output: display a red border and an error message around illegal inputs.
  function intypeValidate(e) {
    //Init errors.
    var elements = this.parentNode.getElementsByClassName('error');
    while (elements[0])             
      elements[0].parentNode.removeChild(elements[0]);
    if (this.value.replace(/\s+/g, '') !== "") {
      isLegal(this); 
    }
    //This piece of code checks if the input field is empty and must be filled - if so: display a red border.
    //Note:(again) What do I do when a few input fields have the same parent node?
    else if (this.parentNode.querySelector('[am-required~="empty"]') !== null) {
      this.className = "invalid";
      var message = "Please fill out this field.";
      createError(this, message);
    }
    //Legal input.
    else this.removeAttribute('class');
  };

  //Checks if a string is a valid email: has a single "@" occurence (not at the beginning) and at least one "." occurence after the "@" (not right after the "@" or at the end).
  //Input: DOM element.
  //Output: Element validation.
  var isValidEmail = function(element) {
    //Initialize the element's validation.
    element.removeAttribute('class');
    var str = element.value.replace(/\s+/g, '');
    var count = 0;
    //Count the "@"'s and find the place of the last one.
    for (var i = 0; i < str.length; i++)
      if (str[i] === "@") {
        count++;
        var place = i;
      }
    //If "@" has a single occurence, cut the string from it to the end.
    if (count === 1 && str[0] !== "@") {
      var substr = str.substring(place + 1, str.length);
      //Search at least a single "." in the substring, check it's not the first or last letter.
      if (substr.indexOf(".") !== -1 && substr[0] !== "." && substr[substr.length - 1] !== ".")
        element.removeAttribute('class');
      else {
        element.className = "invalid";
        var message = "Illegal email.";
        createError(element, message);
      }
    }
    else {
      element.className = "invalid";
      var message = "Illegal email.";
      createError(element, message);
    }
  };

  //Checks if a string is a valid phone number, allowing only digits, "-" and ".".
  //Input: DOM element.
  //Output: Element validation.
  var isValidPhone = function(element) {
    //Initialize the element's validation.
    element.removeAttribute('class');
    var bool = true;
    var str = element.value.replace(/\s+/g, '');
    //Check for legal letters.
    for (var i = 0; i < str.length; i++)
      if (str[i] !== "-" && str[i] !== ".") 
        if (isNaN(str[i])) {
          bool = false;
          break;
        }
    if (bool === false) {
      element.className = "invalid";
      var message = "Illegal phone.";
      createError(element, message);
    }
  };

  //Display form submittion message.
  var displayMessage = function() {
    var msg = document.createTextNode("Message sent.");
    var par = document.createElement("P");
    par.appendChild(msg);
    var form = document.getElementById("AccessibleForm");
    form.appendChild(par);
  };

  //Inject a span error message (msg) right after an element (elm).
  var createError = function(elm, msg) {
    var elmID = elm.id;
    var error = document.createElement("span");
    var text = document.createTextNode(msg);
    error.appendChild(text);
    error.className = "error";
    //Apply aria-describeby attribute to relate the error message with the input field.
    error.setAttribute("aria-describedby", elmID);
    elm.parentNode.insertBefore(error, elm.nextSibling);
  };

    //Checks input legallity. Use this function only for non-empty strings.
  var isLegal = function(elm) {
    switch (elm.id) {
      case "name":
        elm.removeAttribute('class');
        break;
      case "email": 
        //Check if valid email (contains a @ and a dot after the @ mark).
        isValidEmail(elm);
        break;
      case "company":
        elm.removeAttribute('class');
        break;
      case "phone": 
        //Check if valid phone number (numbers, whitespaces and - allowed).
        isValidPhone(elm);
        break;
      case "message":
        elm.removeAttribute("class");
        break;
      default: break;
    } 
  };
});

