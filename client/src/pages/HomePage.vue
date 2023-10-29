<template>
  <main class="min-h-screen">
    <Banner />
    <Subheadline title="OUR PRODUCT" />

    <Advertisement />

    <Subheadline title="more products" />

    <MoreProduct :moreProducts="moreProduct" />

    <Parallax />

    <Subheadline title="COFFEE MAGAZINE" />

    <CoffeeMegazine />
  </main>
</template>

<script>
import Banner from "@/components/Home/Banner.vue";
import Advertisement from "@/components/Home/OurProduct.vue";
import FeaturedProduct from "@/components/Home/FeaturedProduct.vue";
import MoreProduct from "@/components/Home/MoreProduct.vue";
import CoffeeMegazine from "@/components/Home/CoffeeMegazine.vue";
import Parallax from "@/components/Home/Parallax.vue";
import Subheadline from "../components/common/Subheadline.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  components: {
    Banner,
    Advertisement,
    FeaturedProduct,
    MoreProduct,
    CoffeeMegazine,
    Parallax,
    Subheadline,
  },
  setup() {
    // Hooks
    const store = useStore();

    // Actions
    store.dispatch("products/getProducts", { page: 1 });

    // Data
    const featureProduct = computed(() => {
      const data = store.state.products.products;

      return data.slice(0, 2);
    });

    const moreProduct = computed(() => {
      const data = store.state.products.products;

      return data.slice(0, 6);
    });

    const error = computed(() => {
      return store.state.products.error;
    });
    return {
      featureProduct,
      moreProduct,
      error,
    };
  },
};
</script>

<style></style>
