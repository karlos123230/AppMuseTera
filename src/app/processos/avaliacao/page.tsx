'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { PatientSelect } from '@/components/processos/PatientSelect'
import { Patient } from '@/types'
import { ESCALA_DEMUCA, AvaliacaoCategoria } from '@/types/avaliacao'
import { Logo } from '@/components/Logo'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { useAvaliacoes } from '@/hooks/useAvaliacoes'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface ChartData {
  habilidades: string[]
  categorias: string[]
  porcentagens: number[]
}

const calcularPorcentagens = (avaliacoes: Record<string, string>): ChartData => {
  const habilidades: string[] = []
  const categorias: string[] = []
  const porcentagens: number[] = []

  ESCALA_DEMUCA.forEach(categoria => {
    let somaCategoria = 0
    let maxCategoria = 0

    categoria.habilidades.forEach(habilidade => {
      const valor = parseInt(avaliacoes[habilidade.id] || '0')
      const multiplicador = habilidade.multiplicador || 1
      somaCategoria += valor * multiplicador
      maxCategoria += 4 * multiplicador // valor máximo da escala
      habilidades.push(habilidade.nome)
    })

    const porcentagem = (somaCategoria / maxCategoria) * 100
    porcentagens.push(porcentagem)
    categorias.push(categoria.nome)
  })

  return { habilidades, categorias, porcentagens }
}

export default function AvaliacaoPage() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const { avaliacoes } = useAvaliacoes()

  const avaliacaoAtual = selectedPatient 
    ? avaliacoes.find(a => a.patientId === selectedPatient.id)
    : null

  const chartData = avaliacaoAtual 
    ? calcularPorcentagens(avaliacaoAtual.respostas)
    : { habilidades: [], categorias: [], porcentagens: [] }

  const data = {
    labels: chartData.categorias,
    datasets: [
      {
        label: 'Desenvolvimento Musical',
        data: chartData.porcentagens,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  }

  const gerarPDF = async () => {
    if (!selectedPatient || !avaliacaoAtual) return

    const doc = new jsPDF()
    const chartRef = document.querySelector('.radar-chart') as HTMLElement

    if (chartRef) {
      const canvas = await html2canvas(chartRef)
      const imgData = canvas.toDataURL('image/png')
      doc.addImage(imgData, 'PNG', 20, 40, 170, 100)
    }

    doc.setFontSize(20)
    doc.setTextColor('#111827')
    doc.text('Avaliação DEMUCA', 105, 20, { align: 'center' })

    doc.setFontSize(12)
    doc.setTextColor('#374151')
    doc.text(`Paciente: ${selectedPatient.name}`, 20, 30)
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 35)

    let yPos = 150

    ESCALA_DEMUCA.forEach(categoria => {
      doc.setFontSize(14)
      doc.setTextColor('#1f2937')
      doc.text(categoria.nome, 20, yPos)
      yPos += 10

      categoria.habilidades.forEach(habilidade => {
        const valor = avaliacaoAtual.respostas[habilidade.id] || '0'
        const porcentagem = (parseInt(valor) / 4) * 100

        doc.setFontSize(10)
        doc.setTextColor('#4b5563')
        doc.text(`${habilidade.nome}: ${porcentagem.toFixed(1)}%`, 30, yPos)
        yPos += 6

        if (yPos > doc.internal.pageSize.height - 20) {
          doc.addPage()
          yPos = 20
        }
      })

      yPos += 10
    })

    doc.save(`avaliacao_${selectedPatient.name}_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Logo size="sm" />
          <button
            onClick={gerarPDF}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!selectedPatient || !avaliacaoAtual}
          >
            Gerar PDF
          </button>
        </div>

        <Card>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Avaliação DEMUCA</h1>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <PatientSelect
                      onSelect={setSelectedPatient}
                      selectedId={selectedPatient?.id}
                    />
                  </div>
                </div>
              </div>

              {selectedPatient && avaliacaoAtual && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Avaliação de {selectedPatient.name}
                  </h2>
                  <div className="w-full max-w-2xl mx-auto radar-chart">
                    <Radar data={data} options={options} />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-base font-medium text-gray-900 mb-3">
                      Detalhamento por Habilidade
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {chartData.habilidades.map((habilidade, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow">
                          <div className="text-sm font-medium text-gray-700">{habilidade}</div>
                          <div className="mt-1 flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${chartData.porcentagens[index]}%` }}
                              />
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {chartData.porcentagens[index].toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!selectedPatient && (
                <div className="text-center py-6 text-gray-500">
                  Selecione um paciente para visualizar sua avaliação DEMUCA
                </div>
              )}

              {selectedPatient && !avaliacaoAtual && (
                <div className="text-center py-6 text-gray-500">
                  Nenhuma avaliação encontrada para este paciente
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}