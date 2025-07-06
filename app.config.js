import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: 'evf-check-in-app',
  slug: 'evf-check-in-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'evfcheckinapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.europeanvenousforum.evfcheckinapp',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: '0d9a80ae-736c-42bf-bf06-b010723af2a3',
    },
    EXPO_PUBLIC_EVENT_SCAN_CLIENT_ID: process.env.EXPO_PUBLIC_EVENT_SCAN_CLIENT_ID,
    EXPO_PUBLIC_EVENT_SCAN_APP_WEBHOOK_URL: process.env.EXPO_PUBLIC_EVENT_SCAN_APP_WEBHOOK_URL,
    EXPO_PUBLIC_EVENT_SCAN_CHECK_IN_WEBHOOK_URL: process.env.EXPO_PUBLIC_EVENT_SCAN_CHECK_IN_WEBHOOK_URL,
    EXPO_PUBLIC_EVENT_SCAN_ENCRYPTION_KEY: process.env.EXPO_PUBLIC_EVENT_SCAN_ENCRYPTION_KEY,
    EXPO_PUBLIC_EVENT_SCAN_WEBHOOK_SECRET: process.env.EXPO_PUBLIC_EVENT_SCAN_WEBHOOK_SECRET,
  },
  owner: 'europeanvenousforum',
});
