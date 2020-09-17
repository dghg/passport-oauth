# nodejs passport authentication

## DB(Mysql)
 - USER
  - id : primary key
  - user_id : id
  - nick : nickname
  - password : password ( null if social login)
  - provider : local / kakao/ facebook/ google
 - password가 null값일 수 있음.(localstrategy 가 아닐때) >> 1NF 만족X
## Router
 - #### GET
  - GET / : Request의 authentication 여부 확인 후 로그인 또는 메인 렌더링
  - GET /join : 회원가입 페이지 렌더링
  - GET /logout : 로그아웃
  - GET /auth/kakao : kakao 인증
  - GET /auth/facebook : 페이스북 인증
  - GET /auth/google : 구글 인증
 - #### POST
   - POST /auth/join : 회원가입 수행 >> 
   - POST /auth/login : Localstrategy 로그인 수행

## Strategy
 - local strategy
 - facebook(https 필요)
 - kakao
 - google
 
 
## View
https://bootsnipp.com/snippets/o85lM 