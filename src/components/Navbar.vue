<script setup lang="ts">
import { ref } from 'vue';
import { MenuProps } from 'ant-design-vue';

defineProps<{
  modelValue: 'users'
}>()

defineEmits(['update:modelValue'])

const current = ref<string[]>(['users']);

const items = ref<MenuProps['items']>([
  {
    key: 'users',
    label: 'Пользователи',
    title: 'Пользователи',
  },
])
</script>

<template>
  <a-menu
    v-model:selectedKeys="current"
    mode="horizontal"
    :items="items"
    @select="$emit('update:modelValue', current[0])"
  />
</template>

<style scoped></style>
