import React from "react";
import { Dimensions } from "react-native";

export const useDimensions = () => {
  const { width, height } = Dimensions.get("window");
  const [dimensions, setDimensions] = React.useState({ width, height });

  React.useLayoutEffect(() => {
    const onChange = (result) => {
      setDimensions({
        width: result.window.width,
        height: result.window.height,
      });
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription.remove();
  });

  return { dimensions, isLandscape: dimensions.width > dimensions.height };
};
