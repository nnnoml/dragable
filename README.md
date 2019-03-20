# dragable

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### dir list
```
npm install mddir --save
cd node_modules/mddir/src
node mddir "../../../"
Exports 'directoryList.md' in mddir/src folder

|-- root
    |-- .gitignore
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- main.js
        |-- store.js //项目vuex入口
        |-- assets
        |   |-- logo.png
        |-- components
            |-- dragPlugin
                |-- DragPlugin.vue //自定义桌面插件
                |-- common //公共组件
                |   |-- BottomTemp.vue //底部导航组件 引入plugin所有插件
                |   |-- HeaderTemp.vue //顶部组件
                |   |-- LeftTemp.vue //左侧导航组件 预留
                |   |-- MainCanvas.vue //中心画板组件
                |   |-- ShowBox.vue //弹窗组件 引入editor所有编辑器
                |-- editor
                |   |-- imgEditor.vue //图片编辑器
                |   |-- scrollImgEditor.vue //轮播图编辑器
                |   |-- textEditor.vue //文本编辑器
                |-- plugin
                    |-- imgPlugin.vue //图片插件
                    |-- scrollImgPlugin.vue //轮播插件
                    |-- textPlugin.vue //文本插件
```