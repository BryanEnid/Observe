import { BucketScreen } from "./Buckets/Buckets";
import { ResumeScreen } from "./Resume/Resume";

// ! Also declare refs using "useAnimatedRef"
// ! per screen and add it to the refs array
export const SCREENS = [
  ["Resume", ResumeScreen],
  ["Bucket", BucketScreen],
];
