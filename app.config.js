module.exports = {
  expo: {
    name: "Observe",
    slug: "Observe",
    owner: "observe",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    assetBundlePatterns: ["**/*"],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      googleServicesFile: "./google-services.json",
      package: "com.observe.app",
    },
    ios: {
      googleServicesFile: "./GoogleService-Info.plist",
      bundleIdentifier: "com.observe.app",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "9dcf67e9-bc5b-479c-9f71-69564a0952a7",
      },
    },
  },
};
