import { useScreenTimeTracker } from "../hooks/useScreenTimeTracker";

// Silent screen time tracker - tracks user activity without displaying any UI
const SilentScreenTimeTracker = () => {
  useScreenTimeTracker();

  return null;
};

export default SilentScreenTimeTracker;
