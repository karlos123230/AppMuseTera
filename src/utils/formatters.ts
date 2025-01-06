export function formatarData(data: string | Date): string {
  if (!data) return ''
  
  const dataObj = typeof data === 'string' ? new Date(data) : data
  return dataObj.toLocaleDateString('pt-BR')
}

export function formatarHora(data: string | Date): string {
  if (!data) return ''
  
  const dataObj = typeof data === 'string' ? new Date(data) : data
  return dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function formatarDataHora(data: string | Date): string {
  if (!data) return ''
  
  const dataObj = typeof data === 'string' ? new Date(data) : data
  return `${formatarData(dataObj)} ${formatarHora(dataObj)}`
}