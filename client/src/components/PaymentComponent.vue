<template>
  <div>
    <button @click="startPayment">Pay Now</button>
  </div>
</template>

<script>
/* global Razorpay */ 
import axios from 'axios';



export default {
  data() {
    return {
      order: null,
    };
  },
  async mounted() {
    await this.createOrder();
  },
  methods: {
    async createOrder() {
      const amount = 500; // Example amount
      const currency = 'INR';
      const receipt = `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;


      try {
        const orderResponse = await axios.post('http://localhost:3000/create-order', { amount, currency, receipt }); // add quantity 
      } catch (error) {
        console.error('Error creating order:', error);
      }
    },
    startPayment() {
      if (!this.order) {
        console.error('Order not created yet');
        return;
      }

      const options = {
        key: process.env.VUE_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: this.order.amount,
        currency: this.order.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: this.order.id,
        handler: async (response) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          try {
            const verifyResponse = await axios.post('http://localhost:3000/verify-payment', {
              order_id: razorpay_order_id,
              payment_id: razorpay_payment_id,
              signature: razorpay_signature,
            });

            if (verifyResponse.data.success) {
              alert("Payment successful");
            } else {
              alert("Payment verification failed");
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
          }
        },
        prefill: {
          name: "Your Name",
          email: "email@example.com",
          contact: "9999999999"
        },
        notes: {
          address: "Your Address"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    }
  }
};
</script>

<style>
/* Add any styles for your component here */
</style>
