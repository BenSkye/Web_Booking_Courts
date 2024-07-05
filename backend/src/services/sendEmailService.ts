import nodemailer from 'nodemailer'

// Hàm tạo transporter sử dụng thông tin đăng nhập Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'racketrise@gmail.com',
      pass: 'fkts jfru krox axrb' // Thay bằng app password nếu cần thiết
    }
  })
}

// Hàm gửi email chào mừng
class sendEmailSerVice {
  static async sendEmail(email: string, mailOption: any) {
    const transporter = createTransporter()

    const mailOptions = {
      from: 'racketrise@gmail.com',
      to: email,
      subject: mailOption.subject,
      text: mailOption.text, // Thêm mật khẩu vào nội dung email
      html: mailOption.html // HTML có thể format mật khẩu để nổi bật hơn
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log(`Email sent to ${email}`)
    } catch (error) {
      console.error('Error sending email:', error)
      throw error // Handle or propagate the error as needed
    }
  }
}
export default sendEmailSerVice
