<template>
  <v-card :title="t('message.searchResult')" :subtitle='t("weather.currentWeatherOf",{city:props.city})'>
    <v-card-text>
      <div class="d-flex w-100 flex-column">
        <p class="text-h6">{{ t('message.city') }} : {{ props.city }}</p>
        <p class="text-h6">{{ t('weather.temperature') }} : {{ props.temperature }} C</p>
        <p class="text-h6">{{ t('weather.condition') }} : {{ defineWeatherCondition(props.condition) }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

const props = defineProps({
  city: String,
  temperature: Number,
  condition: Number
})

const {t} = useI18n()

const defineWeatherCondition =(code:string|number)=>{
  const weatherCodes = {
    0: t('weather.clearSky'),
    1: t('weather.mainlyClear'),
    2: t('weather.partlyCloudy'),
    3: t('weather.overcast'),
    45: t('weather.fog'),
    48: t('weather.rimeFog'),
    51: t('weather.lightDrizzle'),
    53: t('weather.moderateDrizzle'),
    55: t('weather.denseDrizzle'),
    61: t('weather.slightRain'),
    63: t('weather.moderateRain'),
    65: t('weather.heavyRain'),
    71: t('weather.slightSnow'),
    73: t('weather.moderateSnow'),
    75: t('weather.heavySnow'),
    80: t('weather.rainShowers'),
    81: t('weather.moderateRainShowers'),
    82: t('weather.violentRainShowers'),
    95: t('weather.thunderstorm'),
    96: t('weather.thunderstormWithSlightHail'),
    99: t('weather.thunderstormWithHeavyHail'),
  }
  return weatherCodes[code] || t('weather.unknown')
}
</script>

<style scoped>

</style>
