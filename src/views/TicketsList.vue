
<template>
  <div class="container">
    <el-row style="margin-bottom:12px;">
      <el-col :span="18"><TicketFilters @apply="applyFilters" /></el-col>
      <el-col :span="6" style="text-align:right;">
        <el-button type="primary" @click="$router.push({ name: 'TicketCreate' })">New Ticket</el-button>
      </el-col>
    </el-row>

    <el-space direction="vertical" style="width:100%;">
      <TicketCard v-for="t in tickets" :key="t.id" :ticket="t" />
      <div v-if="tickets.length === 0" style="text-align:center; color:#888;">No tickets</div>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import api from '../services/api'
import TicketCard from '../components/TicketCard.vue'
import TicketFilters from '../components/TicketFilters.vue'
import type { Ticket } from '../types'

const tickets = reactive<Ticket[]>([])

async function load() {
  const res = await api.listTickets()
  tickets.splice(0, tickets.length, ...(res || []))
}

function applyFilters(filters: any) {
  // demo: server-side filter placeholder
  load()
}

onMounted(load)
</script>

<style scoped>
.container { max-width:1100px; }
</style>
