<!-- src/views/Profile.vue -->
<template>
  <div class="profile-container">
    <h1>Personal Profile</h1>
    <div class="profile-info">
      <div class="avatar-container">
        <el-avatar size="80">{{ initials }}</el-avatar>
      </div>

      <div class="user-details">
        <div class="detail-item">
          <span class="label">Name: </span>
          <span>{{ user?.fullName || '??' }}</span>
        </div>
        <div class="detail-item">
          <span class="label">User: </span>
          <span>{{ user?.username || '??' }}</span>
        </div>
        <!-- 可以根据实际用户信息添加更多字段 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/store'

const auth = useAuthStore()
const user = computed(() => auth.user)

const initials = computed(() => {
  if (!user.value) return ''
  return (user.value.fullName || user.value.username).split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase()
})
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.avatar-container {
  padding: 20px;
}

.user-details {
  flex: 1;
}

.detail-item {
  margin: 10px 0;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.label {
  font-weight: bold;
  margin-right: 10px;
  color: #666;
}
</style>
