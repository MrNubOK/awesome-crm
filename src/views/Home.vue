<template>
  <div class="home">
    <div>
      <div class="page-title">
        <h3>Счет</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <Loader v-if="loading" />
      <div class="row" v-else>
        <Account
            :rates="rates.rates"
        />

        <Rates
            :rates="rates.rates"
            :date="rates.date"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Account from "../components/Account";
  import Rates from "../components/Rates";

  export default {
    name: 'Home',
    components: {
      Account,
      Rates
    },
    data: () => ({
      loading: true,
      rates: null,
      balance: 0
    }),
    async mounted() {
      this.rates = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
    methods: {
      refresh() {
        this.$store.dispatch('fetchInfo')
      }
    }
  }
</script>
