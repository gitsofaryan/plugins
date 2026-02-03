import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface KafkaBridgeSpec {
    replicas: number;
    image?: string;
    bootstrapServers: string;
    http: {
        port: number;
    };
}

export interface KafkaBridgeStatus {
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

export default class KafkaBridge extends KubeObject {
    static kind = 'KafkaBridge';
    static apiName = 'kafkabridges';
    static apiVersion = 'kafka.strimzi.io/v1beta2';
    static isNamespaced = true;

    get spec() {
        return this.jsonData.spec;
    }

    get status() {
        return this.jsonData.status || {};
    }

    static get listRoute() {
        return 'strimzi/bridges';
    }

    get listRoute() {
        return 'strimzi/bridges';
    }
}
