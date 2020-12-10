<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{ invalid: $v.email.$dirty && (!$v.email.required || !$v.email.email) }"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">
          Поле Email не должно быть пустым
        </small>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.email">
          Некорректный Email
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{ invalid: $v.password.$dirty && (!$v.password.required || !$v.password.minLength) }"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.password.required">Пароль - обязательное поле</small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.password.minLength">
          Минимальная длина - {{ $v.password.$params.minLength.min }} символов
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit" @click.prevent="submitHandler">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/registration">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'
    import messages from "../utils/messages";

    export default {
        name: "Login",
        data: () => ({
            email: '',
            password: ''
        }),
        validations: {
            email: {email,required},
            password: {required, minLength: minLength(8)}
        },
        mounted() {
            if (messages[this.$route.query.message]) {
                this.$message(messages[this.$route.query.message])
            }
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                  this.$v.$touch()
                  return
                }
                const FormData = {
                  email: this.email,
                  password: this.password
                }
                console.log(FormData)
                try {
                    await this.$store.dispatch('login', FormData)
                    await this.$router.push('/')
                } catch (e) {
                    throw e
                }

            },
        },
    }
</script>

<style scoped>

</style>