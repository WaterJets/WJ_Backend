You need NodeJs 10.0.0 or higher

type to install dependencies:
npm install

Example Json POST to send to localhost:8080/api/article
{
	"title": "Beng",
	"author": "Faplo",
	"message": "Lorem Ipsum",
	"header": "bengier in"
}


Example result of GET to localhost:8080/api/article
{
    "id": 1,
    "author": "Faplo",
    "title": "Beng",
    "message": "Lorem Ipsum",
    "header": "bengier in",
    "createdAt": "2018-11-26T23:16:27.242Z",
    "updatedAt": "2018-11-26T23:16:27.242Z"
}

Create postgres database:
	You can use pgadmin for it. Settings
	 "username": "postgres",
    "password": 123,
    "database": "WaterJets",
    "host": "127.0.0.1",
    port is propably 5432

    propably you need to change password of postgres user to 123. Sometimes also create user postgres.

Type to create tables from model:
sequelize db:migrate

type nodejs app.js   or run it in IDE.