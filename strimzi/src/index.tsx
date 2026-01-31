import { Icon } from '@iconify/react';
import {
    registerKindIcon,
    registerRoute,
    registerSidebarEntry,
} from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { KafkaDetails } from './components/Kafka/Details';
import { KafkaList } from './components/Kafka/List';
import { KafkaConnectList } from './components/KafkaConnect/List';
import { KafkaConnectDetails } from './components/KafkaConnect/Details';
import { KafkaConnectorList } from './components/KafkaConnector/List';
import { KafkaConnectorDetails } from './components/KafkaConnector/Details';
import { KafkaTopicDetails } from './components/KafkaTopic/Details';
import { KafkaTopicList } from './components/KafkaTopic/List';
import { KafkaUserList } from './components/KafkaUser/List';

console.log('Strimzi Plugin: Registering sidebar entries...');
// Main Strimzi sidebar entry
registerSidebarEntry({
    name: 'Strimzi',
    url: '/strimzi/clusters',
    icon: 'simple-icons:apachekafka',
    parent: null,
    label: 'Strimzi (Dev)',
});

// Sub-menu entries
registerSidebarEntry({
    name: 'Kafka Clusters',
    url: '/strimzi/clusters',
    parent: 'Strimzi',
    label: 'Clusters',
});

registerSidebarEntry({
    name: 'Kafka Topics',
    url: '/strimzi/topics',
    parent: 'Strimzi',
    label: 'Topics',
});

registerSidebarEntry({
    name: 'Kafka Users',
    url: '/strimzi/users',
    parent: 'Strimzi',
    label: 'Users',
});

registerSidebarEntry({
    name: 'Connect',
    url: '/strimzi/connect-clusters',
    parent: 'Strimzi',
    label: 'Connect',
});

registerSidebarEntry({
    name: 'Connect Clusters',
    url: '/strimzi/connect-clusters',
    parent: 'Connect',
    label: 'Clusters',
});

registerSidebarEntry({
    name: 'Connectors',
    url: '/strimzi/connectors',
    parent: 'Connect',
    label: 'Connectors',
});

// Routes
registerRoute({
    path: '/strimzi/clusters',
    sidebar: 'Kafka Clusters',
    name: 'Kafka Clusters',
    component: () => <KafkaList />,
});

registerRoute({
    path: '/strimzi/clusters/:namespace/:name',
    sidebar: 'Kafka Clusters',
    name: 'Kafka Cluster Details',
    component: () => <KafkaDetails />,
});

registerRoute({
    path: '/strimzi/topics',
    sidebar: 'Kafka Topics',
    name: 'Kafka Topics',
    component: () => <KafkaTopicList />,
});

registerRoute({
    path: '/strimzi/topics/:namespace/:name',
    sidebar: 'Kafka Topics',
    name: 'Kafka Topic Details',
    component: () => <KafkaTopicDetails />,
});

registerRoute({
    path: '/strimzi/users',
    sidebar: 'Kafka Users',
    name: 'Kafka Users',
    component: () => <KafkaUserList />,
});

registerRoute({
    path: '/strimzi/connect-clusters',
    sidebar: 'Connect Clusters',
    name: 'Connect Clusters',
    component: () => <KafkaConnectList />,
});

registerRoute({
    path: '/strimzi/connectors',
    sidebar: 'Connectors',
    name: 'Kafka Connectors',
    component: () => <KafkaConnectorList />,
});

registerRoute({
    path: '/strimzi/connect-clusters/:namespace/:name',
    sidebar: 'Connect Clusters',
    name: 'Kafka Connect Cluster Details',
    component: () => <KafkaConnectDetails />,
});

registerRoute({
    path: '/strimzi/connectors/:namespace/:name',
    sidebar: 'Connectors',
    name: 'Kafka Connector Details',
    component: () => <KafkaConnectorDetails />,
});

// Register icons
registerKindIcon('Kafka', {
    icon: <Icon icon="simple-icons:apachekafka" width="70%" height="70%" />,
    color: '#231F20',
});

registerKindIcon('KafkaTopic', {
    icon: <Icon icon="mdi:playlist-check" width="70%" height="70%" />,
    color: '#e38200',
});

registerKindIcon('KafkaUser', {
    icon: <Icon icon="mdi:account-key" width="70%" height="70%" />,
    color: '#007bff',
});

registerKindIcon('KafkaConnect', {
    icon: <Icon icon="mdi:vector-combine" width="70%" height="70%" />,
    color: '#5d10ad',
});

registerKindIcon('KafkaConnector', {
    icon: <Icon icon="mdi:link-variant" width="70%" height="70%" />,
    color: '#5d10ad',
});