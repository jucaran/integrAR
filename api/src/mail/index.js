const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config({ path: "../../.env" });
const { GOOGLE_USERNAME, GOOGLE_PASSWORD } = process.env;
const { firstTimePassword } = require("./mail-model");

const auth = {
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: GOOGLE_USERNAME,
    pass: GOOGLE_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpTransport(auth));

/**
 * Takes user and password and sends an email it to Stundent/Teacher
 */
async function sendMailWithPassword(user, password) {
  let mailBody = firstTimePassword;
  mailBody = mailBody.replace("%name%", user.name);
  mailBody = mailBody.replace("%password%", password);

  const mailOptions = {
    from: GOOGLE_USERNAME,
    to: user.email,
    subject: "Mensaje de confirmación de usuario",
    text: `Hola ${user.name} bienvenido a integrAR! 
          Por favor confirma tu cuenta copiando el siguiente código 
          como contraseña en la app: 
          ${password}
          (Si consideras que fue un error por favor ignora este email)`,
    html: mailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

sendMailWithPassword(
  { name: "Juan", email: "dubsnip.store@gmail.com" },
  "1809480"
);
