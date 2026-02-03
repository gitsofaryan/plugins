import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface KafkaMirrorMaker2Spec {
  replicas: number;
  image?: string;
  connectCluster?: string;
  clusters: any[];
  mirrors: any[];
}

export interface KafkaMirrorMaker2Status {
  conditions?: any[];
  observedGeneration?: number;
  replicas?: number;
  url?: string;
}

export default class KafkaMirrorMaker2 extends KubeObject {
  static kind = 'KafkaMirrorMaker2';
  static apiName = 'kafkamirrormaker2s';
  static apiVersion = 'kafka.strimzi.io/v1beta2';
  static isNamespaced = true;

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status || {};
  }

  static get listRoute() {
    return 'strimzi/mirrormaker2';
  }

  get listRoute() {
    return 'strimzi/mirrormaker2';
  }
}
