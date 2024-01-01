## node.js
### #2 노드 리액트 기초 강의 - NODE JS 와 EXPRESS JS 다운로드 하기
1. 디렉토리 만든다.
2. 터미널 이용해서, 디렉토리로 이동한다.
3. ***npm init*** 입력한다.
4. ***npm install express --save*** 입력한다
5. index.js 파일을 생성하고 아래의 코드 작성한다.

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

6. package.json의 "scripts" 안에 `"start" : "node index.js"` 작성해준다.  

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
    "express": "^4.17.1"
  }
}
```

### #3 노드 리액트 기초 강의 - 몽고 DB 연결
1. 몽고DB DB 생성 및 유저 생성
2. ***Connect***버튼 클릭 후, ***Connection String Only***에 존재하는 코드 복사
3. ***npm install mongoose --save*** 터미널에 입력
4. index.js에 코드 추가

```
const mongoose = require('mongoose')
mongoose.connect('mongodb://seeeop2:seeeop2@ac-zlksgxu-shard-00-00.psi31ps.mongodb.net:27017,ac-zlksgxu-shard-00-01.psi31ps.mongodb.net:27017,ac-zlksgxu-shard-00-02.psi31ps.mongodb.net:27017/?ssl=true&replicaSet=atlas-12avqi-shard-0&authSource=admin&retryWrites=true&w=majority',{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
  .then( () => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
```


### #7 노드 리액트 기초 강의 - BodyParser & PostMan & 회원 가입 기능
***
강의 내용과 다르게 내 코드에 에러가 생기는 문제를 해결하기 위해  
**package.json**에서 *express* , *mongoose* 의 버전을 낮춤.
`npm i` 터미널에 입력하여 패키지 재설치
***

1. 터미널에 ***npm install body-parser --save*** 입력하여 body-parser 설치
2. Postman 설치(다른 활용 툴 많음)
3. index.js에 아래 코드를 추가

```
const bodyParser = require('body-parser');
const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
```

4. 회원가입을 위한 POST 메소드 작성

```
app.post('/register', (req,res) => {

    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save( (err, userInfo) => {
      if(err) return res.json({success: false , err})
      return res.status(200).json({
        success : true
      })
    })
})
```
