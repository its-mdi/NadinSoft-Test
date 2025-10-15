<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title>{{ isEdit ? t('message.edit') : t('message.add') }}</v-card-title>
      <v-card-text>
        <v-text-field :label="t('message.description')" v-model="text"/>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn :text="t('message.save')" @click="save" variant="elevated" color="primary" class="w-100" prepend-icon="mdi-check"/>
        <v-btn :text="t('message.cancel')" @click="$emit('cancel')" variant="elevated" color="error" class="w-100" prepend-icon="mdi-close"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {useI18n} from "vue-i18n";

const props = defineProps({
  modelValue: Boolean,
  initialText: String,
  isEdit: Boolean
})
const {t} = useI18n()

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const text = ref(props.initialText || '')

watch(() => props.initialText, (val) => {
  text.value = val || ''
})

const save = () => {
  if (text.value.trim()) {
    emit('save', text.value)
    emit('update:modelValue', false)
    text.value = ''
  }
}
</script>
