import { RefObject, RefAttributes } from "react";
import { scrollTo as reanimatedScrollTo } from "react-native-reanimated";

const OptionObject = { x: 0, y: 0, animated: true };

/**
 * Reanimated + Ref scrollTo merge together
 *
 * @param {RefObject} ref
 * @param {OptionObject} options
 * @param {Boolean} onUI - Run the passed ref in the UI thread. Default false
 */
export const scrollTo = (ref, options, onUI = false) => {
  "worklet";

  const x = options?.x ?? 0;
  const y = options?.y ?? 0;
  const animated = options?.animated;

  if (onUI) {
    reanimatedScrollTo(ref, x, y, animated);
  } else {
    ref.current.scrollTo(options);
  }
};
