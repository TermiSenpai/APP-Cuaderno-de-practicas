import { describe, it, expect, beforeEach, vi } from "vitest";
import { eventBus } from "../EventBus";

describe("EventBus", () => {
  beforeEach(() => {
    // Clear all event listeners before each test
    eventBus.clearAll();
  });

  describe("on()", () => {
    it("should subscribe to events", () => {
      const callback = vi.fn();
      
      eventBus.on("test-event", callback);
      eventBus.emit("test-event");

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should return unsubscribe function", () => {
      const callback = vi.fn();
      
      const unsubscribe = eventBus.on("test-event", callback);
      eventBus.emit("test-event");
      
      expect(callback).toHaveBeenCalledTimes(1);
      
      callback.mockClear();
      unsubscribe();
      
      eventBus.emit("test-event");
      expect(callback).not.toHaveBeenCalled();
    });

    it("should allow multiple subscriptions to same event", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      eventBus.on("test-event", callback1);
      eventBus.on("test-event", callback2);
      
      eventBus.emit("test-event");

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });

    it("should handle multiple different events", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      eventBus.on("event-1", callback1);
      eventBus.on("event-2", callback2);
      
      eventBus.emit("event-1");

      expect(callback1).toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });
  });

  describe("emit()", () => {
    it("should call all subscribed listeners", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const callback3 = vi.fn();
      
      eventBus.on("test-event", callback1);
      eventBus.on("test-event", callback2);
      eventBus.on("other-event", callback3);
      
      eventBus.emit("test-event");

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(callback3).not.toHaveBeenCalled();
    });

    it("should not throw error if no listeners exist", () => {
      expect(() => eventBus.emit("non-existent-event")).not.toThrow();
    });

    it("should handle errors in listeners gracefully", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const badCallback = vi.fn(() => {
        throw new Error("Callback error");
      });
      const goodCallback = vi.fn();
      
      eventBus.on("test-event", badCallback);
      eventBus.on("test-event", goodCallback);
      
      eventBus.emit("test-event");

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error in event listener"),
        expect.any(Error)
      );
      expect(goodCallback).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it("should emit events multiple times", () => {
      const callback = vi.fn();
      
      eventBus.on("test-event", callback);
      
      eventBus.emit("test-event");
      eventBus.emit("test-event");
      eventBus.emit("test-event");

      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  describe("off()", () => {
    it("should unsubscribe from events", () => {
      const callback = vi.fn();
      
      eventBus.on("test-event", callback);
      eventBus.off("test-event", callback);
      
      eventBus.emit("test-event");

      expect(callback).not.toHaveBeenCalled();
    });

    it("should only remove specified callback", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      eventBus.on("test-event", callback1);
      eventBus.on("test-event", callback2);
      
      eventBus.off("test-event", callback1);
      eventBus.emit("test-event");

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });

    it("should not throw error for non-existent event", () => {
      const callback = vi.fn();
      expect(() => eventBus.off("non-existent-event", callback)).not.toThrow();
    });

    it("should not throw error for non-existent callback", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      eventBus.on("test-event", callback1);
      
      expect(() => eventBus.off("test-event", callback2)).not.toThrow();
    });
  });

  describe("clear()", () => {
    it("should remove all listeners for an event", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const callback3 = vi.fn();
      
      eventBus.on("test-event", callback1);
      eventBus.on("test-event", callback2);
      eventBus.on("other-event", callback3);
      
      eventBus.clear("test-event");
      
      eventBus.emit("test-event");
      eventBus.emit("other-event");

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
      expect(callback3).toHaveBeenCalled();
    });

    it("should not throw error for non-existent event", () => {
      expect(() => eventBus.clear("non-existent-event")).not.toThrow();
    });
  });

  describe("clearAll()", () => {
    it("should remove all listeners for all events", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const callback3 = vi.fn();
      
      eventBus.on("event-1", callback1);
      eventBus.on("event-2", callback2);
      eventBus.on("event-3", callback3);
      
      eventBus.clearAll();
      
      eventBus.emit("event-1");
      eventBus.emit("event-2");
      eventBus.emit("event-3");

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
      expect(callback3).not.toHaveBeenCalled();
    });

    it("should allow new subscriptions after clearAll", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      eventBus.on("test-event", callback1);
      eventBus.clearAll();
      eventBus.on("test-event", callback2);
      
      eventBus.emit("test-event");

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

  describe("complex scenarios", () => {
    it("should handle subscription/unsubscription during emit", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn(() => {
        // Unsubscribe callback1 during emit
        eventBus.off("test-event", callback1);
      });
      
      eventBus.on("test-event", callback1);
      eventBus.on("test-event", callback2);
      
      eventBus.emit("test-event");
      eventBus.emit("test-event");

      // First emit: both called
      // Second emit: only callback2 called
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(2);
    });

    it("should maintain separate listener sets for different events", () => {
      const callback = vi.fn();
      
      eventBus.on("event-1", callback);
      eventBus.on("event-2", callback);
      eventBus.on("event-3", callback);
      
      eventBus.clear("event-2");
      
      eventBus.emit("event-1");
      eventBus.emit("event-2");
      eventBus.emit("event-3");

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });
});
