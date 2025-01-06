'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { PatientSelect } from '@/components/processos/PatientSelect'
import { PlanoTerapeuticoPanel } from '@/components/processos/PlanoTerapeuticoPanel'
import { Patient } from '@/types'
import { PlanoTerapeutico } from '@/types/plano'

export default function PlanoPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Plano Terapêutico
      </h1>

      <Card>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione o Paciente
          </label>
          <PatientSelect
            onSelect={setSelectedPatient}
            selectedId={selectedPatient?.id}
          />
        </div>
      </Card>

      {selectedPatient && (
        <Card className="mt-6">
          <PlanoTerapeuticoPanel 
            onSave={handleSavePlano}
            initialData={{
              pacienteId: selectedPatient.id,
              identificacao: {
                dataInicio: new Date().toISOString(),
                dataReavaliacao: ''
              },
              objetivos: [],
              cronograma: []
            }}
          />
        </Card>
      )}
    </div>
  )
}