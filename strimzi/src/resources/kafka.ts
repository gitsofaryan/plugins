import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface KafkaCondition {
  type: string;
  status: string;
  reason?: string;
  message?: string;
  lastTransitionTime?: string;
}

export interface KafkaStatus {
  conditions?: KafkaCondition[];
  listeners?: Array<{
    type: string;
    addresses?: Array<{
      host: string;
      port: number;
    }>;
  }>;
  kafkaVersion?: string;
  observedGeneration?: number;
}

export interface KafkaSpec {
  kafka: {
    version?: string;
    replicas: number;
    listeners: any[];
    storage: any;
    config?: any;
  };
  zookeeper?: {
    replicas: number;
    storage: any;
  };
  entityOperator?: any;
}

export interface KafkaInterface extends KubeObjectInterface {
  spec: KafkaSpec;
  status?: KafkaStatus;
}

export class Kafka extends KubeObject<KafkaInterface> {
  static apiVersion = 'kafka.strimzi.io/v1beta2';
  static kind = 'Kafka';
  static apiName = 'kafkas';
  static isNamespaced = true;

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status || {};
  }

  get kafkaVersion(): string {
    return this.status.kafkaVersion || this.spec.kafka.version || 'unknown';
  }

  get replicas(): number {
    return this.spec.kafka.replicas || 0;
  }

  get readyStatus(): string {
    return this.status.conditions?.find(c => c.type === 'Ready')?.status || 'Unknown';
  }
}
