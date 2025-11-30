import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { notificationService } from "../NotificationService";

describe("NotificationService", () => {
  beforeEach(() => {
    // Clear notifications before each test
    notificationService.dismissAll();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe("subscribe()", () => {
    it("should call listener with notifications", () => {
      const listener = vi.fn();
      
      notificationService.subscribe(listener);
      notificationService.show("info", "Test message");

      expect(listener).toHaveBeenCalled();
      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: "info",
            message: "Test message",
          }),
        ])
      );
    });

    it("should return unsubscribe function", () => {
      const listener = vi.fn();
      
      const unsubscribe = notificationService.subscribe(listener);
      notificationService.show("info", "Test");
      
      expect(listener).toHaveBeenCalledTimes(1);
      
      listener.mockClear();
      unsubscribe();
      
      notificationService.show("info", "Another test");
      expect(listener).not.toHaveBeenCalled();
    });

    it("should handle multiple subscribers", () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      
      notificationService.subscribe(listener1);
      notificationService.subscribe(listener2);
      
      notificationService.show("success", "Test");

      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });
  });

  describe("show()", () => {
    it("should add notification and notify listeners", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      const id = notificationService.show("warning", "Warning message", 3000);

      expect(id).toBeTruthy();
      expect(id).toMatch(/^notification-/);
      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            id,
            type: "warning",
            message: "Warning message",
            duration: 3000,
          }),
        ])
      );
    });

    it("should use default duration of 4000ms", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      notificationService.show("info", "Test");

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            duration: 4000,
          }),
        ])
      );
    });

    it("should generate unique IDs", () => {
      const id1 = notificationService.show("info", "Message 1");
      const id2 = notificationService.show("info", "Message 2");

      expect(id1).not.toBe(id2);
    });
  });

  describe("dismiss()", () => {
    it("should remove notification by ID", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      const id = notificationService.show("info", "Test", 0); // 0 duration = no auto-dismiss
      
      listener.mockClear();
      notificationService.dismiss(id);

      expect(listener).toHaveBeenCalledWith([]);
    });

    it("should not throw error for non-existent ID", () => {
      expect(() => notificationService.dismiss("non-existent-id")).not.toThrow();
    });
  });

  describe("auto-dismiss", () => {
    it("should auto-dismiss after specified duration", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      notificationService.show("info", "Test", 2000);
      
      listener.mockClear();
      
      // Fast-forward time
      vi.advanceTimersByTime(2000);

      expect(listener).toHaveBeenCalledWith([]);
    });

    it("should not auto-dismiss if duration is 0", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      notificationService.show("info", "Test", 0);
      
      listener.mockClear();
      
      vi.advanceTimersByTime(10000);

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe("convenience methods", () => {
    it("info() should create info notification", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      notificationService.info("Info message");

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: "info",
            message: "Info message",
          }),
        ])
      );
    });

    it("success() should create success notification", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      notificationService.success("Success message");

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: "success",
            message: "Success message",
          }),
        ])
      );
    });

    it("warning() should create warning notification", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      notificationService.warning("Warning message");

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: "warning",
            message: "Warning message",
          }),
        ])
      );
    });

    it("error() should create error notification", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      notificationService.error("Error message");

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: "error",
            message: "Error message",
          }),
        ])
      );
    });

    it("convenience methods should accept custom duration", () => {
      const listener = vi.fn();
      notificationService.subscribe(listener);

      notificationService.info("Test", 1000);

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            duration: 1000,
          }),
        ])
      );
    });
  });

  describe("getNotifications()", () => {
    it("should return copy of not notifications array", () => {
      notificationService.show("info", "Test 1");
      notificationService.show("success", "Test 2");

      const notifications = notificationService.getNotifications();

      expect(notifications).toHaveLength(2);
      expect(notifications[0]).toMatchObject({
        type: "info",
        message: "Test 1",
      });
      expect(notifications[1]).toMatchObject({
        type: "success",
        message: "Test 2",
      });

      // Verify it's a copy (mutation doesn't affect service)
      notifications.pop();
      expect(notificationService.getNotifications()).toHaveLength(2);
    });

    it("should return empty array initially", () => {
      const notifications = notificationService.getNotifications();
      expect(notifications).toEqual([]);
    });
  });

  describe("error handling", () => {
    it("should handle errors in listener gracefully", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const badListener = vi.fn(() => {
        throw new Error("Listener error");
      });
      const goodListener = vi.fn();

      notificationService.subscribe(badListener);
      notificationService.subscribe(goodListener);

      notificationService.show("info", "Test");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in notification listener:",
        expect.any(Error)
      );
      expect(goodListener).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });
});
