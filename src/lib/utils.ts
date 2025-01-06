import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatarData(data: string | Date) {
  if (!data) return ''
  const date = new Date(data)
  return date.toLocaleDateString('pt-BR')
}

export function formatarHora(data: string | Date) {
  if (!data) return ''
  const date = new Date(data)
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function formatarDataHora(data: string | Date) {
  if (!data) return ''
  return `${formatarData(data)} às ${formatarHora(data)}`
}

export function gerarId() {
  return Math.random().toString(36).substr(2, 9)
}

export function calcularIdade(dataNascimento: string | Date) {
  if (!dataNascimento) return ''
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const m = hoje.getMonth() - nascimento.getMonth()
  
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }
  
  return idade
}
