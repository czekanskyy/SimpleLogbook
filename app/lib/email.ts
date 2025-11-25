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
  console.log('Attempting to send new user email...')
  console.log('SMTP Config Check:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USER,
    hasPassword: !!process.env.SMTP_PASSWORD
  })

  if (!process.env.SMTP_HOST) {
    console.error('SMTP not configured (missing SMTP_HOST), skipping email')
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
    console.log('Sending email with options:', { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject })
    const info = await transporter.sendMail(mailOptions)
    console.log('New user email sent successfully:', info.messageId)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
