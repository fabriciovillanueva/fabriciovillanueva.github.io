document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const closeChat = document.getElementById("close-chat");
    const sendMessage = document.getElementById("send-message");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");

    // Abrir y cerrar la ventana del chat
    document.getElementById("chat-button").addEventListener("click", () => {
        chatbox.classList.toggle("hidden");
    });

    closeChat.addEventListener("click", () => {
        chatbox.classList.add("hidden");
    });

    // Enviar mensaje
    sendMessage.addEventListener("click", async () => {
        const mensaje = userInput.value.trim();
        if (!mensaje) return;

        // Mostrar el mensaje del usuario
        mostrarMensaje("user-message", mensaje);
        userInput.value = "";

        try {
            // Enviar mensaje al backend
            const respuesta = await fetch("http://localhost:3000/api/chat", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mensaje })
            });

            const data = await respuesta.json();
            if (data.respuesta) {
                mostrarMensaje("bot-message", data.respuesta);
            } else {
                mostrarMensaje("bot-message", "No tengo una respuesta para eso.");
            }
        } catch (error) {
            console.error(error);
            mostrarMensaje("bot-message", "Error al conectar con el servidor.");
        }
    });

    // Mostrar mensaje en el chat
    function mostrarMensaje(tipo, texto) {
        const mensaje = document.createElement("div");
        mensaje.className = tipo === "user-message" ? "message user-message" : "message bot-message";
        mensaje.textContent = texto;
        chatMessages.appendChild(mensaje);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al final
    }
});
