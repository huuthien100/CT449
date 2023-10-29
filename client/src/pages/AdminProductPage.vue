<template>
  <main class="mb-8">
    <div class="mt-4">
      <div class="container mx-auto px-8">
        <h1 class="text-center text-2xl font-semibold capitalize">
          Management products
        </h1>

        <!-- Start: Simple navbar -->
        <div class="flex justify-center my-4">
          <ul class="flex gap-4">
            <li
              class="bg-coffee-400 text-white capitalize px-4 py-1 rounded-md text-sm"
            >
              <span>All Product</span>
            </li>
          </ul>
        </div>

        <!-- Start: All products-->
        <div class="grid grid-cols-5 gap-4" v-if="products.length > 0">
          <div class="" v-for="product in products" :key="product._id">
            <CardAction
              :product="product"
              @toggle-modal="toggleModal"
              @delete-product="handleDelete"
            />
          </div>
        </div>
      </div>

      <!-- Start: Button add product -->
      <button
        @click="toggleModal(null)"
        class="fixed bottom-4 right-4 text-white bg-indigo-500 shadow-lg shadow-indigo-500/50 p-3 rounded-full"
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
            d="M12 6v12m6-6H6"
          />
        </svg>
      </button>

      <!-- Start: Pagination -->
      <div
        class="flex justify-center gap-4 items-center mt-4 relative"
        v-if="pagination"
      >
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            @click="prevPage()"
            class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span class="sr-only">Previous</span>
            <!-- Heroicon name: mini/chevron-left -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <button
            class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
          >
            {{ currentPage }}
          </button>
          <button
            @click="nextPage(pagination)"
            class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span class="sr-only">Next</span>
            <!-- Heroicon name: mini/chevron-right -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
        <div
          class="right-[40%] rounded-md z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
        >
          {{ currentPage }} /
          {{ Math.ceil(pagination.total / pagination.limit) }}
        </div>
      </div>

      <!-- Start: Modal -->

      <div
        v-if="isOpen"
        class="fixed top-0 z-50 left-0 right-0 bottom-0 bg-opacity-75 bg-black"
      >
        <div class="flex justify-center flex-col w-full h-full items-center">
          <div class="w-[500px] bg-white rounded-sm">
            <div class="flex items-end justify-end m-2">
              <button
                @click="toggleModal(null)"
                class="relative p-1 text-white rounded-sm bg-red-500 hover:opacity-75 right-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="">
              <FormAction :type="type" :productEdit="productEdit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CardProduct from "@/components/Product/CardProduct.vue";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import FormAction from "@/components/Admin/FormAction.vue";
import CardAction from "@/components/Admin/CardAction.vue";
import { productsApi } from "@/api/productsApi";
export default {
  setup() {
    // Hooks
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // Ref
    const currentPage = ref(Number(route.query.page) || 1);
    const isOpen = ref(false);
    const productEdit = ref(null);
    const type = ref("");

    // Actions
    store.dispatch("products/getProducts", {
      // Page
      page: currentPage.value,
    });
    // Data
    const products = computed(() => {
      return store.state.products.products;
    });

    const pagination = computed(() => {
      return store.state.products.pagination;
    });
    // Func global
    const nextPage = (pagination) => {
      const maxPage = Math.ceil(pagination.total / pagination.limit);

      if (Number(currentPage.value) === maxPage) return;
      // Increase Page
      currentPage.value++;
      // Navigate query
      router.push({
        name: "Admin-product",
        query: {
          ...route.query,
          page: currentPage.value,
        },
      });
    };
    const prevPage = () => {
      if (Number(currentPage.value) === 1) return;
      // Decrease Page
      currentPage.value--;
      // Navigate query
      router.push({
        name: "Admin-product",
        query: {
          ...route.query,
          page: currentPage.value,
        },
      });
    };
    const toggleModal = (product) => {
      isOpen.value = !isOpen.value;
      if (product) {
        type.value = "edit";
        productEdit.value = product;
      } else {
        type.value = "add";
        productEdit.value = null;
      }
    };
    const handleDelete = async (idProduct) => {
      // Submit data
      try {
        if (window.confirm("You confirm delete product?")) {
          // Call api
          await productsApi.deleteProduct(idProduct);
          alert("Delete successfully");
        }

        // Get data
        store.dispatch("products/getProducts", {
          // Page
          page: Number(route.query.page) || 1,
        });
      } catch (err) {
        console.log(err);
      }
    };

    // Listen when page change
    watch(route, () => {
      store.dispatch("products/getProducts", {
        page: currentPage.value,
      });
    });
    return {
      // Data
      products,
      pagination,

      // Ref
      currentPage,
      isOpen,
      productEdit,
      type,

      // Func
      nextPage,
      prevPage,
      toggleModal,
      handleDelete,
    };
  },
  components: { CardProduct, FormAction, CardAction },
};
</script>

<style></style>
