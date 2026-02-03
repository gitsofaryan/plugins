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
import { KafkaUserDetails } from './components/KafkaUser/Details';
import { KafkaBridgeList } from './components/KafkaBridge/List';
import { KafkaBridgeDetails } from './components/KafkaBridge/Details';
import { KafkaMirrorMaker2List } from './components/KafkaMirrorMaker2/List';
import { KafkaMirrorMaker2Details } from './components/KafkaMirrorMaker2/Details';
import { KafkaNodePoolList } from './components/KafkaNodePool/List';
import { KafkaNodePoolDetails } from './components/KafkaNodePool/Details';
import { KafkaRebalanceList } from './components/KafkaRebalance/List';
import { KafkaRebalanceDetails } from './components/KafkaRebalance/Details';

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

registerSidebarEntry({
    name: 'Kafka Bridges',
    url: '/strimzi/bridges',
    parent: 'Strimzi',
    label: 'Bridges',
});

registerSidebarEntry({
    name: 'MirrorMaker 2',
    url: '/strimzi/mirrormaker2',
    parent: 'Strimzi',
    label: 'MirrorMaker 2',
});

registerSidebarEntry({
    name: 'Node Pools',
    url: '/strimzi/nodepools',
    parent: 'Strimzi',
    label: 'Node Pools',
});

registerSidebarEntry({
    name: 'Rebalances',
    url: '/strimzi/rebalances',
    parent: 'Strimzi',
    label: 'Rebalances',
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
    path: '/strimzi/users/:namespace/:name',
    sidebar: 'Kafka Users',
    name: 'Kafka User Details',
    component: () => <KafkaUserDetails />,
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
    path: '/strimzi/bridges',
    sidebar: 'Kafka Bridges',
    name: 'Kafka Bridges',
    component: () => <KafkaBridgeList />,
});

registerRoute({
    path: '/strimzi/bridges/:namespace/:name',
    sidebar: 'Kafka Bridges',
    name: 'Kafka Bridge Details',
    component: () => <KafkaBridgeDetails />,
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

registerRoute({
    path: '/strimzi/mirrormaker2',
    sidebar: 'MirrorMaker 2',
    name: 'MirrorMaker 2',
    component: () => <KafkaMirrorMaker2List />,
});

registerRoute({
    path: '/strimzi/mirrormaker2/:namespace/:name',
    sidebar: 'MirrorMaker 2',
    name: 'MirrorMaker 2 Details',
    component: () => <KafkaMirrorMaker2Details />,
});

registerRoute({
    path: '/strimzi/nodepools',
    sidebar: 'Node Pools',
    name: 'Kafka Node Pools',
    component: () => <KafkaNodePoolList />,
});

registerRoute({
    path: '/strimzi/nodepools/:namespace/:name',
    sidebar: 'Node Pools',
    name: 'Kafka Node Pool Details',
    component: () => <KafkaNodePoolDetails />,
});

registerRoute({
    path: '/strimzi/rebalances',
    sidebar: 'Rebalances',
    name: 'Kafka Rebalances',
    component: () => <KafkaRebalanceList />,
});

registerRoute({
    path: '/strimzi/rebalances/:namespace/:name',
    sidebar: 'Rebalances',
    name: 'Kafka Rebalance Details',
    component: () => <KafkaRebalanceDetails />,
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

registerKindIcon('KafkaBridge', {
    icon: <Icon icon="mdi:bridge" width="70%" height="70%" />,
    color: '#5d10ad',
});

registerKindIcon('KafkaMirrorMaker2', {
    icon: <Icon icon="mdi:swap-horizontal" width="70%" height="70%" />,
    color: '#5d10ad',
});
registerKindIcon('KafkaNodePool', {
    icon: <Icon icon='mdi:server-network' width='70%' height='70%' />,
    color: '#231F20',
});

registerKindIcon('KafkaRebalance', {
    icon: <Icon icon='mdi:scale-balance' width='70%' height='70%' />,
    color: '#e38200',
});
