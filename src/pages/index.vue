<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" class="d-flex flex-column justify-center align-center">
        <h1>{{ timeWithoutSeconds }}</h1>

        <!-- if the name is already declared -->
        <h2 v-if="name">{{ `${declareDayTime()} , ${name} !` }}</h2>
      </v-col>
    </v-row>
    <!-- in it's user's first time logging in -->
    <v-row justify="center" align="center" v-if="!name">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="inputName"
          :label="t('message.userName')"
        />
        <v-btn class="mt-2 w-100" color="primary" @click="saveName" :disabled="!inputName?.trim()" :text="t('message.save')"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const time = new Date();
const timeWithoutSeconds = time.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const name = ref<string | null>(null);
const inputName = ref<string>("");

onMounted(() => {
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    name.value = savedName;
  }
});

const saveName = () => {
  if (inputName.value.trim()) {
    localStorage.setItem("userName", inputName.value.trim());
    name.value = inputName.value.trim();
  }
};

const declareDayTime = () => {
  if (time.getHours() < 12) {
    return t("message.goodMorning");
  } else if (time.getHours() === 12) {
    return t("message.goodNoon");
  } else {
    return t("message.goodAfternoon");
  }
};
</script>
