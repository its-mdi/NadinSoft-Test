<template>
  <div class="column-chooser-panel">
    <div class="panel-header">
      <h6 class="mb-0">انتخاب ستون‌ها</h6>
    </div>
    <div class="panel-body">
      <div 
        v-for="col in columns" 
        :key="col.field"
        class="column-item"
        :class="{ 'disabled': col.lockPosition }"
      >
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`col-${col.field}`"
            :checked="col.visible"
            :disabled="col.lockPosition"
            @change="toggleColumn(col.field, ($event.target as HTMLInputElement).checked)"
          />
          <label class="form-check-label" :for="`col-${col.field}`">
            {{ col.headerName }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { GridApi, Column } from 'ag-grid-community'

interface Props {
  api: GridApi | null
}

const props = defineProps<Props>()

interface ColumnInfo {
  field: string
  headerName: string
  visible: boolean
  lockPosition: boolean
}

const columns = ref<ColumnInfo[]>([])

const updateColumns = () => {
  if (!props.api) return
  
  const allColumns = props.api.getColumns()
  if (!allColumns) return
  
  columns.value = allColumns.map((col: Column) => {
    const colDef = col.getColDef()
    return {
      field: colDef.field || '',
      headerName: colDef.headerName || colDef.field || '',
      visible: col.isVisible(),
      lockPosition: colDef.lockPosition || false,
    }
  }).filter(col => col.field)
}

const toggleColumn = (field: string, visible: boolean) => {
  if (!props.api) return
  props.api.setColumnsVisible([field], visible)
  setTimeout(updateColumns, 100)
}

watch(() => props.api, () => {
  if (props.api) {
    updateColumns()
  }
}, { immediate: true })

onMounted(() => {
  updateColumns()
  if (props.api) {
    props.api.addEventListener('columnVisible', updateColumns)
    props.api.addEventListener('columnMoved', updateColumns)
    props.api.addEventListener('columnPinned', updateColumns)
  }
})

onUnmounted(() => {
  if (props.api) {
    props.api.removeEventListener('columnVisible', updateColumns)
    props.api.removeEventListener('columnMoved', updateColumns)
    props.api.removeEventListener('columnPinned', updateColumns)
  }
})
</script>

<style lang="scss" scoped>
.column-chooser-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.panel-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  background: #f8f9fa;
  
  h6 {
    margin: 0;
    font-weight: 600;
    color: #2c3e50;
  }
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.column-item {
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover:not(.disabled) {
    background-color: #f8f9fa;
  }
  
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .form-check {
    margin: 0;
    display: flex;
    align-items: center;
    
    .form-check-input {
      margin-top: 0;
      cursor: pointer;
    }
    
    .form-check-label {
      cursor: pointer;
      user-select: none;
      margin-right: 0.5rem;
      font-size: 14px;
      color: #495057;
    }
  }
}
</style>

