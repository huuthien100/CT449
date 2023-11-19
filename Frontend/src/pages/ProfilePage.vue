<template>
  <div class="container max-w-xl mx-auto my-6" v-if="user">
    <div class="">
      <h1 class="text-center capitalize text-3xl">Your Information</h1>

      <div class="my-4 flex gap-4 items-center">
        <div class="">
          <strong class="text-base">Full Name : </strong>
          <span class="capitalize">{{ user.fullName }}</span>
        </div>

        <div class="" @click="handleEditInfo('fullName')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </div>
      </div>
      <div class="my-4 flex gap-4 items-center">
        <div class="">
          <strong class="text-base">Phone: </strong>
          <span>{{ user.phone }}</span>
        </div>
        <div class="" @click="handleEditInfo('phone')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </div>
      </div>
      <div class="my-4 flex gap-4 items-center">
        <div class="">
          <strong class="text-base">Address : </strong>
          <span class="capitalize">{{ user.address }}</span>
        </div>
        <div class="" @click="handleEditInfo('address')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </div>
      </div>

      <div class="my-4 flex gap-4 items-center">
        <div class="">
          <strong class="text-base">Email : </strong>
          <span>{{ user.email }}</span>
        </div>
        <div class="" @click="handleEditInfo('email')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authApi } from "@/api/authApi";
import { ACCESS_TOKEN_WEB_CAFE_SHOP } from "@/utils/settingSystem";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user.user);

    const handleEditInfo = async (field) => {
      let newValue = prompt("Nhập thông tin chỉnh sửa tại đây");
      if (!newValue) return;
      try {
        // Call api

        // Cần phải cập nhật lại cái accesstoken mới vì thông tin người dùng sau khi cập nhật sẽ được lưu trong access token mới
        const { user, accessToken } = await authApi.updateProfile({
          [field]: newValue,
        });

        localStorage.setItem(ACCESS_TOKEN_WEB_CAFE_SHOP, accessToken);

        // Get again data
        store.commit("user/setUser", user);
      } catch (err) {
        console.log(err);
      }
    };

    return { user, handleEditInfo };
  },
};
</script>

<style></style>
