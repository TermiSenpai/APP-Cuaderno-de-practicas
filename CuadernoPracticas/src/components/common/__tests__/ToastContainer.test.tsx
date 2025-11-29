import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { ToastContainer } from "../ToastContainer";
import { notificationService } from "../../../core/services/NotificationService";

describe("ToastContainer", () => {
  beforeEach(() => {
    // Clear all notifications before each test
    vi.clearAllMocks();
  });

  it("should render nothing when no notifications exist", () => {
    const { container } = render(<ToastContainer />);
    expect(container.firstChild).toBeNull();
  });

  it("should have correct ARIA attributes when notifications exist", async () => {
    render(<ToastContainer />);

    // Add a notification
    act(() => {
      notificationService.info("Test notification");
    });

    await waitFor(() => {
      // Now looking for the container by class since role="region" might not be implicit without label
      const container = document.querySelector(".toast-container");
      expect(container).toHaveAttribute("aria-live", "polite");
      expect(container).toHaveAttribute("aria-atomic", "false");
    });
  });

  it("should render Toast components for each notification", async () => {
    render(<ToastContainer />);

    // Add multiple notifications
    act(() => {
      notificationService.info("First notification");
      notificationService.success("Second notification");
      notificationService.warning("Third notification");
    });

    await waitFor(() => {
      expect(screen.getByText("First notification")).toBeInTheDocument();
      expect(screen.getByText("Second notification")).toBeInTheDocument();
      expect(screen.getByText("Third notification")).toBeInTheDocument();
    });
  });

  it("should update when notifications change", async () => {
    render(<ToastContainer />);

    // Add a notification
    act(() => {
      notificationService.info("Initial notification");
    });

    await waitFor(() => {
      expect(screen.getByText("Initial notification")).toBeInTheDocument();
    });

    // Add another notification
    act(() => {
      notificationService.error("New notification");
    });

    await waitFor(() => {
      expect(screen.getByText("New notification")).toBeInTheDocument();
    });
  });

  it("should render different notification types correctly", async () => {
    render(<ToastContainer />);

    act(() => {
      notificationService.info("Info message");
      notificationService.success("Success message");
      notificationService.warning("Warning message");
      notificationService.error("Error message");
    });

    await waitFor(() => {
      expect(screen.getByText("Info message")).toBeInTheDocument();
      expect(screen.getByText("Success message")).toBeInTheDocument();
      expect(screen.getByText("Warning message")).toBeInTheDocument();
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });
  });

  it("should handle notification removal", async () => {
    render(<ToastContainer />);

    act(() => {
      notificationService.info("Temporary notification", 100);
    });

    await waitFor(() => {
      expect(screen.getByText("Temporary notification")).toBeInTheDocument();
    });

    // Wait for notification to be removed
    await waitFor(
      () => {
        expect(
          screen.queryByText("Temporary notification")
        ).not.toBeInTheDocument();
      },
      { timeout: 200 }
    );
  });
});
