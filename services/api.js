import axios from 'axios';
import { Platform } from 'react-native';

const ANDROID_EMULATOR = 'http://10.0.2.2:5000';
const IOS_SIMULATOR = 'http://localhost:5000';

export const api = axios.create({
  baseURL: Platform.select({
    android: ANDROID_EMULATOR,
    ios: IOS_SIMULATOR,
    default: 'http://localhost:5000'
  }) + '/api',
  timeout: 10000
});

api.interceptors.response.use(
  r => r,
  e => {
    console.log('API error:', e?.response?.data || e.message);
    throw e;
  }
);