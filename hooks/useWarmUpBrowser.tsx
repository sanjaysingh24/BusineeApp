import React from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    const warmUpBrowser = async () => {
      if (Platform.OS !== 'web') {
        await WebBrowser.warmUpAsync();
      }
    };

    const coolDownBrowser = async () => {
      if (Platform.OS !== 'web') {
        await WebBrowser.coolDownAsync();
      }
    };

    warmUpBrowser();

    return () => {
      coolDownBrowser();
    };
  }, []);
};
