export const standardsColumns = [
  { id: 'check', label: 'Selecionar' },
  { id: 'code', label: 'Codigo' },
  { id: 'name', label: 'Nome' },
  { id: 'desc', label: 'Descrição' }
]

export const getStandardsRows = (dataList) => {
  const rows = []
  dataList.map((data) => {
    return rows.push({
      code: data.code,
      name: data.name,
      desc: data.desc,
    })
  })

  return rows
}