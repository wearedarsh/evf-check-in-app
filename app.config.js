import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: 'evf-how-check-in-app',
  slug: 'evf-how-check-in-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'evfhowcheckinapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.europeanvenousforum.evfhowcheckinapp',
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
    'expo-secure-store',
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
      projectId: "dab8ff82-cb1b-4f34-a4e5-2223f853a94a"
    },
    EVENT_SCAN_APP_WEBHOOK_URL: process.env.EVENT_SCAN_APP_WEBHOOK_URL,
    EVENT_SCAN_CHECK_IN_WEBHOOK_URL: process.env.EVENT_SCAN_CHECK_IN_WEBHOOK_URL,
  },
  owner: 'europeanvenousforum',
});
