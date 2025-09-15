
<template>
  <el-container style="min-height:100vh;">
    <el-header>
      <HeaderBar />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue'
</script>

<style>
:root {
  --app-max-width: 1100px;
}
.el-main {
  display: flex;
  justify-content: center;
  padding: 24px;
}
.el-header {
  background: #ffffff;
  border-bottom: 1px solid #ebeef5;
}
</style>
