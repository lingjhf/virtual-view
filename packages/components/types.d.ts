export {}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'my-counter': { name?: string, },
    }
  }
}
