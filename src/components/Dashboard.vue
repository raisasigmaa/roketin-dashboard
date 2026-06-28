<template>
  <div class="dashboard-container">
    <div class="dashboard-card">
      <h2 class="dashboard-title">Member Dashboard</h2>

      <!-- Loading -->
      <div v-if="loading" class="loading-screen">
        <div class="spinner" />
        <p>Loading member data...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error-screen">
        <p>{{ error }}</p> 
      </div>

      <!-- Content -->
      <template v-else-if="stats">
        <!-- Stats Grid -->
        <div class="stats-grid">
          <!-- Different Nationality -->
          <StatCard :value="stats.differentNationality" label="Different Nationality">
            <template #icon>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bdbdbd" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </template>
          </StatCard>

          <!-- Most Gender -->
          <StatCard :value="capitalizeFirst(stats.mostGender)" label="Most Gender">
            <template #icon>
              <!-- Female icon -->
              <svg v-if="stats.mostGender === 'female'" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bdbdbd" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="5" />
                <line x1="12" y1="13" x2="12" y2="21" />
                <line x1="9" y1="18" x2="15" y2="18" />
              </svg>
              <!-- Male icon -->
              <svg v-else width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bdbdbd" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="10" cy="14" r="5" />
                <line x1="19" y1="5" x2="14.35" y2="9.65" />
                <polyline points="15 5 19 5 19 9" />
              </svg>
            </template>
          </StatCard>

          <!-- Average Age -->
          <StatCard :value="`~${stats.averageAge}`" label="Average Age">
            <template #icon>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bdbdbd" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="7" r="4" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            </template>
          </StatCard>

          <!-- Average Membership -->
          <StatCard :value="`~${stats.averageMembershipYears} year`" label="Average Membership">
            <template #icon>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bdbdbd" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </template>
          </StatCard>
        </div>

        <!-- User Table -->
        <UserTable :users="users" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { User, RandomUserAPIResponse, DashboardStats } from '../types'
import { computeDashboardStats } from '../utils/calculations'
import StatCard from './StatCard.vue'
import UserTable from './UserTable.vue'

const users = ref<User[]>([])
const stats = ref<DashboardStats | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

onMounted(async () => {
  try {
    // randomuser.me API — 25 users
    const { data } = await axios.get<RandomUserAPIResponse>(
      'https://randomuser.me/api/?results=25&seed=roketin2026'
    )
    users.value = data.results
    stats.value = computeDashboardStats(data.results)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
})
</script>
