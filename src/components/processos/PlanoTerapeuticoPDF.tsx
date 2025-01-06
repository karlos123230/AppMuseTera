'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { PlanoTerapeutico } from '@/types/plano'
import { Logo } from '@/components/Logo'
<<<<<<< HEAD
=======
import jsPDF from 'jspdf'
>>>>>>> ed55b169351ee0aede8b22d80f6e1d5d3a55ea9a

interface PlanoTerapeuticoPDFProps {
  plano: PlanoTerapeutico
  onClose: () => void
}

export function PlanoTerapeuticoPDF({ plano, onClose }: PlanoTerapeuticoPDFProps) {
<<<<<<< HEAD
  const [isReady, setIsReady] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState({
    jspdf: false,
    autotable: false,
    html2canvas: false
  })

  const handleScriptsLoad = (scriptName: 'jspdf' | 'autotable' | 'html2canvas') => {
    setScriptsLoaded(prev => ({
      ...prev,
      [scriptName]: true
    }))
  }

  useEffect(() => {
    if (scriptsLoaded.jspdf && scriptsLoaded.autotable && scriptsLoaded.html2canvas) {
      setIsReady(true)
    }
  }, [scriptsLoaded])

  const generatePDF = async () => {
    if (typeof window !== 'undefined') {
      const loadScript = (src: string) => {
        return new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = src
          script.async = true
          script.onload = () => resolve()
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      const generatePDFContent = async () => {
        try {
          // @ts-ignore
          const jsPDF = window.jspdf.jsPDF
          
          const doc = new jsPDF()

          // Adiciona a logo usando fetch e FileReader
          try {
            const response = await fetch('/logo-musicoterapia.png')
            const blob = await response.blob()
            const reader = new FileReader()
            
            await new Promise((resolve) => {
              reader.onload = () => {
                if (reader.result) {
                  doc.addImage(reader.result as string, 'PNG', 10, 10, 20, 20)
                }
                resolve(null)
              }
              reader.readAsDataURL(blob)
            })
          } catch (error) {
            console.error('Erro ao carregar a logo:', error)
          }

          // Título
          doc.setFontSize(20)
          doc.text('Plano Terapêutico Musicoterapêutico', doc.internal.pageSize.getWidth() / 2, 45, { align: 'center' })
          
          // Identificação do Paciente
          doc.setFontSize(16)
          doc.text('Identificação do Paciente', 20, 65)
          
          doc.setFontSize(12)
          doc.text(`Nome: ${plano.identificacao.nome}`, 20, 75)
          doc.text(`Idade: ${plano.identificacao.idade} anos`, 20, 82)
          doc.text(`Diagnóstico: ${plano.identificacao.diagnostico}`, 20, 89)
          doc.text(`Data de Início: ${new Date(plano.identificacao.dataInicio).toLocaleDateString('pt-BR')}`, 20, 96)
          
          if (plano.identificacao.dataReavaliacao) {
            doc.text(`Reavaliação: ${new Date(plano.identificacao.dataReavaliacao).toLocaleDateString('pt-BR')}`, 20, 103)
          }
          
          // Rodapé
          doc.setFontSize(12)
          doc.text(`${formatarData(new Date())}`, 15, 280)
          doc.text('MuseTera', 15, 287)
          
          // Salva o PDF
          doc.save(`plano_terapeutico_${plano.identificacao.nome.toLowerCase().replace(/\s+/g, '_')}.pdf`)
        } catch (error) {
          console.error('Erro ao gerar PDF:', error)
          alert('Erro ao gerar PDF. Por favor, tente novamente.')
        }
      }

      // Verificar se os scripts já estão carregados
      if (window.jspdf && window.jspdf.jsPDF && window.jspdf.autoTable) {
        await generatePDFContent()
      } else {
        // Carregar scripts e gerar PDF
        Promise.all([
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js'),
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
        ])
        .then(() => {
          generatePDFContent()
        })
        .catch((error) => {
          console.error('Erro ao carregar scripts:', error)
          alert('Erro ao carregar recursos necessários. Por favor, tente novamente.')
        })
      }
    }
  }

  if (!isReady) {
    return (
      <>
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" 
          onLoad={() => handleScriptsLoad('jspdf')}
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js" 
          onLoad={() => handleScriptsLoad('autotable')}
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" 
          onLoad={() => handleScriptsLoad('html2canvas')}
        />
        <div>Carregando...</div>
      </>
    )
  }

  return (
    <div>
      <div style={{ display: 'none' }}>
        <Logo size="sm" />
      </div>
=======
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
>>>>>>> ed55b169351ee0aede8b22d80f6e1d5d3a55ea9a
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Gerar PDF
      </button>
    </div>
  )
}