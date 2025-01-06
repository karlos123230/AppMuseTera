'use client'

import { RelatorioForm } from '@/components/relatorios/RelatorioForm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RelatoriosPage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/relatorios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar relatório')
      }

      router.push('/relatorios')
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Relatórios</h1>
      </div>

      <RelatorioForm 
        onSubmit={handleSubmit} 
        tipo="sessao"
      />
    </div>
  )
}