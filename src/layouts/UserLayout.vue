<template>
  <div id="userLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <a-space>
          <img src="@/assets/oj-logo.svg" class="logo" />
          <div class="title">c oj</div>
        </a-space>
        <div style="letter-spacing: 5px">全球最好的oj判题系统</div>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a-link href="https://github.com/XiaoCaoAskedForHelp" icon>
          OJ project ©2024 Created by Amos
        </a-link>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup></script>

<style scoped>
#userLayout {
  text-align: center;
}

#userLayout .logo {
  width: 128px;
  height: 128px;
  margin-right: 8px;
}

#userLayout .title {
  font-size: 50px;
  font-weight: bold;
  color: #1890ff;
}

#userLayout .header {
  margin-top: 16px;
  margin-bottom: 16px;
}

#userLayout .content {
  padding: 20px;
  margin: 20px auto;
}

#userLayout .footer {
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
