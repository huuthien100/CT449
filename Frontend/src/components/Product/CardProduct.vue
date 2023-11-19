<template>
  <div class="card">
    <div class="cursor-pointer w-full h-full relative group">
      <div
        class="hover:transition-all hover:duration-700 hover:ease-in-out relative"
      >
        <div
          class="absolute w-full h-full bg-black bg-opacity-10 group-hover:block hidden"
        ></div>
        <img
          class="rounded-md w-full h-[150px] object-cover"
          :src="product.image"
          alt=""
        />
      </div>

      <div class="mt-2">
        <p class="text-base hover:text-coffee-400 font-semibold truncate">
          {{ product.title }}
        </p>
      </div>
      <div class="my-2">
        <span class="text-lg text-coffee-600 capitalize">Price:</span>
        <span class="ml-2 text-black font-semibold"
          >{{ product.price.S.toLocaleString() }} VND</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  setup({ product }, context) {
    return {};
  },
};
</script>

<style></style>
