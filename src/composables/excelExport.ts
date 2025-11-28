function escapeXml(text: string | number | null | undefined): string {
  if (text === null || text === undefined) {
    return ''
  }
  const str = String(text)
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatCellValue(value: any): string {
  if (value === null || value === undefined) {
    return ''
  }
  if (typeof value === 'number') {
    return `<Cell><Data ss:Type="Number">${value}</Data></Cell>`
  }
  if (typeof value === 'boolean') {
    return `<Cell><Data ss:Type="Boolean">${value ? '1' : '0'}</Data></Cell>`
  }
  const escapedValue = escapeXml(value)
  return `<Cell><Data ss:Type="String">${escapedValue}</Data></Cell>`
}

function generateExcelXml(headers: string[], rows: any[][]): string {
  const headerRow = headers
    .map((header) => `<Cell><Data ss:Type="String">${escapeXml(header)}</Data></Cell>`)
    .join('')

  const dataRows = rows
    .map(
      (row) =>
        `<Row>${row.map((cell) => formatCellValue(cell)).join('')}</Row>`
    )
    .join('')

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Title>Data Export</Title>
  <Created>${new Date().toISOString()}</Created>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Header">
   <Font ss:Bold="1"/>
   <Interior ss:Color="#CCCCCC" ss:Pattern="Solid"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Sheet1">
  <Table>
   <Row>
    ${headerRow}
   </Row>
   ${dataRows}
  </Table>
 </Worksheet>
</Workbook>`
}

export function exportToExcel(
  headers: string[],
  rows: any[][],
  filename: string = 'export'
): void {
  try {
    const xmlContent = generateExcelXml(headers, rows)
    
    const blob = new Blob([xmlContent], {
      type: 'application/vnd.ms-excel'
    })
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.xls`
    
    document.body.appendChild(link)
    link.click()
    
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    throw error
  }
}

