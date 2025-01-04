'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { PlanoTerapeutico } from '@/types/plano'
import { Logo } from '@/components/Logo'
import jsPDF from 'jspdf'

interface PlanoTerapeuticoPDFProps {
  plano: PlanoTerapeutico
  onClose: () => void
}

export function PlanoTerapeuticoPDF({ plano, onClose }: PlanoTerapeuticoPDFProps) {
  const generatePDF = async () => {
    try {
      // Criar novo documento PDF
      const doc = new jsPDF()
      
      // Adiciona a logo
      const logoImg = new Image()
      logoImg.src = '/logo-musicoterapia.png'
      
      await new Promise((resolve) => {
        logoImg.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = logoImg.width
          canvas.height = logoImg.height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(logoImg, 0, 0)
          const imgData = canvas.toDataURL('image/png')
          doc.addImage(imgData, 'PNG', 75, 10, 60, 60)
          resolve(true)
        }
      })

      // Título
      doc.setFontSize(20)
      doc.text('Plano Terapêutico Musicoterapêutico', doc.internal.pageSize.getWidth() / 2, 80, { align: 'center' })

      // Identificação do Paciente
      doc.setFontSize(16)
      doc.text('Identificação do Paciente', 50, 120)

      // Informações do paciente
      doc.setFontSize(12)
      doc.text(`Nome: ${plano.identificacao.nome}`, 50, 140)
      doc.text(`Idade: ${plano.identificacao.idade} anos`, 50, 155)
      doc.text(`Diagnóstico: ${plano.identificacao.diagnostico}`, 50, 170)
      doc.text(`Data de Início: ${new Date(plano.identificacao.dataInicio).toLocaleDateString('pt-BR')}`, 50, 185)

      if (plano.identificacao.dataReavaliacao) {
        doc.text(`Reavaliação: ${new Date(plano.identificacao.dataReavaliacao).toLocaleDateString('pt-BR')}`, 50, 200)
      }

      // Gerar PDF
      const pdfBytes = doc.output('blob')
      
      // Download do arquivo
      const url = window.URL.createObjectURL(pdfBytes)
      const link = document.createElement('a')
      link.href = url
      link.download = `plano_terapeutico_${plano.identificacao.nome.toLowerCase().replace(/\s+/g, '_')}.pdf`
      link.click()
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar PDF. Por favor, tente novamente.')
    }
  }

  return (
    <div>
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Gerar PDF
      </button>
    </div>
  )
}