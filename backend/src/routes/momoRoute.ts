import { Router } from 'express'
import crypto from 'crypto'
import axios from 'axios'

const momoRoute = Router()

momoRoute.route('/').post(async (req, res) => {
  try {
    const accessKey = process.env.MOMO_ACCESS_TOKEN || ''
    const secretKey = process.env.MOMO_SECRET_KEY || ''
    const orderInfo = 'pay with MoMo123'
    const partnerCode = 'MOMO'
    const redirectUrl = 'https://web-booking-courts.vercel.app/'
    const ipnUrl = 'https://your-ngrok-url/api/v1/payment/callback'
    const requestType = 'captureWallet'
    const amount = '50000'
    const orderId = 'RacketRise' + new Date().getTime()
    const requestId = orderId
    const extraData = ''
    const orderGroupId = ''
    const autoCapture = true
    const lang = 'vi'

    // Create raw signature string
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`

    // Create HMAC SHA256 signature
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex')

    // Create HTTP request body
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

    // Send HTTP request using Axios
    const result = await axios(options)
    console.log('MoMo API Response:', result.data)
    return res.status(200).json(result.data)
  } catch (error: any) {
    console.error('MoMo API Error:', error)
    return res.status(500).json(error.response ? error.response.data : error.message)
  }
})

momoRoute.route('/callback').post(async (req, res) => {
  console.log('MoMo Callback:', req.body)
  return res.status(200).json(req.body)
})

export default momoRoute
