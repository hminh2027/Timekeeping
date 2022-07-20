git reset --mixed
git stash --include-untracked
git reset --hard deploy/api
git pull https://$GIT_TOKEN@github.com/vdtsol/vCheck deploy/api --allow-unrelated-histories
cp .env.temp .env.development
npm i
pm2 reload apivcheck