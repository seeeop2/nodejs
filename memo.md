## node.js
### #2 노드 리액트 기초 강의 - NODE JS 와 EXPRESS JS 다운로드 하기
1.디렉토리 만든다.  
2.터미널 이용해서, 디렉토리로 이동한다.  
3.***npm init*** 입력한다.  
4.***npm install express --save*** 입력한다  
5.index.js 파일을 생성하고 아래의 코드 작성한다.  

```
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
6.package.json의 "scripts" 안에 "start" : "node index.js" 을 작성해준다.  

```
{
  "name": "boiler-plate",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start" : "node index.js",	//start 스크립트를 작성하여, 터미널에서 'npm run start' 서버 시작
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "seeeop2",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### #3 노드 리액트 기초 강의 - 몽고 DB 연결
1.몽고DB DB 생성 및 유저 생성  
2.***Connect***버튼 클릭 후, ***Connection String Only***에 존재하는 코드 복사  
3.***npm install mongoose --save*** 터미널에 입력  
4.index.js에 코드 추가  

```
const mongoose = require('mongoose')
mongoose.connect('mongodb://seeeop2:seeeop2@ac-zlksgxu-shard-00-00.psi31ps.mongodb.net:27017,ac-zlksgxu-shard-00-01.psi31ps.mongodb.net:27017,ac-zlksgxu-shard-00-02.psi31ps.mongodb.net:27017/?ssl=true&replicaSet=atlas-12avqi-shard-0&authSource=admin&retryWrites=true&w=majority')   //오류로 인해 강의에서 안내한 옵션 제거 및 MongoDB Driver 5.5 or later -> 2.2.12 or later 
  .then( () => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
```

