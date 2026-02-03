import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface KafkaNodePoolSpec {
  replicas: number;
  roles: Array<'controller' | 'broker'>;
  storage: any;
  resources?: any;
  template?: any;
}

export interface KafkaNodePoolStatus {
  conditions?: any[];
  observedGeneration?: number;
  replicas?: number;
  labelSelector?: string;
  roles?: string[];
}

export default class KafkaNodePool extends KubeObject {
  static kind = 'KafkaNodePool';
  static apiName = 'kafkanodepools';
  static apiVersion = 'kafka.strimzi.io/v1beta2';
  static isNamespaced = true;

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status || {};
  }

  static get listRoute() {
    return 'strimzi/nodepools';
  }

  get listRoute() {
    return 'strimzi/nodepools';
  }
}
