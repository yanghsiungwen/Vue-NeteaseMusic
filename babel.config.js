const proPlugins = []
// 通过判断当前处于什么模式，若是生产模式，则将 插件配置到项目中。若是开发环境则可以进行正常的console
if (process.env.NODE_ENV === 'production') {
  proPlugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "iview",
        libraryDirectory: "src/components"
      }
    ],
    ...proPlugins,
    '@babel/plugin-syntax-dynamic-import'
  ]

}
