<template>
  <div class="h-100 w-100 d-flex flex-column justify-center align-center">
    <v-form @submit="submitForm()" ref="form" v-model="isValid">
      <v-card elevation="1" class="mx-auto py-2 px-2" min-width="500">
        <v-card-title>{{ t('message.appSetting') }}</v-card-title>
        <v-divider class="pb-3"/>
        <v-text-field :label="t('message.userName')" class="w-100" v-model="userName" :rules="nameRules" data-testid="username-input"/>
        <v-select
          v-model="selectedTheme"
          :items="themeOptions"
          data-testid="theme-select"
          item-title="title"
          class="w-100"
          item-value="value"
          :label="t('message.theme')"
        />
        <v-select
          data-testid="lang-select"
          v-model="lang"
          :items="languages"
          item-title="title"
          class="w-100"
          item-value="value"
          :label="t('message.language')"
        />
        <v-btn :text="t('message.save')" type="submit" variant="tonal" color="blue" class="w-100" prepend-icon="mdi-check" data-testid="save-btn"/>
      </v-card>
    </v-form>
    <v-snackbar-queue v-model="toastMessage" :color="toastColor"/>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {useTheme} from 'vuetify'

const { t, locale } = useI18n<{ message: Record<string, string> }>()
const userName = ref(localStorage.getItem('userName') || '')
const theme = useTheme()
const toastMessage = ref<string[]>([])
const toastColor = ref('success')

//Language options
const languages = [
  {title: t('message.english'), value: 'en'},
  {title: t('message.persian'), value: 'fa'},
]

//Selected lang holder
const lang = ref<string>(locale.value)
//Define a ref for the form
const form = ref()
//Form validation constant
const isValid = ref(false)

//Theme options
const themeOptions = [
  {title: t('message.darkTheme'), value: 'dark'},
  {title: t('message.lightTheme'), value: 'light'}
]
//Selected theme holder
const selectedTheme = ref(theme.global.name.value)

//Validation check of the form
const nameRules = [
  (v: string) => !!v || t('message.requiredField', {fieldName: t('message.userName')}),
  (v: string) => v.trim().length >= 2 || t('message.customLengthError', {fieldName: t('message.userName'), length: 2}),
]
//Submit form function
const submitForm = async () => {
  const {valid} = await form.value.validate()
  if (valid) {
    localStorage.setItem('lang', lang.value)
    locale.value = lang.value
    localStorage.setItem('theme', selectedTheme.value)
    theme.global.name.value = selectedTheme.value
    localStorage.setItem('userName', userName.value)
    toastColor.value = 'success'
    toastMessage.value.push(t('message.formSubmited'))
  } else {
    toastColor.value = 'error'
    toastMessage.value.push(t('message.validationFailed'))
  }
}
</script>

<style scoped>

</style>
