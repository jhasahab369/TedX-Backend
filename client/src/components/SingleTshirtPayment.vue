<template>
    <div>
      <h2>Single T-shirt Payment</h2>
      <form @submit.prevent="processSinglePayment">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="phone" type="tel" placeholder="Phone" required>
        <button type="submit">Pay for Single T-shirt</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  import { initiatePayment } from '@/utils/payment'
  
  export default {
    data() {
      return {
        email: '',
        phone: '',
      
      }
    },
    methods: {
      ...mapActions(['singleTshirtPayment']),
      async processSinglePayment() {
        try {
          await initiatePayment({
            amount: 399.00,
            email: this.email,
            phone: this.phone,
          }, this.singleTshirtPayment)
        } catch (error) {
          console.error('Payment failed:', error)

        }
      }
    }
  }
  </script>