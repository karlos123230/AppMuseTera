'use client'

import { useState, useEffect } from 'react'
import { Patient } from '@/types'
import { PlanoTerapeutico } from '@/types/plano'
import { Card } from '@/components/ui/Card'
import { PatientSelect } from './PatientSelect'
import { formatarData } from '@/utils/formatters'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface PlanoTerapeuticoPanelProps {
  onSave: (plano: PlanoTerapeutico) => void
  initialData?: PlanoTerapeutico
}

export function PlanoTerapeuticoPanel({ onSave, initialData }: PlanoTerapeuticoPanelProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState<PlanoTerapeutico>(initialData || {
    identificacao: {
      dataInicio: new Date().toISOString(),
      dataReavaliacao: ''
    },
    objetivos: [],
    cronograma: []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPatient) return

    try {
      const planoCompleto = {
        ...formData,
        pacienteId: selectedPatient.id
      }

      await onSave(planoCompleto)
    } catch (error) {
      console.error('Erro ao salvar plano:', error)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleIdentificacaoChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      identificacao: {
        ...prev.identificacao,
        [field]: value
      }
    }))
  }

  const adicionarObjetivo = () => {
    setFormData(prev => ({
      ...prev,
      objetivos: [...prev.objetivos, { texto: '', categoria: '' }]
    }))
  }

  const removerObjetivo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objetivos: prev.objetivos.filter((_, i) => i !== index)
    }))
  }

  const handleObjetivoChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      objetivos: prev.objetivos.map((obj, i) => 
        i === index ? { ...obj, [field]: value } : obj
      )
    }))
  }

  const adicionarSemana = () => {
    setFormData(prev => ({
      ...prev,
      cronograma: [...prev.cronograma, { 
        semana: `Semana ${prev.cronograma.length + 1}`,
        atividades: [],
        objetivos: []
      }]
    }))
  }

  const removerSemana = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cronograma: prev.cronograma.filter((_, i) => i !== index)
    }))
  }

  const handleSemanaChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      cronograma: prev.cronograma.map((semana, i) => 
        i === index ? { ...semana, [field]: value } : semana
      )
    }))
  }

  const gerarPDF = async () => {
    if (!selectedPatient) return

    try {
      const doc = new jsPDF()

      // Título
      doc.setFontSize(20)
      doc.text('Plano Terapêutico', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' })

      // Informações do paciente
      doc.setFontSize(12)
      doc.text(`Nome do Paciente: ${selectedPatient.name}`, 20, 40)
      doc.text(`Data de Início: ${formatarData(formData.identificacao.dataInicio)}`, 20, 50)
      if (formData.identificacao.dataReavaliacao) {
        doc.text(`Data de Reavaliação: ${formatarData(formData.identificacao.dataReavaliacao)}`, 20, 60)
      }

      let yPos = 80

      // Objetivos
      if (formData.objetivos.length > 0) {
        doc.setFontSize(14)
        doc.text('Objetivos', 20, yPos)
        yPos += 10

        formData.objetivos.forEach((objetivo, index) => {
          doc.setFontSize(10)
          const text = `${index + 1}. ${objetivo.texto} (${objetivo.categoria})`
          const lines = doc.splitTextToSize(text, 170)
          doc.text(lines, 20, yPos)
          yPos += (lines.length * 7)

          if (yPos > doc.internal.pageSize.height - 20) {
            doc.addPage()
            yPos = 20
          }
        })
      }

      // Cronograma
      if (formData.cronograma.length > 0) {
        yPos += 10
        doc.setFontSize(14)
        doc.text('Cronograma', 20, yPos)
        yPos += 10

        formData.cronograma.forEach((semana, index) => {
          doc.setFontSize(12)
          doc.text(semana.semana, 20, yPos)
          yPos += 7

          doc.setFontSize(10)
          doc.text('Atividades:', 30, yPos)
          yPos += 7

          semana.atividades.forEach(atividade => {
            const text = `• ${atividade}`
            const lines = doc.splitTextToSize(text, 160)
            doc.text(lines, 40, yPos)
            yPos += (lines.length * 5)

            if (yPos > doc.internal.pageSize.height - 20) {
              doc.addPage()
              yPos = 20
            }
          })

          yPos += 5
          doc.text('Objetivos:', 30, yPos)
          yPos += 7

          semana.objetivos.forEach(objetivo => {
            const text = `• ${objetivo}`
            const lines = doc.splitTextToSize(text, 160)
            doc.text(lines, 40, yPos)
            yPos += (lines.length * 5)

            if (yPos > doc.internal.pageSize.height - 20) {
              doc.addPage()
              yPos = 20
            }
          })

          yPos += 10
        })
      }

      // Rodapé
      const pageCount = (doc as any).internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.text(
          `Página ${i} de ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        )
      }

      // Salvar o PDF
      doc.save(`plano_terapeutico_${selectedPatient.name.toLowerCase().replace(/\s+/g, '_')}.pdf`)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar o PDF. Por favor, tente novamente.')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Plano Terapêutico</h2>
          <p className="mt-1 text-sm text-gray-500">
            Preencha os dados do plano terapêutico para o paciente.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Paciente
            </label>
            <div className="mt-1">
              <PatientSelect
                onSelect={setSelectedPatient}
                selectedId={selectedPatient?.id}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data de Início
            </label>
            <div className="mt-1">
              <input
                type="date"
                value={formData.identificacao.dataInicio.split('T')[0]}
                onChange={(e) => handleIdentificacaoChange('dataInicio', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data de Reavaliação
            </label>
            <div className="mt-1">
              <input
                type="date"
                value={formData.identificacao.dataReavaliacao?.split('T')[0] || ''}
                onChange={(e) => handleIdentificacaoChange('dataReavaliacao', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Objetivos
              </label>
              <button
                type="button"
                onClick={adicionarObjetivo}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Adicionar Objetivo
              </button>
            </div>
            <div className="mt-2 space-y-4">
              {formData.objetivos.map((objetivo, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={objetivo.texto}
                      onChange={(e) => handleObjetivoChange(index, 'texto', e.target.value)}
                      placeholder="Descrição do objetivo"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="w-48">
                    <select
                      value={objetivo.categoria}
                      onChange={(e) => handleObjetivoChange(index, 'categoria', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Selecione a categoria</option>
                      <option value="Musicalidade">Musicalidade</option>
                      <option value="Comunicação">Comunicação</option>
                      <option value="Cognição">Cognição</option>
                      <option value="Comportamento">Comportamento</option>
                      <option value="Motricidade">Motricidade</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removerObjetivo(index)}
                    className="text-red-600 hover:text-red-500"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Cronograma
              </label>
              <button
                type="button"
                onClick={adicionarSemana}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Adicionar Semana
              </button>
            </div>
            <div className="mt-2 space-y-6">
              {formData.cronograma.map((semana, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <input
                      type="text"
                      value={semana.semana}
                      onChange={(e) => handleSemanaChange(index, 'semana', e.target.value)}
                      className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removerSemana(index)}
                      className="text-red-600 hover:text-red-500"
                    >
                      Remover Semana
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Atividades
                      </label>
                      <div className="mt-1">
                        <textarea
                          value={semana.atividades.join('\n')}
                          onChange={(e) => handleSemanaChange(index, 'atividades', e.target.value.split('\n'))}
                          rows={3}
                          placeholder="Digite uma atividade por linha"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Objetivos da Semana
                      </label>
                      <div className="mt-1">
                        <textarea
                          value={semana.objetivos.join('\n')}
                          onChange={(e) => handleSemanaChange(index, 'objetivos', e.target.value.split('\n'))}
                          rows={3}
                          placeholder="Digite um objetivo por linha"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={gerarPDF}
            disabled={!selectedPatient}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            Gerar PDF
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Salvar Plano
          </button>
        </div>
      </form>
    </Card>
  )
}