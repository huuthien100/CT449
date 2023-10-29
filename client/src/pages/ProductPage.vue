<template>
  <div class="container mx-auto my-4" v-if="products.length > 0">
    <!-- Title -->
    <h1 class="text-xl font-semibold">All Products</h1>

    <!-- Filter -->
    <form action="" class="flex gap-4 items-center mb-4 mt-2">
      <div class="row flex items-center gap-2">
        <span>Price: </span>
        <select
          :value="priceRef"
          @change="onSortPrice($event)"
          class="bg-gray-50 border-gray-800 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value="1">Increase</option>
          <option value="-1">Decrease</option>
        </select>
        <!-- Dropdown menu -->
      </div>
      <div class="row flex items-center gap-2">
        <span>Version: </span>
        <select
          :value="versionRef"
          @change="onSortVersion($event)"
          class="bg-gray-50 border-gray-800 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value="-1">New</option>
          <option value="1">Old</option>
        </select>
        <!-- Dropdown menu -->
      </div>
    </form>
    <!-- Product -->
    <div class="grid grid-cols-5 gap-4" v-if="products.length > 0">
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
  <div class="my-8 text-center" v-else>No Products</div>
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
    const priceRef = ref(route.query.price || 1); // Default increase price
    const versionRef = ref(route.query.createdAt || -1);
    // Actions
    store.dispatch("products/getProducts", {
      // Page
      page: currentPage.value,
      // Handle sort when user had in url
      sort: {
        price: route.query.price || null,
        createdAt: route.query.createdAt || null,
      },
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

      if (currentPage.value === maxPage) return;
      // Increase Page
      currentPage.value++;
      // Navigate query
      router.push({
        name: "Product",
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
        name: "Product",
        query: {
          ...route.query,
          page: currentPage.value,
        },
      });
    };

    const onSortPrice = (e) => {
      const value = e.target.value;
      if (value) {
        // Redirect to page 1
        currentPage.value = 1;

        // Set value
        priceRef.value = value;

        // Navigate
        router.push({
          name: "Product",
          query: {
            ...route.query,
            price: value,
            page: 1,
          },
        });
      }
    };

    const onSortVersion = (e) => {
      const value = e.target.value;

      if (value) {
        // Redirect to page 1
        currentPage.value = 1;

        // Set value
        versionRef.value = value;

        // Navigate
        router.push({
          name: "Product",
          query: {
            ...route.query,
            createdAt: value,
            page: 1,
          },
        });
      }
    };
    // Listen when page change
    watch(route, () => {
      // Get data
      store.dispatch("products/getProducts", {
        page: route.query.page,
        sort: {
          price: route.query.price || null,
          createdAt: route.query.createdAt || null,
        },
      });
    });

    return {
      // Date
      products,
      pagination,

      // Ref
      currentPage,
      priceRef,
      versionRef,

      // Func
      nextPage,
      prevPage,

      onSortPrice,
      onSortVersion,
    };
  },
};
</script>

<style></style>
