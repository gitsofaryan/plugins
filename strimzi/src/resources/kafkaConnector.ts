import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface KafkaConnectorSpec {
    class: string;
    tasksMax: number;
    config: { [key: string]: any };
    pause?: boolean;
}

export interface KafkaConnectorStatus {
    conditions?: {
        type: string;
        status: string;
        lastTransitionTime?: string;
        reason?: string;
        message?: string;
    }[];
    connectorStatus?: {
        connector: {
            state: string;
            worker_id: string;
        };
        name: string;
        tasks: {
            id: number;
            state: string;
            worker_id: string;
        }[];
        type: string;
    };
}

export default class KafkaConnector extends KubeObject {
    static kind = 'KafkaConnector';
    static apiName = 'kafkaconnectors';
    static apiVersion = 'kafka.strimzi.io/v1beta2';
    static isNamespaced = true;

    get spec() {
        return this.jsonData.spec;
    }

    get status() {
        return this.jsonData.status || {};
    }

    static get listRoute() {
        return 'strimzi/connect/connectors';
    }

    get listRoute() {
        return 'strimzi/connect/connectors';
    }
}
