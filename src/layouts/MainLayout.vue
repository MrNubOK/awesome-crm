<template>
  <div class="app-main-layout">
    <Navbar @open-navbar="isOpenSidebar = !isOpenSidebar" />

    <Sidebar v-if="isOpenSidebar" v-model="isOpenSidebar" />

    <main class="app-content" :class="{ full: !isOpenSidebar }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
    import Navbar from "@/components/app/Navbar";
    import Sidebar from "@/components/app/Sidebar";

    export default {
        name: "MainLayout",
        data: () => ({
            isOpenSidebar: false
        }),
        components: {
            Navbar,
            Sidebar
        }
    }
</script>

<style scoped>

</style>