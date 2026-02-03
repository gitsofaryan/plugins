import { ApiProxy } from '@kinvolk/headlamp-plugin/lib';

export async function isStrimziInstalled(): Promise<boolean> {
  const pathsToCheck = [
    '/apis/kafka.strimzi.io/v1beta2', // Standard
    '/apis/kafka.strimzi.io/v1alpha1', // Older
    '/apis/apiextensions.k8s.io/v1/customresourcedefinitions/kafkas.kafka.strimzi.io' // CRD check
  ];

  for (const path of pathsToCheck) {
    try {
      await ApiProxy.request(path, { method: 'GET' });
      return true;
    } catch (e) {
      continue;
    }
  }
  return false;
}
