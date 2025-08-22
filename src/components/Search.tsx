import type { BlogPost, Project } from "@lib/appwrite-service"
import { createEffect, createSignal } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { searchContent } from "@lib/appwrite-service"

type Props = {
  // Remove the unused data prop
}

export default function Search() {
  const [query, setQuery] = createSignal("")
  const [results, setResults] = createSignal<{ posts: BlogPost[], projects: Project[] }>({ posts: [], projects: [] })
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)

  // Use Appwrite SDK to search all data
  createEffect(() => {
    if (query().length < 2) {
      setResults({ posts: [], projects: [] })
      setError(null)
      return
    }

    setLoading(true)
    searchContent(query())
      .then(searchResults => {
        setResults(searchResults)
        setError(null)
      })
      .catch(error => {
        console.error("Search error:", error)
        // Handle error gracefully - maybe show an error message to user
        setResults({ posts: [], projects: [] })
        setError("Search failed. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
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
      {error() && <div class="mt-4 text-red-500">{error()}</div>}
      {loading() && <div class="mt-4">Searching...</div>}
      {(query().length >= 2 && (results().posts.length > 0 || results().projects.length > 0)) && (
        <div class="mt-12">
          <div class="text-sm uppercase mb-2">
            Found {results().posts.length + results().projects.length} results for {`'${query()}'`}
          </div>
          <div class="flex flex-col gap-6 mt-4">
            {results().posts.length > 0 && (
              <div class="border-t border-spaghetti-yellow/30 pt-4">
                <div class="text-sm font-bold mb-2">Blog Posts</div>
                <ul class="flex flex-col gap-3">
                  {results().posts.map(result => (
                    <li>
                      <ArrowCard entry={result} pill={true} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {results().projects.length > 0 && (
              <div class="border-t border-spaghetti-yellow/30 pt-4">
                <div class="text-sm font-bold mb-2">Projects</div>
                <ul class="flex flex-col gap-3">
                  {results().projects.map((result, index) => (
                    <li>
                      <ArrowCard entry={result} pill={true} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
