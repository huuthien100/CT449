<template>
  <main class="mb-8">
    <div class="mt-4">
      <div class="container mx-auto px-8 w-1/2">
        <h1 class="text-center text-2xl font-semibold uppercase">register</h1>
        <!-- Start: Form -->
        <form @submit.prevent="handleSubmit" class="mt-4">
          <div class="row flex gap-4">
            <label class="flex flex-col mb-3 basis-1/2" for="fullname">
              <span class="font-semibold">Full Name</span>
              <input v-model="fullName" id="fullname" class="px-4 py-3 rounded-lg border border-gray-100 mt-1" type="text"
                placeholder="Enter your full name" />
              <span v-if="errors.fullName" class="font-semibold text-red-500 mt-2">{{ errors.fullName }}</span>
            </label>
            <label class="flex flex-col mb-3 basis-1/2" for="phone">
              <span class="font-semibold">Phone Number</span>
              <input v-model="phone" id="phone" class="px-4 py-3 rounded-lg border border-gray-100 mt-1" type="text"
                placeholder="Enter your phone number" />
              <span v-if="errors.phone" class="font-semibold text-red-500 mt-2">{{ errors.phone }}</span>
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col mb-3" for="address">
              <span class="font-semibold">Address</span>
              <input v-model="address" id="address" class="px-4 py-3 rounded-lg border border-gray-100 mt-1" type="text"
                placeholder="Enter your address" />
              <span v-if="errors.address" class="font-semibold text-red-500 mt-2">{{ errors.address }}</span>
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col mb-3" for="email">
              <span class="font-semibold">Email Address</span>
              <input v-model="email" id="email" class="px-4 py-3 rounded-lg border border-gray-100 mt-1" type="email"
                placeholder="Enter your email address" />
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col mb-3" for="password">
              <span class="font-semibold">Password</span>
              <input v-model="password" autocomplete="on" id="password"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1" type="password"
                placeholder="Enter your password" />
              <span v-if="errors.password" class="font-semibold text-red-500 mt-2">{{ errors.password }}</span>
            </label>
          </div>
          <div class="row">
            <h1 v-if="statusResponse.message" class="text-center mb-4" :class="statusResponse.success ? 'text-green-500' : 'text-red-500'
              ">
              {{ statusResponse.message }}
            </h1>
          </div>
          <div class="row">
            <button :disabled="loading"
              class="py-3 text-center text-white bg-orange-400 font-bold rounded-lg w-full bg-primary" type="submit">
              {{ !loading ? "Sign Up" : "Loading..." }}
            </button>
          </div>
        </form>

        <div class="w-full text-center mt-6">
          <span class="">Already account?. </span>
          <span>
            <router-link :to="{ name: 'Login', params: {} }" class="text-primary font-bold">Sign In</router-link>
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { authApi } from "@/api/authApi";
import {
  validateFullName,
  validatePhone,
  validateAddress,
  validatePassword,
} from "@/utils/validateForm";

export default {
  setup() {
    const fullName = ref("");
    const phone = ref("");
    const address = ref("");
    const email = ref("");
    const password = ref("");

    const errors = ref({
      fullName: "",
      phone: "",
      address: "",
      password: "",
    });
    const loading = ref(false);
    const statusResponse = ref({
      success: false,
      message: "",
    });

    const handleSubmit = async () => {
      let data = {
        fullName: fullName.value,
        phone: phone.value,
        address: address.value,
        email: email.value,
        password: password.value,
      };

      if (
        !fullName.value ||
        !phone.value ||
        !address.value ||
        !email.value ||
        !password.value
      )
        return alert("Please full fill information");

      const errFullName = validateFullName(fullName.value);
      const errPhone = validatePhone(phone.value);
      const errAdress = validateAddress(address.value);
      const errPassword = validatePassword(password.value);
      errors.value.fullName = errFullName;
      errors.value.phone = errPhone;
      errors.value.address = errAdress;
      errors.value.password = errPassword;

      if (errFullName || errPhone || errAdress || errPassword) return;

      try {
        loading.value = true;
        const user = await authApi.register(data);

        // Info
        statusResponse.value.success = true;
        statusResponse.value.message = "Register Succesfully!";
      } catch (err) {
        console.log(err);
        statusResponse.value.success = false;
        statusResponse.value.message = err?.response?.data.message;
      }
      loading.value = false;
    };
    return {
      // Data binding
      fullName,
      phone,
      address,
      email,
      password,

      // Status
      loading,
      statusResponse,

      // Validate
      errors,

      // Func
      handleSubmit,
    };
  },
};
</script>

<style></style>
