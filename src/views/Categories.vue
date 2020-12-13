<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CreateCategory
            @created-new="addNewCategory"
        />
        <EditCategory
            v-if="categories.length"
            :categories="categories"
            @updated="updateCategoryList"
            :key="categories.length + updateCount"
        />
        <p class="center" v-else>Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
  import CreateCategory from "../components/categories/CreateCategory";
  import EditCategory from "../components/categories/EditCategory";

  export default {
    name: "Categories",
    data: () => ({
      categories: [],
      loading: true,
      updateCount: 0
    }),
    components: {
      CreateCategory,
      EditCategory
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
    },
    methods: {
      addNewCategory(category) {
        this.categories.push(category)
      },
      updateCategoryList(updatedData) {
        const id = this.categories.findIndex(c => c.id === updatedData.id)
        this.categories[id].title = updatedData.title
        this.categories[id].limit = updatedData.limit
        this.updateCount++
      }
    }
  }
</script>

<style scoped>

</style>