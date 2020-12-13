<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form>
        <div class="input-field">
          <select ref="select" v-model="categoryId">
            <option v-for="category of this.categories"
                    :key="category.id"
                    :value="category.id">
              {{category.title}}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text"
                 id="name" v-model="title"
                 :class="{invalid: this.$v.title.$dirty && !this.$v.title.required}">
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="this.$v.title.$dirty && !this.$v.title.required">Это обязательное поле</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              :class="{invalid: this.$v.limit.$dirty && !this.$v.limit.minValue}"
              v-model="limit"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="this.$v.limit.$dirty && !this.$v.limit.minValue">
            Минимальное значение - {{ this.$v.limit.$params.minValue.min }} руб
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit" @click.prevent="update">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators'

  export default {
    name: "EditCategory",
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      select: null,
      categoryId: null,
      title: '',
      limit: 100
    }),
    validations: {
      title: {required},
      limit: {minValue: minValue(100)},
    },
    watch: {
      categoryId(value) {
        const {id, title, limit} = this.categories.find(c => c.id === value)
        this.categoryId = id
        this.title = title
        this.limit = limit
      }
    },
    created() {
      const {id, title, limit} = this.categories[0]
      this.categoryId = id
      this.title = title
      this.limit = limit
    },
    mounted() {
      M.updateTextFields()
      this.select = M.FormSelect.init(this.$refs.select)
    },
    methods: {
      async update() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        try {
          const categoryData = {
            id: this.categoryId,
            title: this.title,
            limit: this.limit
          }

          await this.$store.dispatch('updateCategory', categoryData)
          this.$message('Категория успешно обновлена')
          this.$emit('updated', categoryData)
        } catch (e) {
          throw e
        }
      }
    },
    beforeDestroy() {
      if (this.select && this.select.destroy) {
        this.select.destroy
      }
    }
  }
</script>

<style scoped>

</style>