import type { BlogPost, Project } from "@lib/appwrite-service"
import { createEffect, createSignal, onCleanup } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { searchContent } from "@lib/appwrite-service"

type Props = {
  query?: string
}

export default function Search(props: Props) {
  const [query, setQuery] = createSignal(props.query || "")
  const [results, setResults] = createSignal<{ posts: BlogPost[], projects: Project[] }>({ posts: [], projects: [] })
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)
  
  // Debounce timeout reference
  let debounceTimeout: NodeJS.Timeout | null = null

  // Use Appwrite SDK to search all data with debouncing
  createEffect(() => {
    if (query().length < 2) {
      setResults({ posts: [], projects: [] })
      setError(null)
      return
    }

    // Clear previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    // Set new debounce timeout
    debounceTimeout = setTimeout(() => {
      setLoading(true)
      searchContent(query())
        .then(searchResults => {
          setResults(searchResults)
          setError(null)
        })
        .catch(err => {
          console.error("Search error:", err)
          // Handle error gracefully - maybe show an error message to user
          setResults({ posts: [], projects: [] })
          setError("Search failed. Please try again.")
        })
        .finally(() => {
          setLoading(false)
        })
    }, 300) // 300ms debounce delay
  })

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    setQuery(target.value)
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    // Prevent page refresh by using client-side navigation
    if (query().length >= 2) {
      // Search will automatically trigger due to createEffect
      // Update URL without full page reload
      const newUrl = `${window.location.pathname}?search=${encodeURIComponent(query())}`
      window.history.pushState({}, "", newUrl)
      // Dispatch custom event to update search results (removed for now - not needed with createEffect)
    }
  }

  // Cleanup debounce timeout on component unmount
  onCleanup(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }
  })

  return (
    <div class="flex flex-col">
      <form onSubmit={handleSubmit} class="relative" classList={{ "animate-pulse": loading() }}>
        <input 
          name="search" 
          type="text" 
          value={query()} 
          onInput={onInput} 
          autocomplete="off" 
          spellcheck={false} 
          placeholder="What are you looking for?" 
          class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-spaghetti-brown bg-spaghetti-yellow/20 dark:bg-spaghetti-yellow/20 border border-spaghetti-yellow/50 dark:border-spaghetti-yellow/50 focus:border-spaghetti-red focus:dark:border-spaghetti-red"
        />
        <svg class="absolute size-6 left-1.5 top-1/2 -translate-y-1/2 stroke-current">
          <use href={`/ui.svg#search`}/>
        </svg>
      </form>
      {error() && <div class="mt-4 text-red-500">{error()}</div>}
      {loading() && <div class="mt-4">Searching...<span class="ml-2 animate-spin">⏳</span></div>}
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
                      <ArrowCard entry={result} pill={true} collection={'blog'} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {results().projects.length > 0 && (
              <div class="border-t border-spaghetti-yellow/30 pt-4">
                <div class="text-sm font-bold mb-2">Projects</div>
                <ul class="flex flex-col gap-3">
                  {results().projects.map(result => (
                    <li>
                      <ArrowCard entry={result} pill={true} collection={'projects'} />
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
