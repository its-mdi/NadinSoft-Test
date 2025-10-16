<template>
  <v-container class="pa-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div class="bg-light text-secondary p-3 rounded mb-4 text-center">
          <p class="mb-0">
            {{ t('weather.instruction') }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="selectedCity" :label="t('message.city')" :items="cities" item-title="city" item-value="city" return-object @update:modelValue="fetchWeather"
        />
      </v-col>
    </v-row>

    <!-- Loading Indicator -->
    <v-row justify="center" v-if="loading" class="mt-4">
      <v-col cols="auto" class="d-flex align-center">
        <v-progress-circular indeterminate color="primary"/>
        <span class="ml-3 font-medium">{{ t('message.fetching') }}</span>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="weather && !loading" class="mt-6">
      <v-col cols="12" md="6">
        <weather-search-result v-if="weather && !loading" :city="selectedCity.city" :condition="weather.weathercode"
                               :temperature="weather.temperature"/>
      </v-col>
    </v-row>
    <v-snackbar-queue v-model="toastMessage" color="red-darken-2"/>
  </v-container>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import cities from '@/assets/ir.json'

const {t} = useI18n()
const selectedCity = ref<object | null>(null)
const weather = ref<object | null>(null)
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const toastMessage = ref<object>([])

async function fetchWeather() {
  if (!selectedCity.value) return

  loading.value = true
  weather.value = null
  const {lat, lng} = selectedCity.value

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`

  try {
    const res = await fetch(url)
    const data = await res.json()
    weather.value = data.current_weather
  } catch (err) {
    error.value = err
    toastMessage.value.push(t('message.failedToFetch'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

</style>
