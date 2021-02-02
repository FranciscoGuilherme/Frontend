export const ordersColumns = [
  { id: 'numero', label: 'Número' },
  { id: 'status', label: 'Status' },
  { id: 'usuario', label: 'Usuário' },
  { id: 'data', label: 'Data' }
]

export const getOrdersRows = (dataList) => {
  const rows = []
  dataList.map((data) => {
    return rows.push({
      numero: data.serial,
      status: data.status,
      usuario: data.client,
      data: data.date
    })
 })

  return rows
}