'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { PatientSelect } from '@/components/processos/PatientSelect'
import { Patient } from '@/types'
import Link from 'next/link'
import { AnamneseQuestion, ANAMNESE_QUESTIONS } from '@/types/anamnese'
import { AnamnesePDF } from '@/components/processos/AnamnesePDF'
import { useAnamneses } from '@/hooks/useAnamneses'
import { Logo } from '@/components/Logo'

export default function AnamnesePage() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Logo size="sm" />
        </div>

        <Card>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Anamnese Musicoterapêutica</h1>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <PatientSelect
                      onSelect={setSelectedPatient}
                      selectedId={selectedPatient?.id}
                    />
                  </div>
                  <Link
                    href="/pacientes/novo"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 inline-flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Novo Paciente
                  </Link>
                </div>
              </div>

              {selectedPatient && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Anamnese de {selectedPatient.name}
                  </h2>
                  <AnamneseForm patient={selectedPatient} />
                </div>
              )}

              {!selectedPatient && (
                <div className="text-center py-6 text-gray-500">
                  Selecione um paciente ou cadastre um novo para iniciar a anamnese musicoterapêutica
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

interface FormData {
  [key: string]: string | string[]
  observacoes: string
}

function AnamneseForm({ patient }: { patient: Patient }) {
  const router = useRouter()
  const { addAnamnese } = useAnamneses()
  const [formData, setFormData] = useState<FormData>({ observacoes: '' })
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (id: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const anamneseData = {
        patientId: patient.id,
        respostas: formData,
        observacoes: formData.observacoes
      }

      addAnamnese(anamneseData)
      alert('Anamnese salva com sucesso!')
      router.push(`/processos/${patient.id}`)
    } catch (error) {
      console.error('Erro ao salvar anamnese:', error)
      alert('Erro ao salvar anamnese. Por favor, tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {ANAMNESE_QUESTIONS.map((question) => (
        <div key={question.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {question.question}
          </label>

          {question.type === 'text' && (
            <textarea
              value={formData[question.id] as string || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}

          {question.type === 'date' && (
            <input
              type="date"
              value={formData[question.id] as string || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}

          {question.type === 'single' && question.options && (
            <select
              value={formData[question.id] as string || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Selecione uma opção...</option>
              {question.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {question.type === 'multiple' && question.options && (
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-1.5 text-sm">
                {question.options.map((option) => (
                  <label key={option} className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={Array.isArray(formData[question.id]) && (formData[question.id] as string[]).includes(option)}
                      onChange={(e) => {
                        const currentValue = Array.isArray(formData[question.id]) ? formData[question.id] as string[] : []
                        const newValue = e.target.checked
                          ? [...currentValue, option]
                          : currentValue.filter(v => v !== option)
                        handleInputChange(question.id, newValue)
                      }}
                      className="rounded border-gray-300 h-3.5 w-3.5"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Observações Adicionais
        </label>
        <textarea
          value={formData.observacoes || ''}
          onChange={(e) => handleInputChange('observacoes', e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Adicione quaisquer observações relevantes..."
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSaving ? 'Salvando...' : 'Salvar Anamnese'}
        </button>
      </div>
    </form>
  )
}