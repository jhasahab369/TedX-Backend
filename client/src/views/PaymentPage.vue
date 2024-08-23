
<template>
    <div class="payment-page">
      <h1>TEDx T-shirt Payment</h1>
      <TshirtPayment />
    </div>
  </template>
  
  <script>
  import TshirtPayment from '@/components/TshirtPayment.vue'
  
  export default {
    name: 'PaymentPage',
    components: {
      TshirtPayment
    }
  }
  </script>