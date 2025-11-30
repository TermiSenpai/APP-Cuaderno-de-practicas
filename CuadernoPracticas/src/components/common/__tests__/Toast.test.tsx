import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Toast } from "../Toast";
import type { Notification } from "../../../core/models/types";

describe("Toast", () => {
  const createNotification = (
    overrides?: Partial<Notification>
  ): Notification => ({
    id: "test-id",
    type: "info",
    message: "Test message",
    duration: 4000,
    ...overrides,
  });

  it("should render with correct message", () => {
    const notification = createNotification();
    render(<Toast notification={notification} />);

    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("should render alert role", () => {
    const notification = createNotification();
    render(<Toast notification={notification} />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("should have close button", () => {
    const notification = createNotification();
    render(<Toast notification={notification} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it("should render info type correctly", () => {
    const notification = createNotification({ type: "info" });
    const { container } = render(<Toast notification={notification} />);

    expect(container.querySelector(".toast-info")).toBeInTheDocument();
  });

  it("should render success type correctly", () => {
    const notification = createNotification({ type: "success" });
    const { container } = render(<Toast notification={notification} />);

    expect(container.querySelector(".toast-success")).toBeInTheDocument();
  });

  it("should render warning type correctly", () => {
    const notification = createNotification({ type: "warning" });
    const { container } = render(<Toast notification={notification} />);

    expect(container.querySelector(".toast-warning")).toBeInTheDocument();
  });

  it("should render error type correctly", () => {
    const notification = createNotification({ type: "error" });
    const { container } = render(<Toast notification={notification} />);

    expect(container.querySelector(".toast-error")).toBeInTheDocument();
  });

  it("should display correct icon for each type", () => {
    const types = ["info", "success", "warning", "error"] as const;

    types.forEach((type) => {
      const notification = createNotification({ type });
      const { container } = render(<Toast notification={notification} />);

      // Check that an icon SVG is rendered
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();

      // Unmount for next iteration
      container.remove();
    });
  });

  it("should handle long messages", () => {
    const longMessage = "A".repeat(500);
    const notification = createNotification({ message: longMessage });

    render(<Toast notification={notification} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it("should render message with special characters", () => {
    const specialMessage = "Test message with @#$%";
    const notification = createNotification({ message: specialMessage });

    render(<Toast notification={notification} />);

    expect(screen.getByText(specialMessage)).toBeInTheDocument();
  });
});
