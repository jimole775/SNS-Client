### 依赖
请务必安装好它们

[Node.js](https://nodejs.org)

[Python](https://www.python.org/) (某些 NPM 模块的编译需要依赖它; 记得配置环境变量)

[Git](http://www.git-scm.com/downloads) (某些 NPM 模块的编译需要依赖它)

### NPM 使用注意
带 -g 参数的请务必确保您有操作系统的管理员权限

Unix/Linux 下加 sudo

Windows 下使用管理员权限打开命令行 CMD

### 强烈建议
由于众所周知的原因，贵国访问墙外的网络不稳定 --> [福利](https://github.com/getlantern/lantern)

推荐使用淘宝的 NPM 镜像 [cnpm](http://npm.taobao.org/) 替代 [npm](https://www.npmjs.com/)

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 安装全局依赖
任意目录下使用管理员权限执行

```bash
$ npm install -g ionic bower gulp http-server webpack
```

### 安装项目开发依赖
项目根目录下执行

```bash
$ npm install
$ bower install
```

### 编译打包
项目根目录下执行

* 单次编译打包
```bash
$ webpack
```

* 监听文件改变打包
```bash
$ webpack --watch
```

### 启动 HTTP 服务
项目根目录下执行

* 使用 ionic 内置 HTTP 服务(可以监听文件的改变而自动刷新)
```bash
$ ionic serve
```

* 使用 http-server (让您那卡出翔的机器焕发出第二春)
```bash
$ http-server ./www -c-1 -p 8100
```

### 如何访问
在浏览器中输入 http://Your_IP:8100

强烈推荐使用 [Chrome浏览器](http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html) 进行开发调试