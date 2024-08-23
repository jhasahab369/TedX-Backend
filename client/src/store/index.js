import { createStore } from 'vuex'
import axios from 'axios'

const host = process.env.VUE_APP_HOST

export default createStore({
  actions: {
    async singleTshirtPayment(_, payload) {
      try {
        const response = await axios.post(`${host}/atompay/`, {
          event_id: 'single_tshirt',
          amount: payload.amount,
          email: payload.email,
          phone: payload.phone,
          type: "solo"
        }, {
          withCredentials: true
        })
        
        return response.data
      } catch (error) {
        console.error('Payment failed:', error)
        throw error
      }
    },
    async comboTshirtPayment(_, payload) {
      try {
        const response = await axios.post(`${host}/atompay/`, {
          event_id: 'combo_tshirt',
          amount: payload.amount,
          email: payload.email,
          phone: payload.phone,
          type: "solo"
        }, {
          withCredentials: true
        })
        
        return response.data
      } catch (error) {
        console.error('Payment failed:', error)
        throw error
      }
    }
  }
})
