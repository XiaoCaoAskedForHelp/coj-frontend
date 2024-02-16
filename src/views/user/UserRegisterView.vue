<template>
  <div class="userLoginView">
    <h2 style="margin-left: 40px; margin-bottom: 16px">用户注册</h2>
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
      <a-form-item field="checkPassword" label="密码" tooltip="密码不少于8位">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码确认"
        />
      </a-form-item>
      <div style="text-align: end">
        <a-link
          style="max-width: 200px; justify-self: right"
          href="/user/login"
        >
          已有账号，去登录！
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
import {
  UserControllerService,
  UserLoginRequest,
  UserRegisterRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败!" + res?.message);
  }
};
</script>
