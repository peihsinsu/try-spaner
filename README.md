# Try Spaner

Spaner是Google所推出的Global Relational Database，讓傳統式全球各點同步的資料儲存方式的同步痛苦可以一次獲得解決！

## Pre-setup

* 啟用GCP project
* 建立所屬的Spanner instance
* 建立資料庫與Table (可參考最後初始化DB章節)

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

## 初始化DB

為了測試方便，這邊提供透過gcloud-node的套件來做DB與Table的建立動作，執行方式如下：

```
cd $PROJECT && node init-spanner-table.js
```

## 測試結果

建置這個測試專案是希望測試Spanner在資料的存取上的速度，透過一個簡單的RESTful程式可以測試一下儲存與返回這些動作的Latency... 目前觀察起來，大概在剛連線上Spanner instance後的第一次操作會比較慢一點... 大概5-6秒鐘的時間，之後的操作都維持在100ms左右。總結一些優點：

* Pay by use的資料儲存方式，直接算儲存空間的費用，不用再擔心資料爆炸需要擴容的議題...
* 可以scaleout instance來自行定義throughput的大小
* 具備交易能力，並且提供strongly consistent

## 參考資料

* Spanner簡介：https://cloud.google.com/spanner/
* gcloud-node spanner套件介紹：https://googlecloudplatform.github.io/google-cloud-node/#/
