// build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn add global typescript
yarn build
yarn typeorm migration:run -d dist/data-source