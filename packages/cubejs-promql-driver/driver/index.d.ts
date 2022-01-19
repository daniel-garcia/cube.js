import { PrometheusConnectionOptions } from 'prometheus-query';
import { BaseDriver } from "@cubejs-backend/query-orchestrator";

declare module "@cubejs-backend/promql-driver" {
  export type PromqlDriverOptions = Pick<PrometheusConnectionOptions, 'endpoint'>;

  export default class PromqlDriver extends BaseDriver {
    constructor(options?: PromqlDriverOptions);
  }
}
