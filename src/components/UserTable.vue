<template>
  <div class="table-wrapper">
    <div class="table-scroll">
      <div
        v-for="(user, index) in users"
        :key="index"
        class="table-row"
      >
        <!-- Avatar + Name + Email -->
        <div class="user-info">
          <img
            :src="user.picture.thumbnail"
            :alt="formatFullName(user)"
            class="avatar"
          />
          <div class="user-text">
            <div class="user-name">{{ formatFullName(user) }}</div>
            <div class="user-email">{{ user.email }}</div>
          </div>
        </div>

        <!-- Age -->
        <div class="col-age">{{ user.dob.age }}</div>

        <!-- Gender Badge -->
        <div class="col-badge">
          <span
            class="gender-badge"
            :class="user.gender === 'female' ? 'badge-female' : 'badge-male'"
          >
            {{ user.gender }}
          </span>
        </div>

        <!-- Gender Icon -->
        <div class="col-gender">
          <!-- Female icon -->
          <svg v-if="user.gender === 'female'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e91e8c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="5" />
            <line x1="12" y1="13" x2="12" y2="21" />
            <line x1="9" y1="18" x2="15" y2="18" />
          </svg>
          <!-- Male icon -->
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2196f3" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="10" cy="14" r="5" />
            <line x1="19" y1="5" x2="14.35" y2="9.65" />
            <polyline points="15 5 19 5 19 9" />
          </svg>
        </div>

        <!-- Nationality Flag (Flagpedia API via flagcdn.com) -->
        <div class="col-flag">
          <img
            :src="getFlagUrl(user.nat)"
            :srcset="`${getFlagUrl(user.nat, '40x30')} 2x`"
            width="20"
            height="15"
            :alt="user.nat"
            class="flag-img"
            @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
          />
        </div>

        <!-- Address -->
        <div class="col-address">{{ formatAddress(user) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '../types'
import { formatFullName, formatAddress, getFlagUrl } from '../utils/calculations'

defineProps<{
  users: User[]
}>()
</script>
