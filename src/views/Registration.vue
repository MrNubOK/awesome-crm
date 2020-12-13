<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="email"
            v-model="email"
            :class="{ invalid: $v.email.$dirty && (!$v.email.required || !$v.email.email) }"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Email - обязательное
          поле</small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Некорректный Email</small>
      </div>
      <div class="input-field">
        <input
            id="password" v-model="password"
            type="password"
            class="validate"
            :class="{ invalid: $v.password.$dirty && (!$v.password.required || !$v.password.minLength) }"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Пароль - обязательное
          поле</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Минимальная длина
          пароля - {{ $v.password.$params.minLength.min }} символов</small>
      </div>
      <div class="input-field">
        <input
            id="name" v-model="name"
            type="text"
            class="validate"
            :class="{ invalid: $v.name.$dirty && (!$v.name.required || !$v.name.minLength) }"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Name - обязательное поле</small>
        <small class="helper-text invalid" v-else-if="$v.name.$dirty && !$v.name.minLength">Минимальная длина имени - {{
          $v.name.$params.minLength.min }} символа</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
          <small class="helper-text invalid" v-if="$v.agree.$dirty && !$v.agree.checked">Согласитесь с условиями</small>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            @click.prevent="send"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators'

  export default {
    name: "Registration",
    data: () => ({
      email: '',
      password: '',
      name: '',
      agree: false
    }),
    validations: {
      email: {required, email},
      password: {required, minLength: minLength(6)},
      name: {required, minLength: minLength(3)},
      agree: {checked: v => v}
    },
    methods: {
      async send() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        const FormData = {
          email: this.email,
          password: this.password,
          name: this.name
        }

        await this.$store.dispatch('register', FormData)
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>