<script setup lang="ts">
import UsersTable from '../components/UsersTable.vue';
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue'

const selectedTab = ref<'users'>('users')
</script>

<template>
  <Navbar v-model="selectedTab"/>
  <UsersTable v-if="selectedTab === 'users'" />
</template>

<style scoped></style>
