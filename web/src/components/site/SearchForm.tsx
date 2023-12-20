import { FormEvent, useState } from 'react'

import { escapeCpf } from '@/utils/helper'

type Props = {
  handleSearch: (cpf: string) => void
  loading: boolean
}

export default function SearchForm({ handleSearch, loading }: Props) {
  const [cpf, setCpf] = useState<string>('')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch(cpf)
    setCpf('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-3 text-xl">Qual seu CPF?</p>
      <input
        name="cpf"
        type="text"
        inputMode="numeric"
        placeholder="Informe seu CPF"
        autoFocus
        value={cpf}
        onChange={(e) => setCpf(escapeCpf(e.target.value))}
        disabled={loading}
        className="w-full p-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 mt-3 text-white text-4xl bg-blue-800 border-b-4 border-blue-600 active:border-0 disabled:opacity-50"
      >
        {loading ? 'Buscando...' : 'Entrar'}
      </button>
    </form>
  )
}
