import { BucketScreen } from "./Buckets/Buckets";
import { ResumeScreen } from "./Resume/Resume";
import { RecommendsScreen } from "./Recommends/Recommends";

// ! Declare refs using "useAnimatedRef"
// ! per screen and add it to the refs array

/**
 * ? ==== Steps ====
 * * 1. Declare component screen in this array
 * * 2. Create a ref using "useAnimatedRef" inside useProfileAnimation.js hook
 * * 3. Add the created reference in the refs array in useProfileAnimation.js hook
 * * 4. Done!
 */
export const SCREENS = [
  ["Resume", ResumeScreen],
  ["Recommends", RecommendsScreen],
  ["Bucket", BucketScreen],
];
