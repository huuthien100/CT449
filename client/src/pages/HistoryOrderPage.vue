<template>
  <div class="container max-w-4xl mx-auto my-6" v-if="user">
    <h1 class="text-center capitalize text-3xl">Order History</h1>
    <!-- Start: Render cart -->
    <div
      class="flex justify-between w-full my-4"
      v-for="cart in carts"
      :key="cart._id"
    >
      <!-- Info -->
      <div class="flex gap-4">
        <div class="w-[100px] h-[100px] rounded-md overflow-hidden">
          <img
            class="w-full h-full object-cover"
            :src="cart.product.image"
            alt=""
          />
        </div>

        <div class="">
          <h1 class="text-base font-semibold">{{ cart.product.title }}</h1>
          <p class="text-coffee-600 text-sm my-2">
            <span class="text-gray-600">Quantity : </span> {{ cart.quantity }}
          </p>
          <p class="text-coffee-600 text-sm my-2">
            <span class="text-gray-600">Size : </span> {{ cart.size }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-base text-red-500">
          {{ cart.price.toLocaleString() }} VND
        </p>
        <!-- Action -->
      </div>
    </div>
    <!-- Start: Render when not product -->
    <div class="my-4" v-if="carts.length === 0">
      <h1 class="text-center text-xl">You don't have product</h1>
      <router-link :to="{ name: 'Product' }" class="text-center">
        <p class="text-center hover:underline text-blue-700 my-2">
          Watch Product
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  setup() {
    // Hooks
    const store = useStore();

    const carts = computed(() => store.getters["carts/cartOrdered"]);
    const user = computed(() => store.state.user.user);

    return {
      carts,
      user,
    };
  },
};
</script>

<style></style>
