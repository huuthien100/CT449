<template>
  <div class="coffee-maganize w-[95%] xl:w-[65%] mx-auto mb-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
      <div
        class="ct-product-card"
        v-for="product in moreProducts"
        :key="product._id"
      >
        <div
          :style="{
            'background-image': `url(${product.image})`,
          }"
          class="h-[300px] rounded-md bg-cover bg-center bg-no-repeat"
        >
          <router-link
            :to="{
              name: 'Product-detail',
              params: {
                id: product._id,
              },
            }"
          >
            <div
              class="group w-full h-full hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:duration-700 hover:ease-in-out relative"
            >
              <div
                class="absolute w-[100px] text-sm rounded-sm bg-slate-100 py-2 px-4 top-3 right-3 text-center font-semibold"
              >
                On Sale
              </div>
              <div
                class="ct-button bg-slate-100 absolute hidden group-hover:block group-hover:animate-fadeIn bottom-3 w-[90%] left-1/2 -translate-x-1/2 text-center"
              >
                EXPLORE DETAIL
              </div>
            </div>
          </router-link>
        </div>

        <div class="text-center mt-6">
          <router-link
            :to="{
              name: 'Product-detail',
              params: {
                id: product._id,
              },
            }"
          >
            <p
              class="text-center text-base hover:text-coffee-400 font-semibold mb-3 truncate"
            >
              {{ product.title }}
            </p>
          </router-link>
        </div>
        <div class="text-center">
          <span class="text-base text-coffee-600">
            {{ product.price.S.toLocaleString() }} VND</span
          >
          <span class="ml-2 text-gray-400 line-through">
            {{ (product.price.S * 3).toLocaleString() }} VND</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["moreProducts"],
  setup({ moreProducts }, context) {
    return {};
  },
};
</script>

<style></style>
