'use client'

import { Patient } from '@/types'
import { formatarData } from '@/utils/formatters'
import { PlanoTerapeutico } from '@/types/plano'
import { Logo } from '@/components/Logo'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface PlanoTerapeuticoPDFProps {
  paciente: Patient
  plano: PlanoTerapeutico
}

export function PlanoTerapeuticoPDF({ paciente, plano }: PlanoTerapeuticoPDFProps) {
  const gerarPDF = async () => {
    try {
      const doc = new jsPDF()

      // Título
      doc.setFontSize(20)
      doc.text('Plano Terapêutico', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' })

      // Informações do paciente
      doc.setFontSize(12)
      doc.text(`Nome do Paciente: ${paciente.name}`, 20, 40)
      doc.text(`Data de Início: ${formatarData(plano.identificacao.dataInicio)}`, 20, 50)
      if (plano.identificacao.dataReavaliacao) {
        doc.text(`Data de Reavaliação: ${formatarData(plano.identificacao.dataReavaliacao)}`, 20, 60)
      }

      let yPos = 80

      // Objetivos
      if (plano.objetivos.length > 0) {
        doc.setFontSize(14)
        doc.text('Objetivos', 20, yPos)
        yPos += 10

        plano.objetivos.forEach((objetivo, index) => {
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
      if (plano.cronograma.length > 0) {
        yPos += 10
        doc.setFontSize(14)
        doc.text('Cronograma', 20, yPos)
        yPos += 10

        plano.cronograma.forEach((semana, index) => {
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
      doc.save(`plano_terapeutico_${paciente.name.toLowerCase().replace(/\s+/g, '_')}.pdf`)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar o PDF. Por favor, tente novamente.')
    }
  }

  return (
    <button
      onClick={gerarPDF}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Gerar PDF
    </button>
  )
}