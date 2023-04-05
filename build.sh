// build.sh
set -o errexit

yarn install
yarn tsc
yarn typeorm migration:run -d dist/data-source