import { createTransport } from "nodemailer";
import envUtil from "./env.util.js";
const { NODEMAILER_EMAIL_APP_PASSWORD, NODEMAILER_EMAIL } = envUtil;

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_EMAIL_APP_PASSWORD
    }
})

const sendVerifyEmail = async ({ to, verifyCode }) => {
    try {
        await transport.verify();
        await transport.sendMail({
            from: NODEMAILER_EMAIL,
            to,
            subject: "Verify your Account.",
            html: `
            <h1 style="color: red"> Welcome to Backend 2 !</h1>
            <p>Click en el siguiente link: ${verifyCode}</p>
            `
        })
    } catch (error) {
        throw error;
    };
}

export { sendVerifyEmail };