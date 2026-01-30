import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface KafkaConnectSpec {
  version?: string;
  replicas: number;
  bootstrapServers: string;
  config?: Record<string, any>;
}

export interface KafkaConnectStatus {
  conditions?: Array<{
    type: string;
    status: string;
    reason?: string;
    message?: string;
    lastTransitionTime?: string;
  }>;
  observedGeneration?: number;
  url?: string;
}

export interface KafkaConnectInterface extends KubeObjectInterface {
  spec: KafkaConnectSpec;
  status?: KafkaConnectStatus;
}

export class KafkaConnect extends KubeObject<KafkaConnectInterface> {
  static apiVersion = 'kafka.strimzi.io/v1beta2';
  static kind = 'KafkaConnect';
  static apiName = 'kafkaconnects';
  static isNamespaced = true;

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status || {};
  }

  get replicas(): number {
    return this.spec.replicas || 0;
  }

  get readyStatus(): string {
    return this.status.conditions?.find(c => c.type === 'Ready')?.status || 'Unknown';
  }
}
