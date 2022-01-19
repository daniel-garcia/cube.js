docker run -p 4000:4000 \
  -v ${PWD}:/cube/conf \
  -e CUBEJS_DEV_MODE=true \
  -e CUBEJS_DB_TYPE=promql \
  -e CUBEJS_DB_URL=http://host.docker.internal:9090 \
  cubejs/cube:dev

