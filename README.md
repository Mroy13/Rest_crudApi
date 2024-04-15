### setup
inside config file change password and database name

run in cmd line:

inside root folder:

npm install

inside src
for create table:
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string


for insert into local db:
 npx sequelize-cli db:migrate:all


