<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import IUser from '../models'
import CreateUserDialog from './CreateUserDialog.vue';
import EditUserDialog from './EditUserDialog.vue';
import { useStore } from 'vuex'

const store = useStore();

const users = ref<IUser[]>([]);

const editableUser = ref<IUser>()

const options = ref({
  selectedPage: 1,
  perPage: 10,
  totalUsers: 3,
});

const isLoading = ref<boolean>(false);
const isCreateDialog = ref<boolean>(false);
const isEditDialog = ref<boolean>(false);

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

const showEditDialog = (user: IUser) => {
  editableUser.value = user;
  isEditDialog.value = true;
}

const createUser = (newUser: IUser) => {
  // Тут должен быть запрос на сервер
  users.value.push(newUser);
}

const editUser = (editedUser: IUser) => {
  // Тут должен быть запрос на сервер

  const userFoundIndex = users.value.findIndex(user => user.id === editedUser.id);
  users.value[userFoundIndex] = editedUser;
}
</script>

<template>
  <div>
    <div class="wrapper--btn-create-user">
      <a-button 
        type="primary"
        @click="isCreateDialog = true"
      >
        Создать
      </a-button>
    </div>
    <a-list
      class="demo-loadmore-list"
      :loading="isLoading"
      item-layout="horizontal"
      :data-source="users"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a
              key="list-loadmore-edit"
              @click="showEditDialog(item)"
            >
              Редактировать
            </a>
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
  
  <!-- Диалог для создания пользователя -->
  <CreateUserDialog
    v-model:is-dialog-visible="isCreateDialog"
    @createUser="(user) => createUser(user)"
  />
  
  <!-- Диалог для редактирования пользователя -->
  <EditUserDialog
    v-model:is-dialog-visible="isEditDialog"
    :user="editableUser"
    @updateUser="(user) => editUser(user)"
  />
</template>

<style scoped>
.wrapper--btn-create-user {
  margin: 8px 16px 0;

  display: flex;
  justify-content: end;
}
</style>
