/**
 * NotificationProvider Component
 * Provides notification context to the application
 */

import { useEffect, useMemo, ReactNode } from "react";
import { notificationService } from "../../core/services/NotificationService";
import type { NotificationType } from "../../core/models/types";
import { NotificationContext } from "../../hooks/useNotification";

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  useEffect(() => {
    // Subscribe to notification changes (no need to store in state here)
    const unsubscribe = notificationService.subscribe(() => {
      // ToastContainer will handle the state
    });

    return unsubscribe;
  }, []);

  const contextValue = useMemo(
    () => ({
      showNotification: (
        type: NotificationType,
        message: string,
        duration?: number
      ) => {
        notificationService.show(type, message, duration);
      },
      info: (message: string, duration?: number) =>
        notificationService.info(message, duration),
      success: (message: string, duration?: number) =>
        notificationService.success(message, duration),
      warning: (message: string, duration?: number) =>
        notificationService.warning(message, duration),
      error: (message: string, duration?: number) =>
        notificationService.error(message, duration),
    }),
    []
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}
