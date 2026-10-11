"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Laura Pham
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
  // Töm gamla fel innan formuläret kontrolleras igen
  errors = []; 

  // Kontrollera formulärets obligatoriska fält om de är tomt
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

    // Rensa tidigare felmeddelanden från sidan
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
   
    for (const error of errors){  // Gå igenom varje fel som finns i errors

    // Skapa ett nytt li-element för varje fel
    const liElement =document.createElement("li");

    // Lägg felmeddelandet som text i li-elementet
    liElement.textContent = error;
     
    // Lägg li-elementet i fellistan på sidan 
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
    
    // Använd det valda typsnittet på studentkortets text
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;


    // Skapa ett objekt som innehåller studentkortets information
    const studentCard = {
    fullname: fullnameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    font: fontSelect.value
};

    // Lägg det nya studentkortet först i history-arrayen
    history.unshift(studentCard);

    // Spara historiken i localStorage
    saveHistory();

    // Uppdatera historiken som visas på webbsidan
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage och gör om history-arrayen till text med JSON.stringify
    localStorage.setItem("studentHistory", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {

    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("studentHistory")

    // Kontrollera om det finns något sparat
    if (savedHistory) {
        history = JSON.parse(savedHistory);   // Gör om den sparade texten till en JavaScript-array och lägg den i history
    }

    // Visa historiken på sidan
    renderHistory();

}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Gå igenom varje studentkort som finns i history
    for (const studentCard of history){

        // Skapa ett article-element för ett studentkort
        const article = document.createElement("article");

        // Skapa ett p-element för namnet, email och telefonnummer och lägg studentens namn, email, telefonnummer i p-elementet
        const name = document.createElement("p")
        name.textContent = studentCard.fullname;
        
        const email = document.createElement("p")
        email.textContent = studentCard.email;


        const phone = document.createElement("p")
        phone.textContent = studentCard.phone;
         
        // Använd studentkortets sparade typsnitt
        article.style.fontFamily = studentCard.font;

        // Lägg namn, e-post och telefon inuti article
        article.appendChild(name);
        article.appendChild(email);
        article.appendChild(phone);

        // Lägg studentkortet i historikdelen på sidan
        historySection.appendChild(article);
    }

}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {

    // Återställ alla fält i formuläret
    form.reset();

    // Återställ texten på studentkortet
    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    // Ta bort det valda typsnittet från studentkortet
    previewFullname.style.fontFamily = "";
    previewEmail.style.fontFamily = "";
    previewPhone.style.fontFamily = "";

    // Rensa eventuella felmeddelanden
    errors = [];   // Töm gamla fel
    displayErrors();  // Uppdatera fellistan så att gamla fel försvinner
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {

   // Töm history-arrayen
   history = [];

   // Ta bort den sparade historiken från localStorage
   localStorage.removeItem("studentHistory");

   // Uppdatera sidan så att historiken försvinner direkt
   renderHistory();
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stoppa webbläsaren från att ladda om sidan

     // - skapa studentkort om valideringen lyckas
    if (validateForm()) {
        createStudentCard();
    }

});

 
// När användaren klickar på "Rensa" kör funktionen clearForm
clearButton.addEventListener("click", clearForm);

// När användaren klickar på "Radera historik" kör funktionen deleteHistory
deleteHistoryButton.addEventListener("click", deleteHistory);


// När sidan laddas:
// - läs in och visa eventuell tidigare historik
loadHistory();