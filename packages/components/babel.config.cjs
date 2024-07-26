module.exports = function (api) {
  api.cache(true)
  const presets = [
    'solid',
  ]
  const plugins = []

  return {
    presets,
    plugins,
  }
}
