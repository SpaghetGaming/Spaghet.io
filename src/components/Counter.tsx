import { createSignal } from "solid-js"

function CounterButton() {
  const [count, setCount] = createSignal(0)

  const increment = () => setCount(count() + 1)

  return (
    <div class="flex gap-4 items-center">
      <button onClick={increment} class="px-3 py-1 border border-spaghetti-yellow/50 dark:border-spaghetti-yellow/50 hover:bg-spaghetti-yellow/20 dark:hover:bg-spaghetti-yellow/20 blend text-spaghetti-brown">
        Increment
      </button>
      <div class="text-spaghetti-brown">
       Clicked {count()} {count() === 1 ? "time" : "times"}
      </div>
    </div>

  )
}

export default CounterButton
