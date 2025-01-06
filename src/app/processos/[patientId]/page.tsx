'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { PlanoTerapeuticoPanel } from '@/components/processos/PlanoTerapeuticoPanel'
import { PlanoTerapeutico } from '@/types/plano'

interface ProcessosPageProps {
  params: {
    patientId: string
  }
}

export default function ProcessosPage({ params }: ProcessosPageProps) {
  const handleSavePlano = async (plano: PlanoTerapeutico) => {
    try {
      const response = await fetch('/api/planos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plano),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar o plano')
      }

      alert('Plano salvo com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar plano:', error)
      alert('Erro ao salvar o plano. Por favor, tente novamente.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b">
          <Tab className={({ selected }) => `
            px-4 py-2 text-sm font-medium 
            ${selected 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
            }
          `}>
            Plano Terapêutico
          </Tab>
          {/* Adicione outras abas conforme necessário */}
        </Tab.List>

        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <PlanoTerapeuticoPanel 
              onSave={handleSavePlano}
              initialData={{
                pacienteId: params.patientId,
                identificacao: {
                  dataInicio: new Date().toISOString(),
                  dataReavaliacao: ''
                },
                objetivos: [],
                cronograma: []
              }}
            />
          </Tab.Panel>
          {/* Adicione outros painéis conforme necessário */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}