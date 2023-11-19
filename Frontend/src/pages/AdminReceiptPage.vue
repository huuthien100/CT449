<template>
  <main class="mb-8">
    <div class="mt-4">
      <div class="container max-w-4xl mx-auto px-8">
        <h1 class="text-center text-2xl font-semibold capitalize">
          Management Receipt
        </h1>
        <div class="p-2 border rounded-md mt-4" v-for="receipt in receipts" :key="receipt._id">
          <div class="border-b">
            <h1 class="font-semibold pb-2">
              <span class="text-gray-500">Full Name:</span>
              {{ receipt.user.fullName }}
            </h1>
            <h1 class="font-semibold pb-2">
              <span class="text-gray-500">Address:</span>
              {{ receipt.user.address }}
            </h1>
            <h1 class="font-semibold pb-2">
              <span class="text-gray-500">Phone:</span>
              {{ receipt.user.phone }}
            </h1>
          </div>
          <div class="flex justify-between w-full my-4" v-for="cart in receipt.carts" :key="cart._id">
            <div class="flex gap-4">
              <div class="w-[100px] h-[100px] rounded-md overflow-hidden">
                <img class="w-full h-full object-cover" :src="cart.product.image" alt="" />
              </div>

              <div class="">
                <h1 class="text-base font-semibold">
                  {{ cart.product.title }}
                </h1>
                <p class="text-coffee-600 text-sm my-2">
                  <span class="text-gray-600">Quantity : </span>
                  {{ cart.quantity }}
                </p>
                <p class="text-coffee-600 text-sm my-2">
                  <span class="text-gray-600">Size : </span> {{ cart.size }}
                </p>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-base text-red-500">
                {{ (cart.price * cart.quantity).toLocaleString() }} VND
              </p>
            </div>
          </div>

          <div class="py-4 text-end">
            <p class="text-base text-red-500">
              Total Price: {{ calculateTotalPrice(receipt).toLocaleString() }} VND
            </p>
          </div>

          <div class="border-t py-4">
            <div class="">
              <button @click="handleConfirm(receipt._id)" :style="{ background: `${receipt.checked ? '#ccc' : ''}` }"
                :disabled="loading || receipt.checked"
                class="bg-green-500 px-4 py-1 text-sm text-white rounded-sm mr-4 hover:opacity-80">
                {{ !loading ? "Confirm" : "Loading..." }}
              </button>
              <button @click="handleDelete(receipt._id)" :disabled="loading"
                class="bg-red-500 px-4 py-1 text-sm text-white rounded-sm hover:opacity-80">
                {{ !loading ? "Delete" : "Loading..." }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { receiptApi } from "@/api/receiptApi";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ref } from "vue";
import { cartApi } from "@/api/cartApi";

export default {
  setup() {
    const store = useStore();
    const loading = ref(false);
    const receipts = computed(() => store.state.receipts.receipts);

    store.dispatch("receipts/getReceipts");

    const calculateTotalPrice = (receipt) => {
      return receipt.carts.reduce((total, cart) => total + cart.price * cart.quantity, 0);
    };

    const handleConfirm = async (idReceipt) => {
      try {
        loading.value = true;
        if (window.confirm("Are you sure you want to confirm this order?")) {
          await receiptApi.confirmReceipt(idReceipt);
          store.dispatch("receipts/getReceipts");
          alert("Order confirmation successful");
        }
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const handleDelete = async (idReceipt) => {
      try {
        loading.value = true;
        if (window.confirm("Are you sure you want to delete this order?")) {
          const receipt = receipts.value.find((r) => r._id === idReceipt);

          for (const cart of receipt.carts) {
            await cartApi.deleteCart(cart._id);
          }

          await receiptApi.deleteReceipt(idReceipt);

          store.dispatch("receipts/getReceipts");

          alert("Deletion successful");
        }
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      receipts,
      loading,
      handleConfirm,
      handleDelete,
      calculateTotalPrice,
    };
  },
  components: {},
};
</script>

<style></style>