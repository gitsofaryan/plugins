import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface KafkaUserSpec {
  authentication?: {
    type: 'tls' | 'scram-sha-512' | 'tls-external' | 'oauth';
  };
  authorization?: {
    type: 'simple';
    acls: any[];
  };
  template?: any;
}

export interface KafkaUserStatus {
  conditions?: Array<{
    type: string;
    status: string;
    reason?: string;
    message?: string;
    lastTransitionTime?: string;
  }>;
  observedGeneration?: number;
  username?: string;
}

export interface KafkaUserInterface extends KubeObjectInterface {
  spec: KafkaUserSpec;
  status?: KafkaUserStatus;
}

export class KafkaUser extends KubeObject<KafkaUserInterface> {
  static apiVersion = 'kafka.strimzi.io/v1beta2';
  static kind = 'KafkaUser';
  static apiName = 'kafkausers';
  static isNamespaced = true;

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status || {};
  }

  get authType(): string {
    return this.spec.authentication?.type || 'none';
  }

  get readyStatus(): string {
    return this.status.conditions?.find(c => c.type === 'Ready')?.status || 'Unknown';
  }
}
