import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"

type Props = {
  tags: string[]
  data: CollectionEntry<"blog">[] // Simplified to just Astro content for now
  templates?: string[] // Add template prop
}

export default function Blog({ data, tags, templates = ["default"] }: Props) {
  const [filter, setFilter] = createSignal(new Set<string>())
  const [selectedTemplate, setSelectedTemplate] = createSignal<string>("all") // Add template selection
  const [posts, setPosts] = createSignal<CollectionEntry<"blog">[]>([])

  createEffect(() => {
    setPosts(data.filter((entry) => {
      // Filter by tags
      const tagMatch = Array.from(filter()).every((value) => 
        entry.data.tags.some((tag:string) => 
          tag.toLowerCase() === String(value).toLowerCase()
        )
      )
      
      // Filter by template if a specific template is selected
      const templateMatch = selectedTemplate() === "all" || 
        (entry.data.template && entry.data.template === selectedTemplate())
      
      return tagMatch && templateMatch
    }))
  })

  function toggleTag(tag: string) {
    setFilter((prev) => 
      new Set(prev.has(tag) 
        ? [...prev].filter((t) => t !== tag) 
        : [...prev, tag]
      )
    )
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24">
          <div class="text-sm font-semibold uppercase mb-2 text-spaghetti-brown">Filter</div>
          
          {/* Template Filter */}
          <div class="mb-4">
            <div class="text-xs uppercase mb-1 text-spaghetti-brown/70">Template</div>
            <ul class="flex flex-wrap sm:flex-col gap-1.5">
              <li>
                <button 
                  onClick={() => setSelectedTemplate("all")} 
                  class={cn("w-full px-2 py-1 rounded", "whitespace-nowrap overflow-hidden overflow-ellipsis", "flex gap-2 items-center", "bg-spaghetti-yellow/20 dark:bg-spaghetti-yellow/20", "hover:bg-spaghetti-yellow/30 hover:dark:bg-spaghetti-yellow/30", "transition-colors duration-300 ease-in-out", selectedTemplate() === "all" && "text-spaghetti-brown dark:text-spaghetti-brown")}
                >
                  All Templates
                </button>
              </li>
              <For each={templates}>
                {(template) => (
                  <li>
                    <button 
                      onClick={() => setSelectedTemplate(template)} 
                      class={cn("w-full px-2 py-1 rounded", "whitespace-nowrap overflow-hidden overflow-ellipsis", "flex gap-2 items-center", "bg-spaghetti-yellow/20 dark:bg-spaghetti-yellow/20", "hover:bg-spaghetti-yellow/30 hover:dark:bg-spaghetti-yellow/30", "transition-colors duration-300 ease-in-out", selectedTemplate() === template && "text-spaghetti-brown dark:text-spaghetti-brown")}
                    >
                      {template.charAt(0).toUpperCase() + template.slice(1)}
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </div>
          
          {/* Tag Filter */}
          <div class="mb-2">
            <div class="text-xs uppercase mb-1 text-spaghetti-brown/70">Tags</div>
            <ul class="flex flex-wrap sm:flex-col gap-1.5">
              <For each={tags}>
                {(tag) => (
                  <li>
                    <button onClick={() => toggleTag(tag)} class={cn("w-full px-2 py-1 rounded", "whitespace-nowrap overflow-hidden overflow-ellipsis", "flex gap-2 items-center", "bg-spaghetti-yellow/20 dark:bg-spaghetti-yellow/20", "hover:bg-spaghetti-yellow/30 hover:dark:bg-spaghetti-yellow/30", "transition-colors duration-300 ease-in-out", filter().has(tag) && "text-spaghetti-brown dark:text-spaghetti-brown")}>
                      <svg class={cn("size-5 fill-spaghetti-brown/50 dark:fill-spaghetti-brown/50", "transition-colors duration-300 ease-in-out", filter().has(tag) && "fill-spaghetti-brown dark:fill-spaghetti-brown")}>
                        <use href={`/ui.svg#square`} class={cn(!filter().has(tag) ? "block" : "hidden")} />
                        <use href={`/ui.svg#square-check`} class={cn(filter().has(tag) ? "block" : "hidden")} />
                      </svg>
                      {tag}
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          <div class="text-sm uppercase mb-2">
            SHOWING {posts().length} OF {data.length} POSTS
          </div>
          <ul class="flex flex-col gap-3">
            {posts().map((post) => (
              <li>
                <ArrowCard entry={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
