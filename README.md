# Try Spaner

Spaner是Google所推出的Global Relational Database，讓傳統式全球各點同步的資料儲存方式的同步痛苦可以一次獲得解決！

## Pre-setup

* 啟用GCP project
* 建立所屬的Spanner instance
* 建立資料庫與Table

## Project Setup

請使用GCE主機或是CloudShell來安裝此專案，這樣可以少去設定Service Account的部分，如果需要在其他地方執行，請參考Google [gcloud-node](https://github.com/GoogleCloudPlatform/google-cloud-node)專案。

安裝：

```
git clone ... && cd try-spanner && npm install
```

Start專案：

```
npm start
```

## 測試

查詢所有insertted singer資料：

```
time curl -sS localhost:3000/singer/list | json
```

新增一筆singer資料：

```
time curl -sS localhost:3000/singer/1 -d firstname=simon -d lastname=su -X POST
```
