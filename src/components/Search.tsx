import type { BlogPost, Project } from "@lib/appwrite-service"
import { createEffect, createSignal } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { getBlogPosts, getProjects } from "@lib/appwrite-service"

// Define a unified type for search results
type SearchEntry = BlogPost | Project

type Props = {
  data: SearchEntry[]
}

export default function Search({data}: Props) {
  const [query, setQuery] = createSignal("")
  const [results, setResults] = createSignal<SearchEntry[]>([])

  // Use Appwrite SDK to search all data
  createEffect(() => {
    if (query().length < 2) {
      setResults([])
    } else {
      // For now, we'll keep the client-side filtering as the Appwrite SDK doesn't provide 
      // built-in full-text search capabilities in this version
      // In a real implementation, you would call an API endpoint that does server-side search
      const filteredResults = data.filter(item => {
        const lowerQuery = query().toLowerCase()
        return (
          item.title.toLowerCase().includes(lowerQuery) ||
          (item.summary && item.summary.toLowerCase().includes(lowerQuery)) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        )
      })
      setResults(filteredResults)
    }
  })

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    setQuery(target.value)
  }

  return (
    <div class="flex flex-col">
      <div class="relative">
        <input name="search" type="text" value={query()} onInput={onInput} autocomplete="off" spellcheck={false} placeholder="What are you looking for?" class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-spaghetti-brown bg-spaghetti-yellow/20 dark:bg-spaghetti-yellow/20 border border-spaghetti-yellow/50 dark:border-spaghetti-yellow/50 focus:border-spaghetti-red focus:dark:border-spaghetti-red"/>
        <svg class="absolute size-6 left-1.5 top-1/2 -translate-y-1/2 stroke-current">
          <use href={`/ui.svg#search`}/>
        </svg>
      </div>
      {(query().length >= 2 && results().length >= 1) && (
        <div class="mt-12">
          <div class="text-sm uppercase mb-2">
            Found {results().length} results for {`'${query()}'`}
          </div>
          <ul class="flex flex-col gap-3">
            {results().map(result => (
              <li>
                <ArrowCard entry={result} pill={true} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
