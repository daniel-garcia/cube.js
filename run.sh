docker run -p 4000:4000 \
  -v ${PWD}:/cube/conf \
  -e CUBEJS_DEV_MODE=true \
  -e CUBEJS_DB_TYPE=promql \
  -e CUBEJS_DB_HOST=host.docker.internal \
  -e CUBEJS_DB_PORT=9090 \
  cubejs/cube:dev

