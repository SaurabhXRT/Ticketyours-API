import axios from 'axios';

export class Fast2smsService {
  async sendFast2smsOtp(phone: any, otp: Number) {
    try {
      const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
        params: {
          variables_values: otp,
          language: 'english',
          route: ' otp',
          numbers: phone,
          authorization: process.env.FAST2SMS_API_KEY,
        },
      });

      if (response.data && response.data.return) {
        console.log('otp sent successfully', response.data);
        return true;
      } else {
        console.log('error sending otp', response.data);
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new Error('error while sending otp' + error);
    }
  }
}
