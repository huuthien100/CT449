<template>
  <div class="featured-mugs w-[95%] lg:w-[65%] mx-auto mb-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 px-12 gap-8 lg:gap-4">
      <div
        class="ct-product-card"
        v-for="product in featureProduct"
        :key="product._id"
      >
        <div
          :style="{
            'background-image': `url(${product.image})`,
          }"
          class="h-[300px] sm:h-[300px] rounded-md bg-cover bg-center bg-no-repeat"
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
                class="ct-button bg-slate-100 absolute hidden group-hover:block group-hover:animate-fadeIn bottom-3 w-[90%] left-1/2 -translate-x-1/2 text-center"
              >
                Watch detail
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
              class="text-center text-xl hover:text-coffee-400 font-semibold mb-3"
            >
              {{ product.title }}
            </p>
          </router-link>
        </div>
        <div class="text-center">
          <span class="ml-2 text-coffee-400"
            >{{ product.price.S.toLocaleString() }} VND</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["featureProduct"],
  setup({ featureProduct }, context) {
    return {};
  },
};
</script>

<style></style>
