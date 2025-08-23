import { formatDate } from "@lib/utils"
import type { BlogPost, Project } from "@lib/appwrite-service"

type Props = {
  entry: BlogPost | Project | any
  collection?: string
  pill?: boolean
}

export default function ArrowCard({entry, pill, collection}: Props) {
    return (
      <a href={`/${collection === 'blog' ? 'blog' : 'projects'}/${entry.$id}`} class="group p-4 gap-3 flex items-center border border-spaghetti-brown rounded-lg hover:bg-spaghetti-red/5 hover:dark:bg-spaghetti-cream/10 dark:border-spaghetti-cream/20 transition-colors duration-300 ease-in-out">
      <div class="w-full group-hover:text-spaghetti-red group-hover:dark:text-spaghetti-cream blend">
        <div class="flex flex-wrap items-center gap-2">
          {pill &&
            <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-spaghetti-cream/20 bg-spaghetti-yellow/20 dark:bg-spaghetti-yellow/20 dark:text-spaghetti-cream">
              {collection === "blog" ? "post" : "project"}
            </div>
          }
          <div class="text-sm uppercase text-spaghetti-brown dark:text-spaghetti-yellow">
            {formatDate(entry.date)}
          </div>
        </div>
        <div class="font-semibold mt-3 text-spaghetti-brown/80 dark:text-spaghetti-cream">
          {entry.title}
        </div>

        <div class="text-sm line-clamp-2 text-spaghetti-brown/80 dark:text-spaghetti-cream">
          {entry.summary}
        </div>
        <ul class="flex flex-wrap mt-2 gap-1">
          {entry.tags.map((tag:string) => (
            <li class="text-xs uppercase py-0.5 px-1 rounded bg-spaghetti-yellow/20 dark:bg-spaghetti-yellow/20 text-spaghetti-brown/80 dark:text-spaghetti-yellow">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-spaghetti-yellow">
        <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
      </svg>
    </a>
   )
}
