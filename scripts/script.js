document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("modePopup");
    const businessBtn = document.getElementById("businessMode");
    const personalBtn = document.getElementById("personalMode");

    popup.classList.add("show");

    businessBtn.addEventListener("click", function() {
        alert("Business Mode selected!");
        popup.classList.remove("show");
    });

    personalBtn.addEventListener("click", function() {
        alert("Personal Mode selected!");
        popup.classList.remove("show");
    });
});

const carousel = document.querySelector(".actualcarousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;
const totalItems = document.querySelectorAll(".productslide").length;

nextBtn.addEventListener("click", () => {
    index = (index + 1) % totalItems;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + totalItems) % totalItems;
    updateCarousel();
});

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelectorAll(".q").forEach((button) => {
    button.addEventListener("click", () => {
        let answer = button.nextElementSibling;

        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields.");
        return;
    }

    alert("Message sent successfully!");
    this.reset();
});

document.getElementById("sendbutton").addEventListener("click", function() {
    let userMessage = document.getElementById("usermessage").value.trim();
    
    if (userMessage === "") return;
    
    let chatBox = document.querySelector(".chat");
    let newMessage = document.createElement("div");
    newMessage.className = "user-message";
    newMessage.textContent = userMessage;
    
    chatBox.appendChild(newMessage);
    document.getElementById("usermessage").value = ""; // Clear input

    setTimeout(() => {
        let botResponse = document.createElement("div");
        botResponse.className = "bot";
        botResponse.textContent = "I'm still learning! Let me know how I can assist.";
        chatBox.appendChild(botResponse);
    }, 1000);
});
