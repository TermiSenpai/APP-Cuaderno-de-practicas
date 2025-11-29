import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationProvider } from "../NotificationProvider";
import { useNotification } from "../../../hooks/useNotification";
import { notificationService } from "../../../core/services/NotificationService";

// Mock the notification service
vi.mock("../../../core/services/NotificationService", () => ({
  notificationService: {
    show: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
    subscribe: vi.fn(() => vi.fn()), // Returns unsubscribe function
  },
}));

// Test component that uses the notification context
function TestComponent() {
  const { showNotification, info, success, warning, error } = useNotification();

  return (
    <div>
      <button onClick={() => showNotification("info", "Custom message")}>
        Show Custom
      </button>
      <button onClick={() => info("Info message")}>Show Info</button>
      <button onClick={() => success("Success message")}>Show Success</button>
      <button onClick={() => warning("Warning message")}>Show Warning</button>
      <button onClick={() => error("Error message")}>Show Error</button>
    </div>
  );
}

describe("NotificationProvider", () => {
  it("should render children correctly", () => {
    render(
      <NotificationProvider>
        <div>Test Child</div>
      </NotificationProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should provide notification context methods", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    expect(screen.getByText("Show Custom")).toBeInTheDocument();
    expect(screen.getByText("Show Info")).toBeInTheDocument();
    expect(screen.getByText("Show Success")).toBeInTheDocument();
    expect(screen.getByText("Show Warning")).toBeInTheDocument();
    expect(screen.getByText("Show Error")).toBeInTheDocument();
  });

  it("should call notificationService.show when showNotification is called", async () => {
    const user = userEvent.setup();

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    const button = screen.getByText("Show Custom");
    await user.click(button);

    expect(notificationService.show).toHaveBeenCalledWith(
      "info",
      "Custom message",
      undefined
    );
  });

  it("should call notificationService.info when info is called", async () => {
    const user = userEvent.setup();

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    const button = screen.getByText("Show Info");
    await user.click(button);

    expect(notificationService.info).toHaveBeenCalledWith(
      "Info message",
      undefined
    );
  });

  it("should call notificationService.success when success is called", async () => {
    const user = userEvent.setup();

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    const button = screen.getByText("Show Success");
    await user.click(button);

    expect(notificationService.success).toHaveBeenCalledWith(
      "Success message",
      undefined
    );
  });

  it("should call notificationService.warning when warning is called", async () => {
    const user = userEvent.setup();

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    const button = screen.getByText("Show Warning");
    await user.click(button);

    expect(notificationService.warning).toHaveBeenCalledWith(
      "Warning message",
      undefined
    );
  });

  it("should call notificationService.error when error is called", async () => {
    const user = userEvent.setup();

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    const button = screen.getByText("Show Error");
    await user.click(button);

    expect(notificationService.error).toHaveBeenCalledWith(
      "Error message",
      undefined
    );
  });

  it("should subscribe to notification service on mount", () => {
    render(
      <NotificationProvider>
        <div>Test</div>
      </NotificationProvider>
    );

    expect(notificationService.subscribe).toHaveBeenCalled();
  });

  it("should unsubscribe from notification service on unmount", () => {
    const unsubscribe = vi.fn();
    vi.mocked(notificationService.subscribe).mockReturnValue(unsubscribe);

    const { unmount } = render(
      <NotificationProvider>
        <div>Test</div>
      </NotificationProvider>
    );

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
