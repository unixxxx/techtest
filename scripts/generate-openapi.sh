#!/usr/bin/env bash
#openapi-generator generate -i /Users/ckr/git/tg-tokend/api/swagger/v1/authentication-service.swagger.json \
#    -g typescript-rxjs -o ~/git/tg-taurus-issuer/src/app/generated
#openapi-generator generate -i /Users/ckr/git/tg-tokend/api/swagger/v1/contract-service.swagger.json \
#    -g typescript-rxjs -o ~/git/tg-taurus-issuer/src/app/generated \
echo $(jq -s 'reduce .[] as $item ({}; . * $item)' api/swagger/v1/*) >json.json
dest=src/app/api/openapi/v1
rm -rf ${dest}
./node_modules/.bin/openapi-generator generate -i json.json \
  -g typescript-angular -o ${dest} \
  -p supportsES6=true \
  -p useSingleRequestParameter=false \
  -p typescriptThreePlus=true \
  --type-mappings=DateTime=string
rm json.json
#rm -rf ${dest}/dist

#custom fix because of https://github.com/OpenAPITools/openapi-generator/issues/2745
#check if openapi-generator 5.0.x is out that should solve the issue
for file in "${dest}"/api/*.ts; do
  sed -i '' 's/.toISOString().substr(0, 10)/.toISOString()/g' $file
done

#sed -i 's/.toISOString().substr(0, 10)/.toISOString()/g' $file
#sed 's/.toISOString().substr(0, 10)/.toISOString()/'
