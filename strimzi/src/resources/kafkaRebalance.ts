import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface KafkaRebalanceSpec {
  mode?: 'full' | 'add-brokers' | 'remove-brokers';
  brokers?: number[];
  goals?: string[];
  skipHardGoalCheck?: boolean;
}

export interface KafkaRebalanceStatus {
  conditions?: any[];
  observedGeneration?: number;
  optimizationResult?: any;
  sessionId?: string;
}

export default class KafkaRebalance extends KubeObject {
  static kind = 'KafkaRebalance';
  static apiName = 'kafkarebalances';
  static apiVersion = 'kafka.strimzi.io/v1beta2';
  static isNamespaced = true;

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status || {};
  }

  static get listRoute() {
    return 'strimzi/rebalances';
  }

  get listRoute() {
    return 'strimzi/rebalances';
  }
}
