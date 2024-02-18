<template>
  <div id="basicLayout">
    <a-layout style="height: 400px; min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
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

<script setup>
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  padding: 20px;
}

#basicLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background-color: #fff;
}
</style>
