<template>
  <div class="userLoginView">
    <h2 style="margin-left: 40px; margin-bottom: 16px">用户登录</h2>
    <a-form
      :model="form"
      :style="{ width: '600px' }"
      label-align="left"
      auto-label-width
      @submit="handleSubmit()"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账户" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码" tooltip="密码不少于8位">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <div style="text-align: end">
        <a-link
          style="max-width: 200px; justify-self: right"
          href="/user/register"
        >
          未有账号，去注册！
        </a-link>
      </div>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 120px; margin-top: 16px; margin-left: 200px"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";

const router = useRouter();
const route = useRoute();

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    store.commit("user/updateUser");
    // redirect到想要访问的页面
    const redirect = route.query.redirect as string;
    router.push({
      path: redirect && redirect !== "" ? redirect : "/",
      replace: true,
    });
  } else {
    message.error("登录失败!" + res?.message);
  }
};
</script>
