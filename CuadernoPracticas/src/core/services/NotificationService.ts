/**
 * Notification Service
 * Singleton service for managing toast notifications
 */

import type { Notification, NotificationType } from "../models/types";

type NotificationListener = (notifications: Notification[]) => void;

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: Set<NotificationListener> = new Set();
  private idCounter = 0;

  /**
   * Subscribe to notification changes
   */
  subscribe(listener: NotificationListener): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of changes
   */
  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener([...this.notifications]);
      } catch (error) {
        console.error("Error in notification listener:", error);
      }
    });
  }

  /**
   * Show a notification
   */
  show(type: NotificationType, message: string, duration: number = 4000): string {
    const id = `notification-${++this.idCounter}-${Date.now()}`;
    const notification: Notification = {
      id,
      type,
      message,
      duration,
    };

    this.notifications.push(notification);
    this.notify();

    // Auto-dismiss if duration is set
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    return id;
  }

  /**
   * Dismiss a specific notification
   */
  dismiss(id: string): void {
    const initialLength = this.notifications.length;
    this.notifications = this.notifications.filter((n) => n.id !== id);
    
    if (this.notifications.length !== initialLength) {
      this.notify();
    }
  }

  /**
   * Dismiss all notifications
   */
  dismissAll(): void {
    if (this.notifications.length > 0) {
      this.notifications = [];
      this.notify();
    }
  }

  /**
   * Get current notifications
   */
  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  // Convenience methods
  info(message: string, duration?: number): string {
    return this.show("info", message, duration);
  }

  success(message: string, duration?: number): string {
    return this.show("success", message, duration);
  }

  warning(message: string, duration?: number): string {
    return this.show("warning", message, duration);
  }

  error(message: string, duration?: number): string {
    return this.show("error", message, duration);
  }
}

// Singleton instance
export const notificationService = new NotificationService();
