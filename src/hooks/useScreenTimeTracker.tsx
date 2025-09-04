import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Define interfaces for better type safety
interface ScreenTimes {
  [key: string]: number;
}

interface DeviceInfo {
  userAgent: string;
  screenResolution: string;
  viewport: string;
  timezone: string;
  language: string;
  platform: string;
}

interface ScreenTimePayload {
  screen_path: string;
  time_spent: number;
  timestamp: string;
  anonymous_user_id: string;
  session_id: string;
  device_info: DeviceInfo;
  referrer: string | null;
  is_page_unload?: boolean;
}

export const useScreenTimeTracker = () => {
  const location = useLocation();
  const [screenTimes, setScreenTimes] = useState<ScreenTimes>({});
  const [sessionScreenTimes, setSessionScreenTimes] = useState<ScreenTimes>({});

  const startTimeRef = useRef<number>(Date.now());
  const currentScreenRef = useRef<string>(location.pathname);
  const isActiveRef = useRef<boolean>(true);

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("screenTimeData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as ScreenTimes;
        setScreenTimes(parsedData);
      } catch (error) {
        console.error("Error loading screen time data:", error);
      }
    }
  }, []);

  // Save to localStorage whenever screenTimes changes
  useEffect(() => {
    if (Object.keys(screenTimes).length > 0) {
      localStorage.setItem("screenTimeData", JSON.stringify(screenTimes));
    }
  }, [screenTimes]);

  // Generate unique anonymous user ID (persistent across sessions)
  const getAnonymousUserId = (): string => {
    let userId = localStorage.getItem("anonymousUserId");
    if (!userId) {
      userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("anonymousUserId", userId);
    }
    return userId;
  };

  // Generate unique session ID (for current browser session)
  const getSessionId = (): string => {
    let sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      sessionStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  // Get device and browser information
  const getDeviceInfo = (): DeviceInfo => {
    return {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
    };
  };

  // API function to save screen time to Lambda
  const saveScreenTimeToLambda = async (
    screenPath: string,
    timeSpent: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    const payload: ScreenTimePayload = {
      screen_path: screenPath,
      time_spent: timeSpent, // in milliseconds
      timestamp: new Date().toISOString(),
      anonymous_user_id: getAnonymousUserId(),
      session_id: getSessionId(),
      device_info: getDeviceInfo(),
      referrer: document.referrer || null,
    };

    try {
      const response = await fetch(
        "https://my3mdm7217.execute-api.us-east-1.amazonaws.com/develop/screentimeInsights",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Screen time saved to Lambda:", {
        screen: screenPath,
        timeSeconds: (timeSpent / 1000).toFixed(2),
        documentId: result.data?.document_id,
      });
      return result;
    } catch (error) {
      console.error("❌ Error saving screen time to Lambda:", error);
      // Don't throw error - continue working offline
      return null;
    }
  };

  // Record screen time both locally and in database
  const recordScreenTime = async (
    screenPath: string,
    timeSpent: number
  ): Promise<void> => {
    if (timeSpent <= 0) return;

    console.log(`📊 Recording screen time:`, {
      screen: screenPath,
      timeSpent: `${(timeSpent / 1000).toFixed(2)} seconds`,
    });

    // Update local state immediately
    setScreenTimes((prev) => ({
      ...prev,
      [screenPath]: (prev[screenPath] || 0) + timeSpent,
    }));

    setSessionScreenTimes((prev) => ({
      ...prev,
      [screenPath]: (prev[screenPath] || 0) + timeSpent,
    }));

    // Save to Lambda (fire and forget - don't block UI)
    saveScreenTimeToLambda(screenPath, timeSpent);
  };

  // Track visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;

      if (!isVisible && isActiveRef.current) {
        const timeSpent = Date.now() - startTimeRef.current;
        console.log("🔄 Tab inactive, recording time:", timeSpent);
        recordScreenTime(currentScreenRef.current, timeSpent);
        isActiveRef.current = false;
      } else if (isVisible && !isActiveRef.current) {
        console.log("🔄 Tab active, resetting timer");
        startTimeRef.current = Date.now();
        isActiveRef.current = true;
      }
    };

    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTimeRef.current;
      console.log("👋 Page unloading, recording final time:", timeSpent);

      // Use sendBeacon for reliable data transmission during page unload
      if (navigator.sendBeacon && timeSpent > 0) {
        const payload: ScreenTimePayload = {
          screen_path: currentScreenRef.current,
          time_spent: timeSpent,
          timestamp: new Date().toISOString(),
          anonymous_user_id: getAnonymousUserId(),
          session_id: getSessionId(),
          device_info: getDeviceInfo(),
          referrer: document.referrer || null,
          is_page_unload: true,
        };

        const success = navigator.sendBeacon(
          "/api/screen-time",
          JSON.stringify(payload)
        );
        console.log("📡 SendBeacon result:", success);
      }

      // Also record locally
      recordScreenTime(currentScreenRef.current, timeSpent);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Track route changes
  useEffect(() => {
    if (isActiveRef.current) {
      const timeSpent = Date.now() - startTimeRef.current;
      if (timeSpent > 0) {
        console.log(
          "🗺️ Route changed, recording time for:",
          currentScreenRef.current
        );
        recordScreenTime(currentScreenRef.current, timeSpent);
      }
    }

    console.log("📱 Navigated to:", location.pathname);
    currentScreenRef.current = location.pathname;
    startTimeRef.current = Date.now();
    isActiveRef.current = true;
  }, [location.pathname]);

  // Helper functions
  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const getTotalTime = (times: ScreenTimes): number => {
    return Object.values(times).reduce((total, time) => total + time, 0);
  };

  const clearAllData = (): void => {
    setScreenTimes({});
    setSessionScreenTimes({});
    localStorage.removeItem("screenTimeData");
    sessionStorage.removeItem("sessionId");
    console.log("🧹 All screen time data cleared");
  };

  const exportData = () => {
    const data = {
      allTimeScreenTimes: screenTimes,
      sessionScreenTimes,
      anonymousUserId: getAnonymousUserId(),
      sessionId: getSessionId(),
      deviceInfo: getDeviceInfo(),
      exportedAt: new Date().toISOString(),
    };
    console.log("📤 Exported screen time data:", data);
    return data;
  };

  // Fetch analytics from Lambda (optional)
  //   const fetchAnalytics = async (days = 7) => {
  //     try {
  //       const response = await fetch(
  //         `/api/screen-time?anonymous_user_id=${getAnonymousUserId()}&days=${days}`
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const result = await response.json();
  //       console.log("📊 Analytics from Lambda:", result.data);
  //       return result.data;
  //     } catch (error) {
  //       console.error("❌ Error fetching analytics:", error);
  //       return null;
  //     }
  //   };

  return {
    // Data
    screenTimes,
    sessionScreenTimes,

    // Status
    currentScreen: location.pathname,
    anonymousUserId: getAnonymousUserId(),
    sessionId: getSessionId(),

    // Actions
    recordScreenTime,
    clearAllData,
    exportData,
    // fetchAnalytics,

    // Helpers
    formatTime,
    getTotalTime,

    // Computed values
    totalSessionTime: getTotalTime(sessionScreenTimes),
    totalAllTime: getTotalTime(screenTimes),
    deviceInfo: getDeviceInfo(),
  };
};
