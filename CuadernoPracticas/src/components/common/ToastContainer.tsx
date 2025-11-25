/**
 * ToastContainer Component
 * Container for managing and displaying toast notifications
 */

import { useState, useEffect } from "react";
import { notificationService } from "../../core/services/NotificationService";
import type { Notification } from "../../core/models/types";
import { Toast } from "./Toast";

export function ToastContainer() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Subscribe to notification updates
    const unsubscribe = notificationService.subscribe((newNotifications) => {
      setNotifications(newNotifications);
    });

    return unsubscribe;
  }, []);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
