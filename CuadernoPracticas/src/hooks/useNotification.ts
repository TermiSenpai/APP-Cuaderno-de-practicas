/**
 * useNotification Hook
 * Custom hook for accessing the notification system
 */

import { useContext, createContext } from "react";
import type { NotificationType } from "../core/models/types";

interface NotificationContextValue {
  showNotification: (type: NotificationType, message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}
