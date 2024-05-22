### install

- npm i or yarn

### run

- npm run dev or yarn dev

### pull

- git pull origin main

<!-- GET -->

/attend -
[
{
"date": "string",
"id": 0,
"time": "string",
"userID": 0
}
]

/users -
[
{
"attends": [
{
"date": "string",
"id": 0,
"time": "string",
"userID": 0
}
],
"id": 0,
"name": "string",
"nickname": "string",
"phone": "string"
}
]

/users/{id} -
{
"attends": [
{
"date": "string",
"id": 0,
"time": "string",
"userID": 0
}
],
"id": 0,
"name": "string",
"nickname": "string",
"phone": "string"
}

<!-- user의 role dog(유저), human(관리자) -->
<!-- /POST  -->

/attends

/users/login - text, accessToken,userID

/users/signup

<!-- DELETE -->

/attends
