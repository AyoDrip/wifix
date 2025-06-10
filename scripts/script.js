document.addEventListener("DOMContentLoaded", async function() {
    const popup = document.getElementById("modePopup");
    const businessBtn = document.getElementById("businessMode");
    const personalBtn = document.getElementById("personalMode");

    if (popup) {
        popup.classList.add("show");

        businessBtn.addEventListener("click", function() {
            alert("Business Mode selected!");
            popup.classList.remove("show");
        });

        personalBtn.addEventListener("click", function() {
            alert("Personal Mode selected!");
            popup.classList.remove("show");
        });
    }

    const carousel = document.querySelector(".actualcarousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (carousel && nextBtn && prevBtn) {
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
    }

    document.querySelectorAll(".q").forEach((button) => {
        button.addEventListener("click", () => {
            let answer = button.nextElementSibling;
            if (answer) {
                answer.style.display = answer.style.display === "block" ? "none" : "block";
            }
        });
    });

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                alert("Please fill out all fields.");
                return;
            }

            alert("Message sent successfully!");
            this.reset();
        });
    }

    const chatBox = document.querySelector(".chat");
    const sendBtn = document.getElementById("sendbutton");
    const userMessageInput = document.getElementById("usermessage");

    async function loadContext() {
        try {
            const response = await fetch("context.txt");
            const contextText = await response.text();
            return contextText;
        } catch (error) {
            console.error("Error loading context file:", error);
            return "";
        }
    }

    async function handleChatResponse(userMessage) {
        const context = await loadContext();
        puter.ai.chat({ prompt: `${context}\nUser: ${userMessage}` })
            .then(response => {
                addMessage(response.message, false);
            })
            .catch(error => {
                console.error("AI response error:", error);
            });
    }

    function addMessage(input, isUser) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(isUser ? "usermessage" : "bot");
        messageDiv.textContent = input;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener("click", function() {
        const userMessage = userMessageInput.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, true);
        userMessageInput.value = "";

        handleChatResponse(userMessage);
    });

    userMessageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });

    document.querySelectorAll(".preset").forEach(button => {
        button.addEventListener("click", function() {
            userMessageInput.value = button.textContent;
            sendBtn.click();
        });
    });
});