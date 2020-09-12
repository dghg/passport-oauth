# nodejs passport authentication

## DB(Mysql)
 - USER(email, 이름, )
 
## Router
 - #### GET
  - GET / : Request의 authentication 여부 확인 후 로그인 또는 메인 렌더링
  - GET /join : 회원가입 페이지 렌더링
  - GET /logout : 로그아웃
 - #### POST
   - POST /auth/join : 회원가입 수행
   - POST /auth/login : Localstrategy 로그인 수행
   - POST /auth/kakao : Kakao 인증 수행
   - POST /auth/google
   - POST /auth/facebook

## Strategy
 - local strategy
 - facebook
 - kakao
 - google
 
 
## View
https://bootsnipp.com/snippets/o85lM 