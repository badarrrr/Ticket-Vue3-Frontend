
<template>
  <div class="container">
    <el-row style="margin-bottom:12px;">
      <el-col :span="18"><TicketFilters @apply="applyFilters" /></el-col>
      <el-col :span="6" style="text-align:right;">
        <el-button type="primary" @click="$router.push({ name: 'TicketCreate' })">New Ticket</el-button>
      </el-col>
    </el-row>

      <div class="card-wrapper">
        <TicketCard v-for="t in tickets" :key="t.id" :ticket="t" />
        <div v-if="tickets.length === 0" class="no-ticket">No tickets</div>
      </div>
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
.page-wrapper {
  display: flex;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}
.container { max-width:1100px; 
}
.ticket-item {
  width: 60%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.ticket-item > * {
  width: 100%;
  box-sizing: border-box;
}
.card-wrapper {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
