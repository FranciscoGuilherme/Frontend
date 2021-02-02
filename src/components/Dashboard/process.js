export const processColumns = [
  { id: 'numero', label: 'Número' },
  { id: 'status', label: 'Status' },
  { id: 'description', label: 'Descrição' }
]

export const getProcessRows = (dataList) => {
  const rows = []
  dataList.map((data) => {
    return rows.push({
      numero: data.serial,
      status: data.status,
      description: data.description
    })
  })

  return rows
}