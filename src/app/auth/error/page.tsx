'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      console.error('Erro de autenticação:', error)
    }
  }, [error])

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'CredentialsSignin':
        return 'Credenciais inválidas. Por favor, verifique seu email e senha.'
      case 'SessionRequired':
        return 'Você precisa estar logado para acessar esta página.'
      default:
        return 'Ocorreu um erro durante a autenticação. Por favor, tente novamente.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Erro de Autenticação
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error ? getErrorMessage(error) : 'Ocorreu um erro inesperado'}
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  )
}
