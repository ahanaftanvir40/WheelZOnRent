import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
service: 'gmail',
host: "smtp.gmail.com",
port: 587,
secure: false,
auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
}
});

export const sendEmail = async (to, subject, text) => {

try {
    const info = await transporter.sendMail({
    from: `"Fahmid" <${process.env.EMAIL}>`,
    to,
    subject,
    text
    });

    console.log('Email sent: ', info.messageId);

} catch (error) {
    console.error('Error sending email: ', error);
    throw error;
}
};


