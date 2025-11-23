/**
 * Custom hook for EventBus subscriptions
 * Automatically handles cleanup on unmount
 */

import { useEffect } from "react";
import { eventBus } from "../core/services/EventBus";

export function useEventBus(eventName: string, callback: () => void): void {
  useEffect(() => {
    const unsubscribe = eventBus.on(eventName, callback);
    return unsubscribe;
  }, [eventName, callback]);
}
