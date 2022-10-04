import { NativeModules } from "react-native";
import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

let host = NativeModules.SourceCode.scriptURL.split("://")[1].split(":")[0];

Reactotron
  // .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or "@react-native-async-storage/async-storage" depending on where you get it from
  .configure({ host }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

global.reactotron = Reactotron;
