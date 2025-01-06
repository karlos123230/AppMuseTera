'use client'

import { useState, useEffect } from 'react'

interface Avaliacao {
  id?: string
  patientId: string
  respostas: Record<string, string>
  observacoes?: string
  createdAt?: Date
  updatedAt?: Date
}

export function useAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchAvaliacoes()
  }, [])

  const fetchAvaliacoes = async () => {
    try {
      const response = await fetch('/api/avaliacoes')
      if (!response.ok) {
        throw new Error('Falha ao carregar avaliações')
      }
      const data = await response.json()
      setAvaliacoes(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const addAvaliacao = async (avaliacao: Omit<Avaliacao, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/avaliacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avaliacao),
      })

      if (!response.ok) {
        throw new Error('Falha ao adicionar avaliação')
      }

      const novaAvaliacao = await response.json()
      setAvaliacoes(prev => [...prev, novaAvaliacao])
      return novaAvaliacao
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'))
      throw err
    }
  }

  const updateAvaliacao = async (id: string, avaliacao: Partial<Avaliacao>) => {
    try {
      const response = await fetch(`/api/avaliacoes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avaliacao),
      })

      if (!response.ok) {
        throw new Error('Falha ao atualizar avaliação')
      }

      const avaliacaoAtualizada = await response.json()
      setAvaliacoes(prev => prev.map(a => a.id === id ? avaliacaoAtualizada : a))
      return avaliacaoAtualizada
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'))
      throw err
    }
  }

  const deleteAvaliacao = async (id: string) => {
    try {
      const response = await fetch(`/api/avaliacoes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Falha ao excluir avaliação')
      }

      setAvaliacoes(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'))
      throw err
    }
  }

  return {
    avaliacoes,
    loading,
    error,
    addAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    refreshAvaliacoes: fetchAvaliacoes,
  }
}
