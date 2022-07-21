git reset --mixed
git stash --include-untracked
git reset --hard deploy/web
git pull https://$GIT_TOKEN@github.com/vdtsol/vCheck deploy/web --allow-unrelated-histories
cp .env.example .env.production
npm i
pm2 reload vcheck