import { ApiProxy } from '@kinvolk/headlamp-plugin/lib';

export async function isStrimziInstalled(): Promise<boolean> {
  try {
    const response = await ApiProxy.request('/apis/kafka.strimzi.io/v1beta2', {
      method: 'GET',
    });
    return !!response;
  } catch (error) {
    return false;
  }
}
