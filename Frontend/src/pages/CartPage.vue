<template>
  <div class="container max-w-4xl mx-auto my-6" v-if="user">
    <h1 class="text-center capitalize text-3xl">Your Cart</h1>
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
        <div class="flex gap-2 items-center">
          <button
            :disabled="loading"
            @click="
              handleQuantityChange({
                idCart: cart._id,
                quantity: cart.quantity + 1,
              })
            "
            class="border-[1px] py-0.5 px-2 rounded-sm"
          >
            {{ loading ? "..." : "+" }}
          </button>
          <span class="">{{ cart.quantity }}</span>
          <button
            :disabled="loading"
            @click="
              handleQuantityChange({
                idCart: cart._id,
                quantity: cart.quantity - 1,
              })
            "
            class="border-[1px] py-0.5 px-2 rounded-sm"
          >
            {{ loading ? "..." : "-" }}
          </button>
        </div>
        <div
          @click="handleDeleteCart(cart._id)"
          class="p-1 bg-red-500 hover:opacity-80 cursor-pointer rounded-sm text-white"
        >
          <p class="text-center text-sm">Delete</p>
        </div>
      </div>
    </div>
    <!-- Start: Render when not product -->
    <div class="my-4" v-if="carts.length === 0">
      <h1 class="text-center text-xl">Your cart is empty!</h1>
      <router-link :to="{ name: 'Product' }" class="text-center">
        <p class="text-center hover:underline capitalize text-blue-700 my-2">
          Buy product
        </p>
      </router-link>
    </div>

    <!-- Start: Order -->
    <div class="" v-if="carts.length > 0">
      <button
        :disabled="isPendingSubmiting"
        @click="handleOrder"
        class="w-full bg-blue-800 hover:opacity-80 capitalize p-3 rounded-md text-white"
      >
        {{ !isPendingSubmiting ? "Order" : "Loading..." }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { ref } from "vue";
import { cartApi } from "@/api/cartApi";
import { receiptApi } from "@/api/receiptApi";

export default {
  setup() {
    // Hooks
    const store = useStore();

    // Handle get cart for user in component Header

    // Ref
    const loading = ref(false);
    const isPendingSubmiting = ref(false);

    const carts = computed(() => store.getters["carts/cartOrdering"]);
    const user = computed(() => store.state.user.user);

    // Function global
    const handleQuantityChange = async (data) => {
      // data = {idCart:"",quantity:""}
      if (data.quantity === 0) return;
      // Submit data
      loading.value = true;
      try {
        // Call api
        await cartApi.editCart(data);
        // Update data in vuex store
        store.dispatch("carts/getCarts");
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };

    const handleDeleteCart = async (idCart) => {
      if (window.confirm("Remove this product in cart?")) {
        loading.value = true;
        try {
          // Call api
          await cartApi.deleteCart(idCart);
          // Update data in vuex store
          store.dispatch("carts/getCarts");
        } catch (err) {
          console.log(err);
        }
        loading.value = false;
      }
    };

    const handleOrder = async () => {
      if (window.confirm("You confirm order?")) {
        isPendingSubmiting.value = true;
        try {
          // Call api order
          await cartApi.order();

          // Call api add receipt
          await receiptApi.addReceipt({ carts: carts.value });

          // Update data in vuex store
          store.dispatch("carts/getCarts");
        } catch (err) {
          console.log(err);
        }
        isPendingSubmiting.value = false;
      }
    };

    return {
      carts,
      user,
      loading,
      isPendingSubmiting,
      handleQuantityChange,
      handleDeleteCart,
      handleOrder,
    };
  },
};
</script>

<style></style>
