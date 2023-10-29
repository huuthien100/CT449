<template>
  <div class="container mx-auto my-4" v-if="products.length > 0">
    <!-- Title -->
    <h1 class="text-xl font-semibold">Results</h1>

    <!-- Product -->
    <div class="grid grid-cols-5 gap-4 mt-4">
      <div class="" v-for="product in products" :key="product._id">
        <router-link
          :to="{
            name: 'Product-detail',
            params: {
              id: product._id,
            },
          }"
        >
          <CardProduct :product="product" />
        </router-link>
      </div>
    </div>

    <!-- Pagination -->
    <div
      class="flex justify-center gap-4 items-center mt-4 relative"
      v-if="pagination"
    >
      <nav
        class="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          @click="prevPage(pagination)"
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
        {{ currentPage }} / {{ Math.ceil(pagination.total / pagination.limit) }}
      </div>
    </div>
  </div>
  <div class="my-8" v-else>
    <h1 class="text-center text-2xl">Product not found!</h1>
  </div>
</template>

<script>
import CardProduct from "@/components/Product/CardProduct.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  components: { CardProduct },
  setup() {
    // Hooks
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // Ref
    const currentPage = ref(Number(route.query.page) || 1);
    const searchText = ref(route.query.title || "");

    // Actions
    store.dispatch("products/searchProduct", {
      page: currentPage.value,
      title: searchText.value,
    });

    // Data
    const products = computed(() => {
      return store.state.products.searchProducts;
    });

    const pagination = computed(() => {
      return store.state.products.paginationSearch;
    });
    // Func global
    const nextPage = (pagination) => {
      const maxPage = Math.ceil(pagination.total / pagination.limit);
      if (Number(currentPage.value) === maxPage) return;
      // Increase Page
      currentPage.value++;
      // Navigate query
      router.push({
        name: "Product-search",
        query: {
          ...route.query,
          page: currentPage.value,
        },
      });
    };
    const prevPage = (pagination) => {
      if (currentPage.value === 1) return;
      // Decrease Page
      currentPage.value--;
      // Navigate query
      router.push({
        name: "Product-search",
        query: {
          ...route.query,
          page: currentPage.value,
        },
      });
    };

    // Listen when page change
    watch(currentPage, () => {
      store.dispatch("products/searchProduct", {
        page: currentPage.value,
        title: route.query.title,
      });
    });

    watch(route, () => {
      store.dispatch("products/searchProduct", {
        page: currentPage.value,
        title: route.query.title,
      });
    });

    return {
      products,
      pagination,
      currentPage,
      searchText,
      nextPage,
      prevPage,
    };
  },
};
</script>

<style></style>
