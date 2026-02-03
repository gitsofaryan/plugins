import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface KafkaConnectSpec {
    replicas: number;
    version?: string;
    image?: string;
    bootstrapServers: string;
    config?: { [key: string]: any };
}

export interface KafkaConnectStatus {
    conditions?: {
        type: string;
        status: string;
        lastTransitionTime?: string;
        reason?: string;
        message?: string;
    }[];
    url?: string;
    replicas?: number;
    labelSelector?: string;
}

export default class KafkaConnect extends KubeObject {
    static kind = 'KafkaConnect';
    static apiName = 'kafkaconnects';
    static apiVersion = 'kafka.strimzi.io/v1beta2';
    static isNamespaced = true;

    get spec() {
        return this.jsonData.spec;
    }

    get status() {
        return this.jsonData.status || {};
    }

    static get listRoute() {
        return 'strimzi/connect/clusters';
    }

    get listRoute() {
        return 'strimzi/connect/clusters';
    }
}
