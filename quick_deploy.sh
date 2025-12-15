COMMIT_MSG=${1:-"quick commit & deploy without msg - add later in squash message"}
git add .
git commit -am "$COMMIT_MSG"
git push