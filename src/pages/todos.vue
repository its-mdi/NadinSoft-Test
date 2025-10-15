<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{t('message.toDoList')}}</span>
        <v-btn color="primary" @click="openDialog()">{{t('message.add')}}</v-btn>
      </v-card-title>

      <v-table>
        <thead>
        <tr>
          <th>{{t('message.description')}}</th>
          <th>{{t('message.status')}}</th>
          <th>{{t('message.actions')}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td :class="{ 'text-decoration-line-through': task.done }">{{ task.text }}</td>
          <td>
            <v-chip :color="task.done ? 'green' : 'red'" dark>
              {{ task.done ? t('message.done') : t('message.pending') }}
            </v-chip>
          </td>
          <td>
            <v-btn class="mx-2" v-if="!task.done" icon color="green" @click="toggleDone(index)">
              <v-icon icon="mdi-check"/>
              <v-tooltip
                activator="parent"
              >{{ t('message.done') }}</v-tooltip>
            </v-btn>
            <v-btn class="mx-2" v-if="task.done" icon color="warning" @click="toggleDone(index)">
              <v-icon icon="mdi-redo-variant"/>
              <v-tooltip
                activator="parent"
              >{{ t('message.redo') }}</v-tooltip>
            </v-btn>
            <v-btn class="me-2" v-if="!task.done" icon color="blue" @click="openDialog(task, index)">
              <v-icon icon="mdi-pencil"/>
              <v-tooltip
                activator="parent"
              >{{ t('message.edit') }}</v-tooltip>
            </v-btn>
              <v-btn icon color="red" @click="deleteTask(index)">
                <v-icon icon="mdi-delete"/>
                <v-tooltip
                  activator="parent"
                >{{ t('message.delete') }}</v-tooltip>
              </v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Add/edit dialog -->
    <TaskDialog
      v-model="dialog"
      :initialText="taskText"
      :isEdit="editIndex !== null"
      @save="handleSave"
      @cancel="dialog = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const tasks = ref([])
const dialog = ref(false)
const taskText = ref('')
const editIndex = ref(null)

onMounted(() => {
  const stored = localStorage.getItem('toDoList')
  tasks.value = stored ? JSON.parse(stored) : []
})

watch(tasks, (val) => {
  localStorage.setItem('toDoList', JSON.stringify(val))
}, { deep: true })

const openDialog=(task = null, index = null)=> {
  if (task) {
    taskText.value = task.text
    editIndex.value = index
  } else {
    taskText.value = ''
    editIndex.value = null
  }
  dialog.value = true
}

const handleSave=(value)=> {
  if (editIndex.value !== null) {
    tasks.value[editIndex.value].text = value
  } else {
    tasks.value.push({ text: value, done: false })
  }
}

function toggleDone(index) {
  tasks.value[index].done = !tasks.value[index].done
}

function deleteTask(index) {
  tasks.value.splice(index, 1)
}
</script>

<style scoped>

</style>
