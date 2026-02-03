import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface KafkaTopicSpec {
  topicName?: string;
  partitions: number;
  replicas: number;
  config?: Record<string, string>;
}

export interface KafkaTopicStatus {
  conditions?: Array<{
    type: string;
    status: string;
    reason?: string;
    message?: string;
    lastTransitionTime?: string;
  }>;
  observedGeneration?: number;
  topicName?: string;
}

export interface KafkaTopicInterface extends KubeObjectInterface {
  spec: KafkaTopicSpec;
  status?: KafkaTopicStatus;
}

export class KafkaTopic extends KubeObject<KafkaTopicInterface> {
  static apiVersion = 'kafka.strimzi.io/v1beta2';
  static kind = 'KafkaTopic';
  static apiName = 'kafkatopics';
  static isNamespaced = true;

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status || {};
  }

  get topicName(): string {
    return this.spec?.topicName || this.metadata.name;
  }

  get partitions(): number {
    return this.spec?.partitions || 0;
  }

  get replicas(): number {
    return this.spec?.replicas || 0;
  }

  get readyStatus(): string {
    return this.status.conditions?.find(c => c.type === 'Ready')?.status || 'Unknown';
  }
}
