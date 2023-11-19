<template>
  <main class="mb-8">
    <div class="mt-4">
      <div class="container mx-auto px-8 w-1/2">
        <h1 class="text-center text-2xl font-semibold uppercase">Login</h1>
        <!-- Start: Form -->
        <form @submit.prevent="handleSubmit" class="mt-4">
          <div class="row">
            <label class="flex flex-col mb-3" for="email">
              <span class="font-semibold">Email Address</span>
              <input
                v-model="email"
                id="email"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
                type="email"
                placeholder="abc@gmail.com"
              />
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col mb-3" for="password">
              <span class="font-semibold">Password</span>
              <input
                v-model="password"
                autocomplete="on"
                id="password"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
                type="password"
                placeholder="Enter your password..."
              />
            </label>
          </div>
          <div class="row">
            <!-- Start: Error -->
            <h1
              v-if="statusResponse.message"
              class="text-center mb-4"
              :class="
                statusResponse.success ? 'text-green-500' : 'text-red-500'
              "
            >
              {{ statusResponse.message }}
            </h1>
          </div>
          <!-- Start: Submit -->
          <div class="row">
            <div class="row">
              <button
                :disabled="loading"
                class="py-3 text-center text-white bg-orange-400 font-bold rounded-lg w-full bg-primary"
                type="submit"
              >
                {{ !loading ? "Sign In" : "Loading..." }}
              </button>
            </div>
          </div>
        </form>

        <!-- Start: Direction -->
        <div class="w-full text-center mt-6">
          <span class="">I'm a new user. </span>
          <span>
            <router-link
              :to="{ name: 'Register', params: {} }"
              class="text-primary font-bold"
              >Sign Up</router-link
            >
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { authApi } from "@/api/authApi";
import { useRouter } from "vue-router";
import { ACCESS_TOKEN_WEB_CAFE_SHOP } from "@/utils/settingSystem";

export default {
  setup() {
    // Hooks
    const router = useRouter();
    // Data
    const email = ref("");
    const password = ref("");

    // Status before call api
    const loading = ref(false);
    // status after calling api
    const statusResponse = ref({
      success: false,
      message: "",
    });

    // Func global
    const handleSubmit = async () => {
      // Data
      let data = {
        email: email.value,
        password: password.value,
      };

      // Simple validate
      if (!email.value || !password.value)
        return alert("Vui lòng nhập đầy đủ thông tin");

      // Submit data
      try {
        loading.value = true;
        // Call api
        const { accessToken } = await authApi.login(data);

        // Save accessToken to localStorage
        localStorage.setItem(ACCESS_TOKEN_WEB_CAFE_SHOP, accessToken);

        // Navigate to home page
        router.push({ name: "Home" });

        // Info
        statusResponse.value.success = true;
        statusResponse.value.message = "Đăng nhập thành công";
      } catch (err) {
        console.log(err);
        statusResponse.value.success = false;
        statusResponse.value.message = err?.response?.data.message;
      }
      loading.value = false;
    };
    return {
      // Data binding
      email,
      password,

      // Status
      loading,
      statusResponse,

      // Func
      handleSubmit,
    };
  },
};
</script>

<style></style>
