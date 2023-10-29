<template>
  <div
    class="banner slide h-[530px] bg-banner-bg bg-cover bg-no-repeat bg-bottom mb-12"
  >
    <div
      class="w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-60"
    >
      <div class="mx-16 text-white text-center">
        <div class="uppercase mb-6">Welcome To Our Store</div>
        <div class="font-medium text-5xl mb-6 uppercase">Pizza Store</div>
        <div class="mb-6">
          We hope to bring you great book specials that will help you create
          inspiration
        </div>
        <div class="font-medium flex justify-center">
          <router-link :to="{ name: 'Product', params: {} }">
            <div
              class="bg-white w-max rounded-sm text-gray-900 px-8 py-4 tracking-wider text-xs uppercase cursor-pointer hover:opacity-90"
            >
              Explore Products
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.banner {
  background-image: url("@/assets/images/banner-pizza.png");
}
</style>
