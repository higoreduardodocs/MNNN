'use client'

import { useState } from 'react'

import { SearchResult } from '@/types/SearchResult'
import * as api from '@/libs/fetcher'
import SearchForm from './SearchForm'
import SearchReveal from './SearchReveal'

type Props = {
  id: number
}

export default function Search({ id }: Props) {
  const [results, setResults] = useState<SearchResult>()
  const [loading, setLoading] = useState(false)
  const handleSearch = async (cpf: string) => {
    setLoading(true)
    if (!cpf) return
    const result = await api.searchCPF(id, cpf)
    setLoading(false)
    if (!result) return alert('Desculpe não encontramos seu CPF')

    setResults(result)
  }

  return (
    <section className="bg-gray-900 p-5 rounded">
      {!results ? (
        <SearchForm handleSearch={handleSearch} loading={loading} />
      ) : (
        <SearchReveal results={results} />
      )}
    </section>
  )
}
