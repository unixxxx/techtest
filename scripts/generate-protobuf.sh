#!/usr/bin/env bash
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
PROTO_DIR=api/proto/v1
OUT_DIR=src/app/api/proto/v1

rm -rf $OUT_DIR

mkdir -p $OUT_DIR

for file in "${PROTO_DIR}"/*.proto; do
  if [[ -f $file ]]; then
    echo "---> handling '$file'"
    echo
    echo "---> generating typescript files..."
    protoc \
      --proto_path="${PROTO_DIR}" \
      --proto_path=api/proto/third_party \
      --plugin=$GOPATH/bin/protoc-gen-swagger \
      --swagger_out=disable_default_errors=true,simple_operation_ids=true,logtostderr=true:api/swagger/v1 \
      --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
      --js_out=import_style=commonjs,binary:${OUT_DIR} \
      --ts_out=${OUT_DIR} \
      $(basename $file)
  fi
done
for f in "${OUT_DIR}"/*.js; do
  echo '/* eslint-disable */' | cat - "${f}" >temp && mv temp "${f}"
done
