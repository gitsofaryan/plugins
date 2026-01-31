# Strimzi Headlamp Plugin

A professional Headlamp plugin for managing Strimzi Kafka resources.

## 🚀 Getting Started

### Prerequisites
- [Headlamp](https://headlamp.dev) installed.
- Access to a Kubernetes cluster with the [Strimzi Operator](https://strimzi.io/) installed.

### Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm start
    ```
    This will start the plugin development server. You can then view it in Headlamp (running on `http://localhost:4466` by default) at `http://localhost:3000`.

3.  **Build for production**:
    ```bash
    npm run build
    ```

### Installation

To manually install the plugin in your Headlamp instance:

1.  Build the plugin: `npm run build`
2.  Copy the contents of the `dist` folder to your Headlamp plugins directory:
    - **Windows**: `%APPDATA%\Headlamp\plugins\strimzi`
    - **Linux**: `~/.config/Headlamp/plugins/strimzi`
    - **macOS**: `~/Library/Application Support/Headlamp/plugins/strimzi`
3.  Restart Headlamp.

## ✨ Features
- **Kafka Cluster Management**: Monitor health, version, and replicas.
- **Topic Browser**: View partitions, replication status, and configurations.
- **User management**: Track authentication types and ACL status.
- **Connect & Connectors**: Manage Kafka Connect clusters and individual connectors.
- **Smart Installation Check**: Automatically detects if Strimzi is installed.

## 🛠️ Tech Stack
- **React + TypeScript**
- **Headlamp Plugin SDK**
- **Iconify** for professional iconography.
