document.addEventListener("DOMContentLoaded", function() {
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

    const customResponses = {
        "Thank you":"You're very welcome. If you have more questions, please feel free to ask away.",
        "Thanks":"You're very welcome. If you have more questions, please feel free to ask away.",
        "Hi":"Hello there! How may I help you?",
        "Who are you?":"I am an assistant designed to help you navigate through WiFix and what it's about",
        " ":"Ask any question, I'm here to help",
        "Who founded WiFix?": "WiFix was founded by Noah Kipkechem, focusing on AI-driven connectivity solutions.",
        "What is WiFix?": "WiFix is an AI startup dedicated to eliminating network disruptions before they occur.",
        "What problems does WiFix solve?": "WiFix helps users avoid WiFi interruptions through predictive analysis and smart network switching.",
        "What are WiFix’s products?": "WiFix offers PulseNet Tracker (predictive mapping), EchoLink (automatic network switching), and DarkSpot Detector (dead zone analysis).",
        "How does PulseNet Tracker work?": "PulseNet Tracker uses AI to analyze WiFi signal patterns and predict connection drops in advance.",
        "How does EchoLink work?": "EchoLink seamlessly switches between networks, ensuring zero downtime for users.",
        "What does DarkSpot Detector do?": "DarkSpot Detector scans weak signal areas and suggests optimizations for better connectivity.",
        "How can I contact WiFix?": "You can email us at nckechem@gmail.com or visit our GitHub at github.com/AyoDrip.",
        "How can I support WiFix?": "Support us by spreading the word, using our services, and sharing feedback.",
        "What’s WiFix’s long-term vision?": "WiFix aims to revolutionize network stability, making connectivity effortless and disruption-free."
    };

    function handleChatResponse(userMessage) {
        let botResponse = document.createElement("div");
        botResponse.className = "bot";

        if (customResponses[userMessage]) {
            botResponse.textContent = customResponses[userMessage];
        } else {
            botResponse.textContent = "Hmm, that is beyond my scope! Ask me about WiFix, our services, or network optimization.";
        }

        chatBox.appendChild(botResponse);
    }

    if (sendBtn && chatBox) {
        sendBtn.addEventListener("click", function() {
            let userMessage = userMessageInput.value.trim();

            if (!userMessage) return;

            let newMessage = document.createElement("div");
            newMessage.className = "usermessage";
            newMessage.textContent = userMessage;
            chatBox.appendChild(newMessage);

            handleChatResponse(userMessage);

            userMessageInput.value = "";
        });

        document.querySelectorAll(".preset").forEach((button) => {
            button.addEventListener("click", function() {
                let question = button.textContent;
                userMessageInput.value = question;
                sendBtn.click();
            });
        });
    }
});