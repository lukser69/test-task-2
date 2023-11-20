<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import IUser from '../models'
import { useStore } from 'vuex'

const store = useStore();

const users = ref<IUser[]>([]);

const options = ref({
  selectedPage: 1,
  perPage: 10,
  totalUsers: 3,
});

const isLoading = ref(false)

const fetchUsers = () => {  
  isLoading.value = true,
  store.dispatch('fetchUsers', options.value);
}

onMounted(fetchUsers)

watchEffect(() => {
  users.value = store.getters.getAllUsers || [];
  isLoading.value = false;
})

watchEffect(() => {
  options.value.selectedPage = store.getters.getSelectedPage || 1;
})

watchEffect(() => {
  options.value.perPage = store.getters.getPerPage || 10;
})

watchEffect(() => {
  options.value.totalUsers = store.getters.getTotalUsers || 1;
})

</script>

<template>
  <div>
    <a-list
      class="demo-loadmore-list"
      :loading="isLoading"
      item-layout="horizontal"
      :data-source="users"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a key="list-loadmore-edit">Редактировать</a>
          </template>
          <a-skeleton avatar :title="false" :loading="!!item.loading" active>
            <a-list-item-meta
              :description="`E-mail: ${item.email}`"
            >
              <template #title>
                {{ item.first_name + ' ' + item.last_name }}
              </template>
              <template #avatar>
                <a-avatar :src="item.avatar" />
              </template>
            </a-list-item-meta>
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>

    <a-pagination
      v-model:current="options.selectedPage"
      v-model:pageSize="options.perPage"
      :total="options.totalUsers"
      show-size-changer
      @change="fetchUsers"
    />
  </div>
  
</template>

<style scoped></style>
