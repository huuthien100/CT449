<template>
  <main class="mb-8">
    <div class="mt-4">
      <div class="container max-w-4xl mx-auto px-8">
        <h1 class="text-center text-2xl font-semibold capitalize">
          Management Receipt Order
        </h1>
        <div
          class="p-2 border rounded-md mt-4"
          v-for="receipt in receipts"
          :key="receipt._id"
        >
          <!-- Info -->
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
          <div
            class="flex justify-between w-full my-4"
            v-for="cart in receipt.carts"
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
                {{ cart.price.toLocaleString() }} VND
              </p>
            </div>
          </div>
          <!-- Action -->
          <div class="border-t py-4">
            <div class="">
              <button
                @click="handleConfirm(receipt._id)"
                :style="{ background: `${receipt.checked ? '#ccc' : ''}` }"
                :disabled="loading || receipt.checked"
                class="bg-green-500 px-4 py-1 text-sm text-white rounded-sm mr-4 hover:opacity-80"
              >
                {{ !loading ? "Confirm" : "Loading..." }}
              </button>
              <button
                @click="handleDelete(receipt._id)"
                :disabled="loading"
                class="bg-red-500 px-4 py-1 text-sm text-white rounded-sm hover:opacity-80"
              >
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
export default {
  setup() {
    // Hooks
    const store = useStore();

    // Ref
    const loading = ref(false);

    // Data
    const receipts = computed(() => store.state.receipts.receipts);

    // Actions
    store.dispatch("receipts/getReceipts");

    // Func global
    const handleConfirm = async (idReceipt) => {
      // Submit data
      try {
        loading.value = true;
        if (window.confirm("Bạn chắc chắn xác nhận đơn hàng này?")) {
          // Call api
          await receiptApi.confirmReceipt(idReceipt);

          // Get again data
          store.dispatch("receipts/getReceipts");

          alert("Xác nhận đơn hàng thành công");
        }
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };

    const handleDelete = async (idReceipt) => {
      // Submit data
      try {
        loading.value = true;
        if (window.confirm("You confirm delete cart?")) {
          // Call api
          await receiptApi.deleteReceipt(idReceipt);

          // Get again data
          store.dispatch("receipts/getReceipts");

          alert("Delete successfully");
        }
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };

    return {
      // Data
      receipts,

      loading,

      // Func
      handleConfirm,
      handleDelete,
    };
  },
  components: {},
};
</script>

<style></style>
