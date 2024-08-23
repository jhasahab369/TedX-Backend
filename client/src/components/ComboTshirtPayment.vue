<template>
    <div>
      <h2>Combo T-shirt Payment</h2>
      <form @submit.prevent="processComboPayment">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="phone" type="tel" placeholder="Phone" required>
        <button type="submit">Pay for T-shirt Combo</button>
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
      ...mapActions(['comboTshirtPayment']),
      async processComboPayment() {
        try {
          await initiatePayment({
            amount: 1079.00,
            email: this.email,
            phone: this.phone,
          }, this.comboTshirtPayment)
        } catch (error) {
          console.error('Payment failed:', error)
    
        }
      }
    }
  }
  </script>