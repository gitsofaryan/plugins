import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface KafkaConnectorSpec {
  class: string;
  tasksMax?: number;
  config?: Record<string, any>;
  pause?: boolean;
}

export interface KafkaConnectorStatus {
  conditions?: Array<{
    type: string;
    status: string;
    reason?: string;
    message?: string;
    lastTransitionTime?: string;
  }>;
  observedGeneration?: number;
  connectorStatus?: {
    name: string;
    connector: {
      state: string;
      worker_id: string;
    };
    tasks: Array<{
      id: number;
      state: string;
      worker_id: string;
    }>;
    type: string;
  };
}

export interface KafkaConnectorInterface extends KubeObjectInterface {
  spec: KafkaConnectorSpec;
  status?: KafkaConnectorStatus;
}

export class KafkaConnector extends KubeObject<KafkaConnectorInterface> {
  static apiVersion = 'kafka.strimzi.io/v1beta2';
  static kind = 'KafkaConnector';
  static apiName = 'kafkaconnectors';
  static isNamespaced = true;

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status || {};
  }

  get state(): string {
    return this.status.connectorStatus?.connector?.state || 'Unknown';
  }

  get readyStatus(): string {
    return this.status.conditions?.find(c => c.type === 'Ready')?.status || 'Unknown';
  }
}
