<template>
  <div class="container mx-auto my-8" v-if="product">
    <h1 class="text-4xl font-semibold uppercase text-coffee-400">
      {{ product.title }}
    </h1>
    <div class="flex gap-4 mt-6 items-center">
      <div class="w-[20%] h-[300px]">
        <img
          class="rounded-md w-full h-full object-cover"
          :src="product.image"
          alt=""
        />
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div class="">
          <p class="leading-10">
            {{ product.description }}
          </p>
          <div class="flex mb-2 gap-2 items-center mt-2">
            <span class="">Size: </span>
            <div class="flex gap-2">
              <button
                @click="onSizeClick(s)"
                v-for="s in product.size"
                :key="s"
                :style="{ 'border-color': size === s ? 'red' : '' }"
                class="border px-2 py-1 hover:opacity-75 rounded-md"
              >
                {{ s }}
              </button>
            </div>
          </div>
          <div class="flex mb-2 gap-2 items-center mt-4">
            <span class="">Price: </span>
            <span class="font-semibold">
              {{ (product.price[size] * quantity).toLocaleString() }}
              VND</span
            >
          </div>
          <div class="flex mb-2 gap-2 items-center mt-4">
            <div class="">
              <span class="">Quantity: </span>
              <span class="font-semibold">{{ quantity }}</span>
            </div>
            <div class="flex gap-2">
              <button
                @click="onQuantityChange('increase')"
                class="border-[1px] py-1 px-2 rounded-md font-semibold"
              >
                +
              </button>
              <button
                @click="onQuantityChange('decrease')"
                class="border-[1px] py-1 px-2 rounded-md font-semibold"
              >
                -
              </button>
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <button
            :disabled="loading"
            @click="
              handleAddToCart({
                product,
                size,
                quantity,
                price: product.price[size] * quantity,
              })
            "
            class="bg-slate-100 capitalize hover:opacity-90 flex gap-4 p-4 rounded-md mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            Add to cart
          </button>
          <router-link :to="{ name: 'Cart' }">
            <button
              class="bg-red-500 capitalize hover:opacity-90 text-white flex gap-4 p-4 rounded-md mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              Buy Now
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardProduct from "@/components/Product/CardProduct.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "@vue/reactivity";
import { cartApi } from "@/api/cartApi";
export default {
  components: { CardProduct },
  setup() {
    // Hooks
    const store = useStore();
    const route = useRoute();

    // Ref
    const size = ref("S"); // "S", "M" , "L"
    const quantity = ref(1);

    // Status before call api
    const loading = ref(false);

    // Actions
    store.dispatch("products/getProductDetail", { id: route.params.id });

    // Data
    const productDetail = computed(() => store.state.products.productDetail);

    // Function global
    const onSizeClick = (sizeParam) => {
      size.value = sizeParam;
    };

    const onQuantityChange = (type) => {
      if (type === "increase") quantity.value++;
      else {
        if (quantity.value > 1) quantity.value--;
      }
    };

    // Submit
    const handleAddToCart = async (data) => {
      // Submit data
      loading.value = true;
      try {
        // Call api
        await cartApi.addToCart(data);

        // Update data in vuex store
        store.dispatch("carts/getCarts");

        alert("Add to cart successfully");
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };

    return {
      product: productDetail,
      size,
      quantity,
      onSizeClick,
      onQuantityChange,
      handleAddToCart,
      loading,
    };
  },
};
</script>

<style></style>
