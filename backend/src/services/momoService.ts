import crypto from 'crypto'
import axios from 'axios'
class momoService {
  static async createPayment(
    orderInfo: string,
    amount: number,
    orderId: string,
    centerId: string,
    callbackUrl: string
  ) {
    const accessKey = process.env.MOMO_ACCESS_TOKEN
    const secretKey = process.env.MOMO_SECRET_KEY
    const partnerCode = 'MOMO'
    const redirectUrl = process.env.MOMO_REDIRECT_URL
    const ipnUrl = process.env.MOMO_IPN_URL_HOSTING + callbackUrl
    console.log('ipnUrl', ipnUrl)
    const requestType = 'captureWallet'
    const requestId = orderId
    const extraData = ''
    const orderGroupId = ''
    const autoCapture = true
    const orderExpireTime = 1
    const lang = 'vi'
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`
    const signature = crypto
      .createHmac('sha256', secretKey ?? '')
      .update(rawSignature)
      .digest('hex')

    const requestBody = JSON.stringify({
      partnerCode,
      partnerName: 'RacketRise',
      storeId: centerId,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      orderExpireTime,
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
      const result = await axios(options) // Nhật ký thêm để gỡ lỗi chi tiết
      return result.data
    } catch (error: any) {
      console.error('MoMo API Error:', error) // Nhật ký thêm để gỡ lỗi chi tiết
      return error.response ? error.response.data : error.message
    }
  }
}
export default momoService
