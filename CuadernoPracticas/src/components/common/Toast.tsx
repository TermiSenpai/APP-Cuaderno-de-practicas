/**
 * Toast Component
 * Individual notification toast with animations and close button
 */

import { useEffect, useState } from "react";
import type { Notification } from "../../core/models/types";
import { notificationService } from "../../core/services/NotificationService";

interface ToastProps {
  notification: Notification;
}

export function Toast({ notification }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation slightly before auto-dismiss
    if (notification.duration && notification.duration > 0) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, notification.duration - 300);

      return () => clearTimeout(exitTimer);
    }
  }, [notification.duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      notificationService.dismiss(notification.id);
    }, 300);
  };

  // Icon based on type
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return (
          <svg
            className="toast-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="toast-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="toast-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg
            className="toast-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`toast toast-${notification.type} ${
        isExiting ? "toast-exit" : ""
      }`}
      role="alert"
    >
      <div className="toast-content">
        <div className="toast-icon-wrapper">{getIcon()}</div>
        <p className="toast-message">{notification.message}</p>
      </div>
      <button
        className="toast-close"
        onClick={handleClose}
        aria-label="Close notification"
        type="button"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
