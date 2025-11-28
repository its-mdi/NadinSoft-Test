<template>
  <div class="ag-grid-container">
    <div class="toolbar d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <h1 class="h3 mb-0 fw-semibold">جدول نظرات</h1>
      <div class="toolbar-actions d-flex gap-2">
        <button @click="toggleColumnChooser" class="btn btn-outline-secondary">
          <span class="me-2">👁️</span>
          انتخاب ستون‌ها
        </button>
        <button @click="handleExportVisibleToExcel" class="btn btn-success" :disabled="exporting">
          <span v-if="exporting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <span v-else class="me-2">📊</span>
          {{ exporting ? 'در حال خروجی گرفتن...' : 'خروجی داده‌های قابل مشاهده' }}
        </button>
        <button @click="handleExportToExcel" class="btn btn-primary" :disabled="exporting">
          <span v-if="exporting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <span v-else class="me-2">📥</span>
          {{ exporting ? 'در حال خروجی گرفتن...' : 'خروجی تمام داده‌ها' }}
        </button>
      </div>
      
      <div v-if="showColumnChooserPanel" class="column-chooser-overlay" @click.self="toggleColumnChooser">
        <div class="column-chooser-panel">
          <div class="panel-header">
            <h6 class="mb-0">انتخاب ستون‌ها</h6>
            <button @click="toggleColumnChooser" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="panel-body">
            <div 
              v-for="col in getAllColumns()" 
              :key="col.field"
              class="column-item"
              :class="{ disabled: col.lockPosition }"
            >
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`col-${col.field}`"
                  :checked="col.visible"
                  :disabled="!!col.lockPosition"
                  @change="toggleColumnVisibility(col.field, ($event.target as HTMLInputElement).checked)"
                />
                <label class="form-check-label" :for="`col-${col.field}`">
                  {{ col.headerName }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="d-flex align-items-center justify-content-center" style="height: 200px">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">در حال بارگذاری داده‌ها...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger d-flex align-items-center justify-content-center" style="height: 200px">
      <span>خطا: {{ error }}</span>
    </div>

      <div v-else class="ag-grid-wrapper">
        <ag-grid-vue
        ref="agGridRef"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :defaultColDef="defaultColDef"
        :rowSelection="'multiple'"
        :animateRows="true"
        :suppressRowClickSelection="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :paginationAutoPageSize="false"
        :suppressPaginationPanel="false"
        @grid-ready="onGridReady"
        @pagination-changed="onPaginationChanged"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { useDataTable } from '@/composables/useDataTable'

const {
  agGridRef,
  rowData,
  loading,
  error,
  exporting,
  columnDefs,
  defaultColDef,
  paginationPageSize,
  showColumnChooserPanel,
  toggleColumnChooser,
  getAllColumns,
  toggleColumnVisibility,
  onGridReady,
  onPaginationChanged,
  handleExportToExcel,
  handleExportVisibleToExcel,
} = useDataTable()
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

.ag-grid-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.toolbar {
  flex-shrink: 0;
  background: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  h1 {
    color: #2c3e50;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin: 0;
  }
}

.toolbar-actions {
  .btn {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    font-weight: 500;
    padding: 0.625rem 1.25rem;
    border-radius: 8px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

.ag-grid-wrapper {
  flex: 1;
  width: 100%;
  min-height: 0;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1rem;
}

.ag-theme-alpine {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.d-flex.align-items-center.justify-content-center {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  
  .spinner-border {
    width: 3rem;
    height: 3rem;
    border-width: 0.3em;
  }
}

.alert {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  border: none;
  font-weight: 500;
}

.column-chooser-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.column-chooser-panel {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h6 {
    margin: 0;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    color: #6c757d;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;
    
    &:hover {
      background: #e9ecef;
      color: #495057;
    }
    
    &::before {
      content: '×';
    }
  }
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.column-item {
  padding: 0.75rem;
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
