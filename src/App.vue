<template>
  <v-app>
    <router-view/>
    <v-snackbar-queue v-model="toastMessage" color="red-darken-2"/>
  </v-app>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const router = useRouter()
const route = useRoute()
const toastMessage = ref<object>([])
const {t} = useI18n()

watch(() => route.fullPath,
  () => {
    if (!localStorage.getItem('userName') && route.path !== '/') {
      router.push('/')
      toastMessage.value.push(t('message.enterUserName'))
    }
  })
</script>
