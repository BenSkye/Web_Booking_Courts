import { Router } from 'express'
import crypto from 'crypto'
// import { dark } from '@mui/material/styles/createPalette'
import axios from 'axios'

const momoRoute = Router()

momoRoute.route('/').post(async (req, res) => {
  const accessKey = process.env.MOMO_ACCESS_TOKEN || ''
  const secretKey = process.env.MOMO_SECRET_KEY || ''
  const orderInfo = 'pay with MoMo123'
  const partnerCode = 'MOMO'
  const redirectUrl = 'https://web-booking-courts.vercel.app/'
  const ipnUrl = 'https://d006-2405-4802-8151-b110-79bf-e6d9-47d9-2bab.ngrok-free.app/api/v1/payment/callback'
  const requestType = 'captureWallet'
  const amount = '50000'
  const orderId = 'RacketRise' + new Date().getTime()
  const requestId = orderId
  const extraData = ''
  const paymentCode =
    'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA=='
  const orderGroupId = ''
  const autoCapture = true
  const lang = 'vi'

  // Tạo chuỗi chữ ký
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`

  // Tạo chữ ký HMAC SHA256
  const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex')

  // Tạo body của yêu cầu HTTP
  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    orderExpireTime: 1,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature
  })

  const options = {
    method: 'POST',
    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  }

  try {
    // Gửi yêu cầu HTTP bằng Axios
    const result = await axios(options)
    console.log('MoMo API Response:', result.data) // Nhật ký thêm để gỡ lỗi chi tiết
    return res.status(200).json(result.data)
  } catch (error: any) {
    console.error('MoMo API Error:', error) // Nhật ký thêm để gỡ lỗi chi tiết
    return res.status(500).json(error.response ? error.response.data : error.message)
  }
})
momoRoute.route('/callback').post(async (req, res) => {
  console.log('MoMo Callback:', req.body) // Nhật ký thêm để gỡ lỗi chi tiết
  return res.status(200).json(req.body)
})
export default momoRoute