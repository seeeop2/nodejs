## node.js

### #2 노드 리액트 기초 강의 - NODE JS 와 EXPRESS JS 다운로드 하기

1. 디렉토리 만든다.
2. 터미널 이용해서, 디렉토리로 이동한다.
3. **_npm init_** 입력한다.
4. **_npm install express --save_** 입력한다
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
2. **_Connect_**버튼 클릭 후, **_Connection String Only_**에 존재하는 코드 복사
3. **_npm install mongoose --save_** 터미널에 입력
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

---

강의 내용과 다르게 내 코드에 에러가 생기는 문제를 해결하기 위해  
**package.json**에서 _express_ , _mongoose_ 의 버전을 낮춤.  
`npm i` 터미널에 입력하여 패키지 재설치

---

1. 터미널에 **_npm install body-parser --save_** 입력하여 body-parser 설치
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

---

**_Nodemon_** 은 변경된 파일이 있을 때, 자동으로 변경된 부분을 반영해준다.  
**_spring boot devtools_** 와 동일하게 변경 감지 해준다.

---

1. `npm install nodemon --save-dev` 터미널에 입력한다.  
   `-dev`가 붙으면 로컬 환경에서만 사용
2. package.json의 "scripts" 안에 `"backend" : "nodemon index.js"` 작성해준다.
3. `npm run nodemon`을 입력하면 노드몬을 활용하여 서버 ON

### #9 노드 리액트 기초 강의 - 비밀 설정 정보 관리

---

Github에 mongoDB 설정 파일이 올라가면 아무나 DB를 사용할 수 있기에,  
설정 파일을 따로 관리한 뒤, gitignore 설정하기

---

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

---

DB에 비밀번호 같이 중요한 정보는 암호화가 필요하다.
Bcrypt로 비밀번호를 암호화 하기

---

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

- userSchema.pre()
  - index.js의 `/register` 라우터에서 user.save() 하기 전에 실행이 되는 메소드임.
- next() \* 다음에 실행되어야 할 user.save()로 진행되는 메소드임.
  ![mongoDB_Bcrypt](./images/img_1.png)

### #11 노드 리액트 기초 강의 - 로그인 기능 with Bcrypt (1)

---

로그인 시도를 하면,

1. 데이터베이스에 요청된 이메일이 있는지 찾는다.
2. 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는지 확인한다.

- 토큰 생성은 #12에서 진행할 예정

---

1. `index.js` 파일에 `/login` 라우터를 생성한다.

```
app.post('/login', (req, res) =>{

  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password , (err , isMatch) => {
      if(!isMatch)
        return res.json({loginSuccess : false, message: "비밀번호가 틀렸습니다."})

	  //비밀번호 까지 맞다면, 토큰을 생성하기.
      user.generateToken((err, user) => {
	      //토큰 부분은 #12 에서 진행할 예정
      })
    })
  })
})
```

2. `User.js` userSchema.pre() 메소드의 if문에 else를 추가해준다. (지난 시간 놓친 부분)

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
    } else {		//수정 안했을 때 바로 next() 메소드 실행
        next()
    }
})
```

3. `User.js`에 입력한 비밀번호 - 암호화된 비밀번호 비교 메소드를 작성한다.

```
userSchema.methods.comparePassword = function(plainPassword, cb) {

    //plainPassword : 1234567, 암호화된 비밀번호 : $2b$10$isDQ/8NnoTVw8lTKpKXOKOwuuMGTNBZVuR49ao3ujKAf2i/2eLipK
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null,isMatch)
    })
}

```

### #12 노드 리액트 기초 강의 - 토큰 생성 with jsonwebtoken

---

- **_Prettier_** 확장프로그램을 적용함.
- #11에서 plainPassword 와 암호화된 비밀번호 비교하는 부분에서 무한 로딩을 일으키는 오타가 있었는데, #12에서 수정함.

---

1. `npm install jsonwebtoken --save` 패키지 추가하기.
2. `User.js` 에 메소드 추가하기

```
userSchema.methods.generateToken = function (cb) {
  var user = this;

  //jsonwebtoken을 이용해서 token을 생성하기

  var token = jwt.sign(user._id.toHexString(), "secretToken");
  //user._id + 'secretToken' = token
  // ->
  //'secretToken' -> 'user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
```

3. `npm install cookie-parser --save` 패키지를 추가해준다.
4. `index.js`에 아래의 코드를 추가

```
const cookieParser = require('cookie-parser');

app.use(cookieParser());
```

5. #11 내용에 이어서 `index.js` 파일에 토큰 생성하는 메소드를 작성한다.

```
      //비밀번호 까지 맞다면, 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        res.cookie("x_auth", user.token )
        .status(200)
        .json({loginSuccess : true , userId: user._id})
      })
```

6. 로그인 메소드 호출해보기

```
{
  "email" : "test1@naver.com",
  "password" : "1234567"
}
```
