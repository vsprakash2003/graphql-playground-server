## Git commands
### to setup remote repository
```git commands
git remote add origin https://github.com/vsprakash2003/graphql-playground-server.git
```
### to create develop branch
```git commands
git checkout -b origin/develop
git add .
git commit -m "first commit"
git push -u origin origin/develop
```
### to commit to develop branch
```git commands
git init
git add .
git commit -m "second commit"
git push -u origin develop 
```
### for approving pull request and merging to master branch
``` PR instructions
click on Pull requests tab in github. If there is a PR waiting for approval you will see one
If there are merge conflicts, tell the committer(s) to pull develop again and review from beginning when they are finished
merge pull request via GitHub online interface. select "squash and merge" in the dropdown
```

### for merging develop branch to master
```git commands
git rebase origin/master
perform the pull request steps from develop branch as detailed above to merge to master
```

## PostgreSql and Sequalize setup
### for setting up the PostgreSql DB
`brew install PostgreSql`

### check installed version
`postgres --version`

### initialize a DB if not already done
`initdb /usr/local/var/postgres`
the above command might throw an error if the DB was already initialized.

### start and stop DB server
`pg_ctl -D /usr/local/var/postgres start`

`pg_ctl -D /usr/local/var/postgres stop`

### create a database
`createdb graphqlplaground`
1. update environment variable with DB name
   
### list all databases
`psql graphqlplaground`
`\list`

### create a super user with password
`psql graphqlplayground`
`CREATE ROLE userid WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD 'password';`
1. update the environment variable with user and password

### check list of users
`psql graphqlplaground`
`\du`

### check tables after npm start
`psql graphqlplaground`
`select * from users;`

## generate a random secret key and JWT token
1. go to any password generator site and generate the secret key
2. to generate a token, one can use `openssl rand 256 | base64`