
<template>
    <div class="tshirt-payment">
      <h2>TEDx T-shirt Payment Options</h2>
      <div class="payment-options">
        <SingleTshirtPayment />
        <ComboTshirtPayment />
      </div>
    </div>
  </template>
  
  <script>
  import SingleTshirtPayment from './SingleTshirtPayment.vue'
  import ComboTshirtPayment from './ComboTshirtPayment.vue'
  
  export default {
    name: 'TshirtPayment',
    components: {
      SingleTshirtPayment,
      ComboTshirtPayment
    }
  }
  </script>
  
  <style scoped>
  .tshirt-payment {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .payment-options {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  @media (max-width: 600px) {
    .payment-options {
      flex-direction: column;
    }
  }
  </style>