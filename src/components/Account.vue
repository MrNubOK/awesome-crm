<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="currency of currencies" :key="currency">
          <span>{{ getCurrency(getCurrencyBalance(currency), currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Account",
    data: () => ({
      currencies: ['RUB', 'USD', 'EUR'],
      balance: 0
    }),
    props: {
      rates: {
        type: Object
      },
    },
    methods: {
      getCurrencyBalance(currency) {
        return this.$store.getters.info.balance / (this.rates['RUB'] / this.rates[currency])
      },
      getCurrency(val, currency) {
        return new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency
        }).format(val)
      }
    }
  }
</script>

<style scoped>

</style>