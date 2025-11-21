import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendNewUserEmail(user: { name?: string | null, email?: string | null }) {
  if (!process.env.SMTP_HOST) {
    console.log('SMTP not configured, skipping email')
    return
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: 'admin@czekanski.dev',
    subject: 'New User Registration - SimpleLogbook',
    text: `
      A new user has registered:
      Name: ${user.name}
      Email: ${user.email}
      
      Please login to the admin dashboard to approve this user.
    `,
    html: `
      <h2>New User Registration</h2>
      <p>A new user has registered:</p>
      <ul>
        <li><strong>Name:</strong> ${user.name}</li>
        <li><strong>Email:</strong> ${user.email}</li>
      </ul>
      <p>Please login to the admin dashboard to approve this user.</p>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('New user email sent')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
