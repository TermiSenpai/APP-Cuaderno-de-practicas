import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ActivitiesTextArea } from "../ActivitiesTextArea";

describe("ActivitiesTextArea", () => {
  const mockOnChange = vi.fn();
  const mockOnBlur = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnBlur.mockClear();
  });

  it("should render textarea with correct value", () => {
    const testValue = "Activity 1\nActivity 2";
    render(
      <ActivitiesTextArea
        value={testValue}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue(testValue);
  });

  it("should call onChange when text changes", async () => {
    const user = userEvent.setup();
    render(
      <ActivitiesTextArea
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "New activity");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should call onBlur when losing focus", async () => {
    const user = userEvent.setup();
    render(
      <ActivitiesTextArea
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByRole("textbox");
    await user.click(textarea);
    await user.tab();

    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("should have correct placeholder text", () => {
    render(
      <ActivitiesTextArea
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute(
      "placeholder",
      expect.stringContaining("Escribe las actividades realizadas")
    );
  });

  it("should be vertically resizable", () => {
    const { container } = render(
      <ActivitiesTextArea
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.className).toContain("resize-y");
  });

  it("should have proper label", () => {
    render(
      <ActivitiesTextArea
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    expect(screen.getByText("Actividades realizadas")).toBeInTheDocument();
  });

  it("should render with empty value", () => {
    render(
      <ActivitiesTextArea
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("");
  });

  it("should handle multi-line text", () => {
    const multiLineText = "Line 1\nLine 2\nLine 3";
    render(
      <ActivitiesTextArea
        value={multiLineText}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue(multiLineText);
  });

  it("should have minimum height style", () => {
    const { container } = render(
      <ActivitiesTextArea
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = container.querySelector("textarea");
    expect(textarea).toHaveStyle({ minHeight: "205px" });
  });

  it("should call onChange with correct value", async () => {
    const user = userEvent.setup();
    render(
      <ActivitiesTextArea
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "A");

    expect(mockOnChange).toHaveBeenCalledWith("A");
  });

  it("should handle long text content", () => {
    const longText = "A".repeat(1000);
    render(
      <ActivitiesTextArea
        value={longText}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue(longText);
  });

  it("should have focus styles", () => {
    const { container } = render(
      <ActivitiesTextArea
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.className).toContain("focus:outline-none");
    expect(textarea?.className).toContain("focus:ring-2");
  });
});
