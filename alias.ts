import { resolve } from 'node:path'

function r(p: string) {
  return resolve(__dirname, p)
}

export const alias: Record<string, string> = {
  '@virtual-view/core': r('./packages/core/src/'),
  '@virtual-view/vue': r('./packages/vue/src/'),
  '@virtual-view/components': r('./packages/components/src/'),
}
