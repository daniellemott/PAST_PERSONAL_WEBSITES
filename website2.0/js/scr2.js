//Author: Danielle Mott
//05/01/2019
//This program allows the user to understand basic RSA cryptography.

//Returns true if "anInt" is a prime integer and false if not.
function checkPrime(anInt) {
  if (Number.isInteger(Number(anInt))) {
    if (anInt == 2) {
      return true;
    }
    if (anInt % 2 == 0 || anInt <=1) {
      return false;
    }
    for (var i = 2; i < (Math.sqrt(Number(anInt)) +1); i++ ) {
      if (Number(anInt) % i == 0) {
        return false;
      }
    }
    return true;
  }
  else {
    return false;
  }
}

//Checks the value provided by the user in the first text box.
//Will display the second text box if the user provides a prime integer,
//but will prompt the user to enter a prime integer if they didn't provide one.
function getPrime() {
  prime = document.getElementById("firstText").value;
  if (checkPrime(prime)) {
    document.getElementById('firstResult').innerHTML = "You chose " + prime + ", as P.";
    secondList = document.getElementsByClassName("second");
    for (var i = 0; i < secondList.length; i++) {
      secondList[i].style.display = "inline-block";
    }
  }
  else {
    document.getElementById("firstResult").innerHTML = "Not a prime number, please try again.";
    prime.value = "";
  }
}


//If the user entered a prime integer that doesn't equal the first prime integer, phi(N)
//will be calculated and displayed. Otherwise, the user will be re-prompted to enter a valid prime integer.
function getSecondPrime() {
  secondPrime = document.getElementById("secondText").value;
  if (checkPrime(secondPrime) && secondPrime != prime) {
    document.getElementById('secondResult').innerHTML = "You chose " + secondPrime + ", as Q.";
    showPhiN();
  }
  else {
    document.getElementById("secondResult").innerHTML = "Not a unique prime number, please try again.";
    prime.value = "";
  }
}

//Calculates and displays phi(N). This function then displays some valid choices for E.
function showPhiN() {
  var phi = document.getElementById('phi');
  phiVal = (secondPrime - 1) * (prime - 1);
  phi.innerHTML = "Phi is (" + prime + " - 1) * (" + secondPrime + " - 1) which equals " + phiVal +".";
  //calculate relatively prime numbers with phi
  for (var i = 0; i < gcdList.length; i++) {
    gcdList[i].style.display = "block";
  }
  //Calculate numbers in the previous list that are relatively prime
  //and have modular inverses.
  relative = numRelPrime(phiVal);
  for (var i = 0; i < relative.length - 1; i++) {
    document.getElementById('show').innerHTML += relative[i] + ", ";
  }
  document.getElementById('show').innerHTML += relative[relative.length - 1];
  for (var i = 0; i < thirdList.length; i++) {
    thirdList[i].style.display = "inline-block";
  }
  document.getElementById('thirdButton').addEventListener('click', checkE);

}

//calculate 15 numbers that are relatively prime with phi and returns the list.
function numRelPrime(phi) {
  var relPrimeList = [];
  for (var i = 1; i < phi; i++) {
    if (gcd(i, phi) == 1 && hasInv(i, phi)) {
      relPrimeList.push(i);
    }
    if (relPrimeList.length == 15) {
      break;
    }
  }
  return relPrimeList;
}

//Ensures the numbers that are relatively prime with phi have a modular inverse
function hasInv(num, mod) {
  for (var i = 1; i < mod; i++) {
    if (((num * i) % mod) == 1) {
      return true;
    }
  }
  return false;
}

//calculates and returns gcd
function gcd(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

//returns the integer that is the modular inverse of e (the parameter)
function calcD(e) {
  for (var i = 0; i < phiVal; i++) {
    if (((e * i) % phiVal) == 1) {
      return i;
    }
  }
  return -1;
}

//ensures the users makes a valid choice
function checkE() {
  document.getElementById("redBorder").style.border = "medium solid #008CBA";
  e = document.getElementById('thirdText').value;
  if (relative.includes(Number(e))) {
    document.getElementById('thirdResult').innerHTML = "You chose " + e + ", as E.";
    document.getElementById('four').style.display = "block";
    d = calcD(e);
    document.getElementById('four').innerHTML += d + ".";
    document.getElementById('five').style.display = "block";
    document.getElementById('five').innerHTML += "</br>N is: " + (secondPrime * prime) + ".</br>E is: " + e + ".";
    alice();
  }
  else if (gcd(e, phiVal) == 1 && hasInv(e, phiVal)) {
    document.getElementById('thirdResult').innerHTML = "You chose " + e + ", as E.";
    document.getElementById('four').style.display = "block";
    d = calcD(e);
    document.getElementById('four').innerHTML += d + ".";
    document.getElementById('five').style.display = "block";
    document.getElementById('five').innerHTML += "</br>N is: " + (secondPrime * prime) + ".</br>E is: " + e + ".";
    alice();
    }
  else {
    document.getElementById('thirdResult').innerHTML = "Please choose a number E that is relatively prime with phi and has a modular inverse.";
    document.getElementById('thirdText').value = "";
  }
}

//displays instructions for Alice and adds event listener to first submit button on Alice's side
function alice() {
  if (window.innerWidth > 560) {
    window.scrollTo(0, 800);
  }
  document.getElementById('alice').style.display = "block";
  for (var i = 0; i < sixList.length; i++) {
    sixList[i].style.display = "inline-block";
  }
  document.getElementById('sixthButton').addEventListener("click", checkAlice);
}

//Ensures an integer is entered by Alice.
function checkAlice() {
  secretMessage = document.getElementById('sixthText').value;
  if (Number.isInteger(Number(secretMessage))) {
    document.getElementById('sixthResult').innerHTML = "The secret number is " + secretMessage + ".";
    sendToBob();
  }
  else {
    document.getElementById('sixthResult').innerHTML = "Please enter an integer for the secret number.";
    document.getElementById('sixthText').value = "";
  }
}

//Displays how Alice's number is encrypted
function sendToBob() {
  b = (secondPrime * prime);
  toBob = bigInt(secretMessage).modPow(e, b);
  document.getElementById('encode').innerHTML = "To encode the number: (" + secretMessage + " ^ " + e +") % " + b + ".</br>";
  document.getElementById("blueBorder").style.border = "medium solid #008CBA";
  document.getElementById('toBob').innerHTML = "<em>Alice will send the encoded number " + toBob + " to Bob.<em>";
  displayAnswer();
}

//Displays the decoded answer
function displayAnswer() {
  //Moves screen focus to bottom of page for corresponding screen sizes
  if (window.innerWidth > 560) {
    window.scrollTo(0, 1800);
  }
  var answ = bigInt(toBob).modPow(d, b);
  document.getElementById('decodeAnsw').innerHTML = "To decode the secret number: (" + toBob + " ^ " + d + ") % " + b +  ".";
  document.getElementById("blueBorderTwo").style.border = "medium solid #008CBA";
  document.getElementById('answer').innerHTML = "<em>The decoded secret number is " + answ + ".</em>";
}

//start function invoked when page is loaded
function start() {
  //hide everything
  secondList = document.getElementsByClassName("second");
  for (var i = 0; i < secondList.length; i++) {
    secondList[i].style.display = "none";
  }
  gcdList = document.getElementsByClassName("gcd");
  for (var i = 0; i < gcdList.length; i++) {
    gcdList[i].style.display = "none";
  }
  thirdList = document.getElementsByClassName('third');
  for (var i = 0; i < thirdList.length; i++) {
    thirdList[i].style.display = "none";
  }
  document.getElementById('four').style.display = "none";
  document.getElementById('five').style.display = "none";

  sixList = document.getElementsByClassName('six');
  for (var i = 0; i < sixList.length; i++) {
    sixList[i].style.display = "none";
  }

  firstButton = document.getElementById('firstButton');
  firstButton.addEventListener("click", getPrime);
  secondButton = document.getElementById('secondButton');
  secondButton.addEventListener("click", getSecondPrime);

}

window.addEventListener("load", start);
