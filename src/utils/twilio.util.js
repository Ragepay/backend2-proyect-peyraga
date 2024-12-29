import twilio from "twilio";
import envUtil from "./env.util.js";
const { TWILIO_ID, TWILIO_TOKEN, TWILIO_PHONE } = envUtil;

// Enviar mensaje MSM por numero de telefono.
async function sendSms(phone) {
    try {
        const client = twilio(TWILIO_ID, TWILIO_TOKEN);
        client.messages.create({
            body: "WELCOME TO CODER BACKEND 2",
            from: TWILIO_PHONE,
            to: phone
        })
        console.log(`Mensaje enviado a ${phone}`);
    } catch (error) {
        console.log(error);
        throw error;
    };
};

// Enviar mensaje por whatsapp al numero de telefono.
async function sendWhatsappMessage(phone) {
    try {
        const client = twilio(TWILIO_ID, TWILIO_TOKEN);
        await client.messages.create({
            body: "¡Hola! Bienvenido a Coder Backend 2 por WhatsApp 🚀",
            from: "whatsapp:+14155238886", // Número de Twilio habilitado para WhatsApp
            to: `whatsapp:${phone}` // Número de destino con código de país
        });
        console.log(`Mensaje enviado por WhatsApp a ${phone}`);
    } catch (error) {
        console.log("Error al enviar el mensaje por WhatsApp:", error);
        throw error;
    }
}

export { sendSms, sendWhatsappMessage };