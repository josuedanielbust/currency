import { API_URL } from '@/utils/constants'
import axios, { AxiosInstance } from 'axios'

class CurrencyService {
  static axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
  })

  constructor() {
  }

  static getRates: () => Promise<any> = async () => {
    return await this.axiosInstance.get('/currency')
      .then((res: any) => {
        if (res.status !== 200) {
          throw new Error(`Error: ${res.status}`)
        }
        return res.data
      }).catch((err: Error) => {
        console.log(err)
      })
  }
}

export default CurrencyService
