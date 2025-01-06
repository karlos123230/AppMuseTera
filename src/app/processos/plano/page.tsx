'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
<<<<<<< HEAD
import { PatientSelect } from '@/components/processos/PatientSelect'
=======
>>>>>>> ed55b169351ee0aede8b22d80f6e1d5d3a55ea9a
import { Patient } from '@/types'
import { Logo } from '@/components/Logo'
import { PlanoTerapeuticoPanel } from '@/components/processos/PlanoTerapeuticoPanel'

export default function PlanoPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Logo size="sm" />
        </div>

<<<<<<< HEAD
        <PatientSelect
          onSelect={setSelectedPatient}
          selectedId={selectedPatient?.id}
        />

        {selectedPatient && (
          <Card className="mt-6">
            <PlanoTerapeuticoPanel />
          </Card>
        )}
=======
        <Card>
          <PlanoTerapeuticoPanel />
        </Card>
>>>>>>> ed55b169351ee0aede8b22d80f6e1d5d3a55ea9a
      </div>
    </div>
  )
}