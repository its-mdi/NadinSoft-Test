import { ref, onMounted } from 'vue'
import type { ColDef, GridReadyEvent, GridApi, PaginationChangedEvent } from 'ag-grid-community'
import { fetchComments, type Comment } from '@/composables/api'
import { exportToExcel as exportToExcelUtil } from '@/composables/excelExport'

export function useDataTable() {
  const agGridRef = ref<any>(null)
  const gridApi = ref<GridApi | null>(null)

  const rowData = ref<Comment[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const exporting = ref(false)
  const paginationPageSize = ref(20)

  const showColumnChooserPanel = ref(false)

  const columnDefs = ref<ColDef[]>([
    {
      field: 'id',
      headerName: 'شناسه',
      flex: 1,
      minWidth: 80,
      pinned: 'left',
      lockPosition: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: 'نام',
      flex: 1,
      minWidth: 150,
      sortable: true,
    },
    {
      field: 'email',
      headerName: 'ایمیل',
      flex: 1,
      minWidth: 200,
      sortable: true,
    },
    {
      field: 'body',
      headerName: 'نظر',
      flex: 2,
      minWidth: 250,
      sortable: true,
    }
  ])

  const defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: false,
  }

  const onGridReady = (params: GridReadyEvent) => {
    gridApi.value = params.api
    gridApi.value!.setGridOption('paginationPageSize', paginationPageSize.value)
  }

  const onPaginationChanged = () => {
    if (!gridApi.value) return

    const newPageSize = gridApi.value.paginationGetPageSize()
    if (newPageSize !== paginationPageSize.value) {
      paginationPageSize.value = newPageSize
    }
  }

  const loadData = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await fetchComments()
      rowData.value = response.data

      if (gridApi.value) {
        gridApi.value.setGridOption('rowData', response.data)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load data'
    } finally {
      loading.value = false
    }
  }

  const handleExportToExcel = async () => {
    if (!gridApi.value) return
    if (exporting.value) return

    try {
      exporting.value = true

      const visibleColumns = gridApi.value
        .getColumns()
        ?.filter((c) => c.isVisible()) || []

      const headers = visibleColumns.map((col) => col.getColDef().headerName || '')

      const allRowData: any[][] = []
      gridApi.value.forEachNode((node) => {
        const row: any[] = visibleColumns.map((col) => {
          const field = col.getColDef().field
          if (!field) return ''
          return node.data[field] ?? ''
        })
        allRowData.push(row)
      })

      exportToExcelUtil(headers, allRowData, 'comments-export-all')
    } catch (err) {
      alert('خروجی گرفتن با خطا مواجه شد')
    } finally {
      exporting.value = false
    }
  }

  const handleExportVisibleToExcel = async () => {
    if (!gridApi.value) return
    if (exporting.value) return

    try {
      exporting.value = true

      const visibleColumns = gridApi.value
        .getColumns()
        ?.filter((c) => c.isVisible()) || []

      const headers = visibleColumns.map((col) => col.getColDef().headerName || '')

      const visibleRowData: any[][] = []
      
      const currentPage = gridApi.value.paginationGetCurrentPage()
      const pageSize = gridApi.value.paginationGetPageSize()
      const startRow = currentPage * pageSize
      const endRow = startRow + pageSize
      
      let rowIndex = 0
      gridApi.value.forEachNodeAfterFilterAndSort((node) => {
        if (rowIndex >= startRow && rowIndex < endRow) {
          if (node.data) {
            const row: any[] = visibleColumns.map((col) => {
              const field = col.getColDef().field
              if (!field) return ''
              return node.data[field] ?? ''
            })
            visibleRowData.push(row)
          }
        }
        rowIndex++
      })

      exportToExcelUtil(headers, visibleRowData, 'comments-export-visible')
    } catch (err) {
      alert('خروجی گرفتن با خطا مواجه شد')
    } finally {
      exporting.value = false
    }
  }

  const toggleColumnChooser = () => {
    showColumnChooserPanel.value = !showColumnChooserPanel.value
  }

  const toggleColumnVisibility = (field: string, visible: boolean) => {
    if (!gridApi.value) return
    gridApi.value.setColumnsVisible([field], visible)
  }

  const getAllColumns = () => {
    if (!gridApi.value) return []
    const allColumns = gridApi.value.getColumns()
    if (!allColumns) return []
    
    return allColumns.map((col) => {
      const colDef = col.getColDef()
      return {
        field: colDef.field || '',
        headerName: colDef.headerName || colDef.field || '',
        visible: col.isVisible(),
        lockPosition: colDef.lockPosition || false,
      }
    }).filter(col => col.field)
  }

  onMounted(loadData)

  return {
    agGridRef,
    rowData,
    loading,
    error,
    exporting,
    paginationPageSize,
    columnDefs,
    defaultColDef,
    showColumnChooserPanel,
    toggleColumnChooser,
    getAllColumns,
    toggleColumnVisibility,
    onGridReady,
    onPaginationChanged,
    handleExportToExcel,
    handleExportVisibleToExcel,
  }
}
