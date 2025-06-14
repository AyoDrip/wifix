document.addEventListener("DOMContentLoaded", async function() {
    const popup = document.getElementById("modePopup");
    const businessBtn = document.getElementById("businessMode");
    const personalBtn = document.getElementById("personalMode");

    if (popup) {
        setTimeout(() => popup.classList.add("show"), 100);
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
    const slides = document.querySelectorAll(".productslide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (carousel && prevBtn && nextBtn && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        carousel.style.overflow = 'visible';

        function updateCarousel() {
            const slideWidth = slides[0].offsetWidth;
            const carouselStyle = window.getComputedStyle(carousel);
            const gap = parseInt(carouselStyle.gap) || 20;
            const step = slideWidth + gap;
            carousel.style.transform = `translateX(-${currentIndex * step}px)`;
            carousel.style.transition = 'transform 0.5s ease-in-out';
        }

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
    }

    document.querySelectorAll(".q").forEach((button) => {
        button.addEventListener("click", () => {
            let answer = button.nextElementSibling;
            if (answer) {
                const isVisible = answer.style.display === "block";
                answer.style.display = isVisible ? "none" : "block";
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

    async function fetchAppContext() {
        try {
            const response = await fetch('context.txt');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error("Could not fetch context.txt:", error);
            return "You are a helpful assistant for a company named WiFix.";
        }
    }

    function addMessage(text, isUser) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(isUser ? "usermessage" : "bot");
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function handleChatResponse(userMessage) {
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("bot");
        typingIndicator.textContent = "WiFix is thinking...";
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        const context = await fetchAppContext();
        const prompt = `${context}\n\nUser: ${userMessage}\nAssistant:`;

        try {
            if (typeof puter === 'undefined' || !puter.ai || !puter.ai.chat) {
                throw new Error("Puter.js library is not available.");
            }
            const response = await puter.ai.chat({ prompt: prompt });
            chatBox.removeChild(typingIndicator);
            addMessage(response.message, false);
        } catch (error) {
            console.error("AI response error:", error);
            chatBox.removeChild(typingIndicator);
            addMessage("I'm sorry, I seem to be having trouble connecting. Please try again in a moment.", false);
        }
    }

    if (sendBtn && userMessageInput && chatBox) {
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
    }
});