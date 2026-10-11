"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: DITT NAMN
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */

function validateForm() {
  errors = []; 

  // Kontrollera formulärets obligatoriska fält
  if (fullnameInput.value.trim() === ""){
   errors.push("Du måste skriva ditt namn")
  };
  if(emailInput.value.trim() === ""){
    errors.push("Du måste skriva din e-postadress")
  };
  if(phoneInput.value.trim() === ""){
  errors.push("Du måste skriva ditt telefonnummer")
  };

    // Visa eventuella felmeddelanden
    displayErrors ();

    // Returnera resultatet (true eller false) av valideringen
    return errors.length === 0;
}


/**
 * Visar felmeddelanden på sidan.
 */

function displayErrors() {

    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    for (const error of errors){
     const liElement =document.createElement("li");
     liElement.textContent = error;
      errorList.appendChild(liElement);
    }
      
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {

    // Hämta information från formuläret
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const font = fontSelect.value;

    // Uppdatera studentkortet
    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;
    
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;


    // Lägg till studentkortet i historiken
    const studentCard = {
    fullname: fullnameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    font: fontSelect.value
};

    // Spara och uppdatera historiken
    history.unshift(studentCard);
    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("studentHistory", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {

    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("studentHistory")

    // Uppdatera history
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }

    renderHistory();

}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";


    // Skriv ut innehållet i history till DOM
    for (const studentCard of history){

        const article = document.createElement("article");

        const name = document.createElement("p")
        name.textContent = studentCard.fullname;
        
        const email = document.createElement("p")
        email.textContent = studentCard.email;


        const phone = document.createElement("p")
        phone.textContent = studentCard.phone;
         
        article.style.fontFamily = studentCard.font;


        article.appendChild(name);
        article.appendChild(email);
        article.appendChild(phone);

        historySection.appendChild(article);
    }

}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {

    // Återställ formulär och studentkort
    form.reset();

    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    previewFullname.style.fontFamily = "";
    previewEmail.style.fontFamily = "";
    previewPhone.style.fontFamily = "";

    // Rensa eventuella felmeddelanden
    errors = [];
    displayErrors();
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {

    // Radera sparad historik
   history = [];

   localStorage.removeItem("studentHistory");

    // Uppdatera history och visningen på sidan
    renderHistory();
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
form.addEventListener("submit", (event) => {
    event.preventDefault();

     // - skapa studentkort om valideringen lyckas
    if (validateForm()) {
        createStudentCard();
    }

});





// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);

// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik