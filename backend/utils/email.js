const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,        // tu correo
    pass: process.env.EMAIL_PASS         // contraseña de aplicación
  }
});

const enviarCorreo = async (destinatario, asunto, texto) => {
  try {
    await transporter.sendMail({
      from: `"Clínica Médica" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: asunto,
      text: texto
    });
    console.log(`📧 Correo enviado a ${destinatario}`);
  } catch (err) {
    console.error('❌ Error al enviar correo:', err);
  }
};

module.exports = enviarCorreo;
