import { createSignal } from 'solid-js'
import { customElement } from 'solid-element'
import { Column } from '@virtual-view/core'

const style = `div * {
          font-size: 200%;
        }

        span {
          width: 4rem;
          display: inline-block;
          text-align: center;
        }

        button {
          width: 4rem;
          height: 4rem;
          border: none;
          border-radius: 10px;
          background-color: seagreen;
          color: white;
        }`

customElement('auto-layout', { }, () => {
  const [count, setCount] = createSignal(0)
  const column = new Column({ width: 200, height: 100 })
  return (
    <div>
      <style>{style}</style>
      <button onClick={() => setCount(count() - 1)}>-</button>
      <span>{count()}</span>
      <button onClick={() => setCount(count() + 1)}>+</button>
    </div>
  )
})
