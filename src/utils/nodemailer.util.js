import { createTransport } from "nodemailer";
import envUtil from "./env.util.js";
const { NODEMAILER_EMAIL_APP_PASSWORD, NODEMAILER_EMAIL, PORT } = envUtil;

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
            subject: "Verify Your Account on Our Platform",
            text: `
                        Welcome to our platform.

                        Please verify your account by clicking the following link:
                        http://localhost:${PORT}/api/sessions/verify?code=${verifyCode}&email=${to}

                        If you did not request this registration, please ignore this message.
                    `,
            html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h1 style="color: #007bff;">Welcome to Our Platform!</h1>
                            <p>Thank you for registering. Please verify your account by clicking the following link:</p>
                            <p>
                                <a href="http://localhost:${PORT}/api/sessions/verify?code=${verifyCode}&email=${to}" 
                                target="_blank" 
                                style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 15px; border-radius: 5px;">
                                    Verify Account
                                </a>
                            </p>
                            <p>If you did not request this registration, please ignore this message.</p>
                            <hr />
                            <p style="font-size: 12px; color: #999;">If you no longer wish to receive these emails, click <a href="http://localhost:${PORT}/unsubscribe?email=${to}" target="_blank">here</a>.</p>
                        </div>
                    `
        })
    } catch (error) {
        throw error;
    };
}

export { sendVerifyEmail };