<template>
  <v-app>
    <!-- Top bar -->
    <v-app-bar flat color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <v-toolbar-title>{{ t('message.appTitle') }}</v-toolbar-title>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="!isMobile"
    >
      <v-list density="compact">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          router
        >
          <div class="w-100 d-flex">
            <v-icon :icon="item.icon" class="me-1"/>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main page will be displayed here -->
    <v-main>
      <v-container class="d-flex align-center justify-center w-100" style="min-height: calc(100vh - 64px)">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {ref, computed} from "vue"
import {useDisplay} from "vuetify"
import {useI18n} from 'vue-i18n'

const drawer = ref(true)

const {t} = useI18n()
// Navigation items
const items = [
  {title: t('message.dashboard'), to: "/", icon: 'mdi-view-dashboard'},
  {title: t('message.todos'), to: "/todos", icon: 'mdi-format-list-checks'},
  {title: t('message.weather'), to: "/weather", icon: 'mdi-weather-cloudy'},
  {title: t('message.profile'), to: "/profile", icon: 'mdi-account'},
]
// Detect mobile size
const {smAndDown} = useDisplay()
const isMobile = computed(() => smAndDown.value)
</script>
