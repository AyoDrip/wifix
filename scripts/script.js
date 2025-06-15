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
            return "You are a helpful assistant for a company named WiFix. Answer questions ONLY about WiFix and its products based on information provided in the system message. If you don't know, state that you don't have that information.";
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
        typingIndicator.textContent = "Hmmm...";
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            if (typeof puter === 'undefined' || !puter.ai || !puter.ai.chat) {
                throw new Error("Puter.js library or puter.ai.chat function is not available. Ensure puter.js is loaded and running in a compatible environment (e.g., deployed on Puter.com).");
            }

            const contextContent = await fetchAppContext();

            const messages = [
                { role: 'system', content: contextContent },
                { role: 'user', content: userMessage }
            ];

            console.log("Sending to Puter AI:", messages);

            const response = await puter.ai.chat(messages);

            console.log("Received from Puter AI:", response);

            chatBox.removeChild(typingIndicator);

            if (response && response.message && response.message.content && response.finish_reason === 'stop') {
                addMessage(response.message.content, false);
            } else {
                console.error("AI returned an invalid or empty response structure:", response);
                addMessage("I'm sorry. Perhaps you may ask your question again please?", false);
            }
        } catch (error) {
            console.error("Error communicating with Puter AI:", error);
            if (chatBox.contains(typingIndicator)) {
                chatBox.removeChild(typingIndicator);
            }
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
            if (event.key === "Enter") { event.preventDefault();
                sendBtn.click();
            }
        });
    }

    let visitorCount = localStorage.getItem('wifix_visitor_count');
    if (visitorCount === null) {
        visitorCount = 0;
    } else {
        visitorCount = parseInt(visitorCount);
    }
    visitorCount++;
    localStorage.setItem('wifix_visitor_count', visitorCount);
    document.getElementById('visitorcount').textContent = `Visitors: ${visitorCount}`;
});