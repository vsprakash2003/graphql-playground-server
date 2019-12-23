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