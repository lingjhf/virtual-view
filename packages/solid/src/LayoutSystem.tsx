import { createSignal } from 'solid-js'
import { customElement } from 'solid-element'

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

customElement('my-counter', { someProp: 'one', otherProp: 'two' }, () => {
  const [count, setCount] = createSignal(0)
  return (
    <div>
      <style>{style}</style>
      <button onClick={() => setCount(count() - 1)}>-</button>
      <span>{count()}</span>
      <button onClick={() => setCount(count() + 1)}>+</button>
    </div>
  )
})

// declare global {
//   declare module 'solid-js' {
//     namespace JSX {
//       interface IntrinsicElements {
//         'map-gl': MapGlProps,
//       }
//     }
//   }
// }
