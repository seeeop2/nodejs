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

### #8 노드 리액트 기초 강의 - Nodemon 설치
***
***Nodemon*** 은 변경된 파일이 있을 때, 자동으로 변경된 부분을 반영해준다.  
***spring boot devtools*** 와 동일하게 변경 감지 해준다.
***
1. `npm install nodemon --save-dev` 터미널에 입력한다.  
`-dev`가 붙으면 로컬 환경에서만 사용
2. package.json의 "scripts" 안에 `"backend" : "nodemon index.js"` 작성해준다.
3. `npm run nodemon`을 입력하면 노드몬을 활용하여 서버 ON

### #9 노드 리액트 기초 강의 - 비밀 설정 정보 관리
***
Github에 mongoDB 설정 파일이 올라가면 아무나 DB를 사용할 수 있기에,  
설정 파일을 따로 관리한 뒤, gitignore 설정하기
***
1. config 디렉토리를 만든다.
2. config 디렉토리에 `dev.js` 파일을 만들고, 아래의 코드를 작성한다.
```
module.exports = {
    mongoURI: 'mongodb://seeeop2:seeeop2@ac-zlksgxu-shard-00-00.psi31ps.mongodb.net:27017,ac-zlksgxu-shard-00-01.psi31ps.mongodb.net:27017,ac-zlksgxu-shard-00-02.psi31ps.mongodb.net:27017/?ssl=true&replicaSet=atlas-12avqi-shard-0&authSource=admin&retryWrites=true&w=majority'
}
```
3. config 디렉토리에 `prod.js` 파일을 만들고, 아래의 코드를 작성한다.
```
module.exports= {
    mongoURI : process.env.MONGO_URI	//이건 나중에 배포하는 사이트 참고
}
```
4. config 디렉토리에 `key.js` 파일을 만들고, 아래의 코드를 작성한다.
```
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else{
    module.exports = require('./dev');
}
```
5. `index.js` 파일에 내용 추가 및 일부 수정
```
const config = require('./config/key');
```

```
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {		//<-------원래는 mongoDB URI가 길게 적혀 있었음
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
  .then( () => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
```
6. `npm run start` 서버를 실행하여, 잘 작동하는지 확인한다.
7. .gitignore에 `dev.js` 추가하기


### #10 노드 리액트 기초 강의 - Bcrypt로 비밀번호 암호화 하기
***
DB에 비밀번호 같이 중요한 정보는 암호화가 필요하다.
Bcrypt로 비밀번호를 암호화 하기
***
1. `npm install bcrypt --save` 터미널에 입력하여 패키지 추가하기.
2. `User.js`에 아래 코드를 추가한다.
```
const bcrypt = require('bcrypt');
const saltRounds = 10
```
```
userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password,salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})
```
* userSchema.pre() 
	*  index.js의 `/register` 라우터에서 user.save() 하기 전에 실행이 되는 메소드임.
* next()
	* 다음에 실행되어야 할 user.save()로 진행되는 메소드임.
![mongoDB_Bcrypt](./images/img_1.png)