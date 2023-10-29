<template>
  <header class="px-6 py-2 border-b-[1px] mb-2">
    <nav class="flex justify-between flex-row items-center relative">
      <div class="logo basis-1/6 text-xl uppercase text-center font-semibold cursor-pointer">
        <router-link :to="{ name: 'Home', params: {} }" class="flex items-center">
          <img class="w-20 h-20" src="../../assets/images/logo.png" alt="" />
          <span class="ml-2">Clothes Store</span>
        </router-link>
      </div>

      <ul id="ct-top-menu"
        class="basis-5/6 hidden lg:flex lg:items-center lg:justify-end gap-8 uppercase text-sm text-gray-500">
        <li class="ct-top-menu-item" :class="pathName === '/' ? 'ct-top-menu-item-active' : ''">
          <router-link :to="{ name: 'Home', params: {} }">
            <span class="mx-2">HOME</span>
          </router-link>
        </li>
        <li class="ct-top-menu-item" :class="pathName === '/product' ? 'ct-top-menu-item-active' : ''">
          <router-link :to="{ name: 'Product', params: {} }">
            <span class="mx-2">PRODUCT</span>
          </router-link>
        </li>
        <li class="ct-top-menu-item" :class="pathName === '/about' ? 'ct-top-menu-item-active' : ''">
          <router-link :to="{ name: 'About', params: {} }">
            <span class="mx-2">ABOUT</span>
          </router-link>
        </li>
        <li>
          <form @submit.prevent="handleSearch">
            <div class="row relative">
              <div class="absolute top-[50%] -translate-y-1/2 left-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>

              <input v-model="searchText" id="name"
                class="px-8 h-full rounded-md py-3 border w-[300px] border-gray-100 text-sm focus:ring-blue-500 focus:border-blue-500"
                type="name" placeholder="Search by name product..." />
              <button @click="handleSearch"
                class="ml-2 border-r-0 rounded-tr-md rounded-br-md h-full text-sm text-black px-2 border absolute top-[50%] w -translate-y-1/2 right-0">
                Search
              </button>
            </div>
          </form>
        </li>
        <li class="ct-top-menu-cart">
          <div class="flex items-center" @click="navigateCart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

            <span class="mx-2">CART</span>
            <span class="ct-badge-circle bg-orange-400 text-white" v-if="quantityCart > 0">{{ quantityCart }}</span>
          </div>
        </li>
        <li class="ct-top-menu-profile flex gap-4">
          <div href="" class="flex items-center" v-if="!user">
            <router-link :to="{ name: 'Login', params: {} }">
              <span class="mx-2">LOGIN</span>
            </router-link>
          </div>
          <div class="flex items-center relative group" v-else>
            <span class="text-coffee-600 font-semibold" v-if="user.role === 'ADMIN'">Admin</span>
            <span class="mx-1">
              <img src="../../assets/images/user.jpg" class="w-8 h-8" alt="" />
            </span>
            <ul
              class="absolute z-20 w-[200px] bg-slate-100 rounded-md right-0 top-[100%] overflow-hidden hidden group-hover:block">
              <li v-if="user.role === 'ADMIN'" class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white">
                <router-link :to="{ name: 'Admin-receipt', params: {} }">
                  <p class="capitalize">Mangement receipt</p>
                </router-link>
              </li>
              <li v-if="user.role === 'ADMIN'" class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white">
                <router-link :to="{ name: 'Admin-product', params: {} }">
                  <p class="capitalize">Mangement products</p>
                </router-link>
              </li>
              <li class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white">
                <router-link :to="{ name: 'Profile', params: {} }">
                  <p class="capitalize">Infomation</p>
                </router-link>
              </li>

              <li class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white">
                <router-link :to="{ name: 'History-cart', params: {} }">
                  <p class="capitalize">Order History</p>
                </router-link>
              </li>
              <li @click="handleLogout" class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white">
                <p class="capitalize">Logout</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { ACCESS_TOKEN_WEB_CAFE_SHOP } from "@/utils/settingSystem";
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const searchText = ref("");
    const user = computed(() => store.state.user.user);
    const quantityCart = computed(() => {
      let count = 0;
      store.state.carts.carts.forEach((item) => {
        if (!item.ordered) count++;
      });
      return count;
    });

    const handleSearch = () => {
      router.push({
        name: "Product-search",
        query: {
          title: searchText.value,
        },
      });
    };

    watch(route, () => {
      if (!route.path.includes("search")) {
        searchText.value = "";
      }
    });

    watch(route, () => {
      const token = localStorage.getItem(ACCESS_TOKEN_WEB_CAFE_SHOP);
      if (token) {
        const { user } = jwt_decode(token);
        store.commit("user/setUser", user);
      }
    });

    watch(route, () => {
      const token = localStorage.getItem(ACCESS_TOKEN_WEB_CAFE_SHOP);
      if (token) {
        store.dispatch("carts/getCarts");
      } else {
        store.commit("carts/setCarts", []);
      }
    });

    const token = localStorage.getItem(ACCESS_TOKEN_WEB_CAFE_SHOP);
    if (token) {
      const { user } = jwt_decode(token);
      store.commit("user/setUser", user);
    }

    if (token) {
      store.dispatch("carts/getCarts");
    }

    const handleLogout = () => {
      localStorage.removeItem(ACCESS_TOKEN_WEB_CAFE_SHOP);
      store.commit("user/setUser", null);

      router.push("/login");
    };

    const navigateCart = () => {
      const { user } = store.state.user;
      if (!user) return router.push({ name: "Login" });

      router.push({
        name: "Cart",
      });
    };

    return {
      pathName: computed(() => route.path),
      searchText,
      handleSearch,
      handleLogout,
      navigateCart,
      user,
      quantityCart,
    };
  },
};
</script>

<style></style>
