# KApp

![](https://github.com/xdrkush/tuto-kapp-vue-node/blob/main/init.png)

This project is create with:
  - Quasar (VueJS, PWA, ...)
  - node-komodo-rpc By Gcharang
  - Node Js (express, ...)
  - Komodo (Blockchain)

## ( in progress )

## Pre-requisite

  - Node JS V 10.16.0 with npm or yarn
  - Quasar Js ( https://quasar.dev/quasar-cli/installation )
  - komodod ( https://github.com/KomodoPlatform/komodo )

## Run

First terminal:
(config komodo.conf -> run komodo)
```
komodod
```

Second terminal (ctrl + shit + t):
(run front)
```
git clone https://github.com/xdrkush/tuto-kapp-vue-node.git
cd tuto-kapp-vue-node/front
npm i
quasar dev
```

Third terminal (ctrl + shift + t):
```
cd ../back
npm i
nodemon server.js
```

