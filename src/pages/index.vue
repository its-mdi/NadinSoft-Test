<template>
  <div class="h-100 w-100 d-flex flex-column justify-center align-center">
    <h1>{{ timeWithoutSeconds }}</h1>
    <h2>{{ `${declareDayTime()} , ${name} !`}}</h2>
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const time = new Date()
const timeWithoutSeconds = time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
const name = ref<string | null>(null);

onMounted(() => {
  if (!!localStorage.getItem("userName")) {
    name.value = localStorage.getItem("userName");
  } else {
    // Prompt the user for their name on first visit
    const userName = prompt("Enter your username:");
    if (userName && userName.trim() !== "") {
      localStorage.setItem("userName", userName.trim());
    }
  }
});
const declareDayTime = () => {
  if (time.getHours() < 12) {
    return t('message.goodMorning')
  } else if (time.getHours() == 12) {
    return t('message.goodNoon')
  } else {
    return t('message.goodAfternoon')
  }
}
</script>
