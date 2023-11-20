<script setup lang="ts">
import { ref, watch } from 'vue';
import IUser from '../models';
import type { Rule } from 'ant-design-vue/es/form';

const props = defineProps<{
  isDialogVisible: boolean
}>()

const emit = defineEmits(['update:isDialogVisible','createUser'])

const formRef = ref();
const formState = ref<IUser>();

const isModal = ref<boolean>(false);


// отслеживаем открытие окна
watch(() => props.isDialogVisible, val => {
  if (val) {    
    formState.value = {
      id: Date.now(),
      avatar: '',
      first_name: '',
      last_name: '',
      email: '',
    };
    console.log(formState.value);
    isModal.value = val
  }
})

// Отслеживаем закрытие окна
watch(isModal, val => {
  if (!val) {
    emit('update:isDialogVisible', val)
  }
})

const onSave = () => {
  console.log(formState.value);
  
  formRef.value.validate().then(() => {
    emit('createUser', {...formState.value})
    isModal.value = false;
    formRef.value.resetFields();
  })
  .catch(error => {
    console.error(error)
  })
}

const rules: Record<string, Rule[]> = {
  first_name: [
    { type: 'string', required: true, message: 'Обязательное поле!', trigger: 'change' },
    { min: 3, message: 'Имя должно быть больше 3 символов', trigger: 'blur' },
  ],
  last_name: [
    { type: 'string', required: true, message: 'Обязательное поле!', trigger: 'change' },
    { min: 3, message: 'Фамилия должна быть больше 3 символов', trigger: 'blur' },
  ],
  email: [
    { type: 'string', required: true, message: 'Обязательное поле!', trigger: 'change' },
  ],
};
</script>

<template>
  <a-modal
    v-model:open="isModal"
    title="Редактирование пользователя"
    cancelText="Отмена"
    okText="Создать"
    closable
    @cancel="() => isModal = false"
    @ok="onSave"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      :rules="rules"
      autocomplete="off"
    >
      <a-form-item
        label="Имя"
        name="first_name"
      >
        <a-input v-model:value="formState.first_name" />
      </a-form-item>

      <a-form-item
        label="Фамилия"
        name="last_name"
      >
        <a-input v-model:value="formState.last_name" />
      </a-form-item>

      <a-form-item
        label="E-mail"
        name="email"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped></style>
