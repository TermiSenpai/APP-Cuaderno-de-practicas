/**
 * Custom hook for EventBus subscriptions
 * Automatically handles cleanup on unmount
 */

import { useEffect, useRef } from "react";
import { eventBus } from "../core/services/EventBus";
import type { AppEvent } from "../core/models/types";

export function useEventBus(eventName: AppEvent, callback: () => void): void {
  // Use ref to always have the latest callback without re-subscribing
  const callbackRef = useRef(callback);

  // Update ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Wrapper function that calls the ref
    const handler = () => {
      callbackRef.current();
    };

    const unsubscribe = eventBus.on(eventName, handler);
    return unsubscribe;
  }, [eventName]); // Only re-subscribe if event name changes
}
