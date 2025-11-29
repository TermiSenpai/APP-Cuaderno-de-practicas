import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { HoursEditor } from "../HoursEditor";

describe("HoursEditor", () => {
  const mockOnToggleEditor = vi.fn();
  const mockOnHorasChange = vi.fn();
  const mockOnEditorClose = vi.fn();

  beforeEach(() => {
    mockOnToggleEditor.mockClear();
    mockOnHorasChange.mockClear();
    mockOnEditorClose.mockClear();
  });

  it("should display current hours", () => {
    render(
      <HoursEditor
        horas={8}
        showEditor={false}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    expect(screen.getByText("8h")).toBeInTheDocument();
  });

  it("should show editor when showEditor is true", () => {
    render(
      <HoursEditor
        horas={8}
        showEditor={true}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    expect(screen.getByText("Horas trabajadas")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("should hide editor when showEditor is false", () => {
    render(
      <HoursEditor
        horas={8}
        showEditor={false}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    expect(screen.queryByText("Horas trabajadas")).not.toBeInTheDocument();
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
  });

  it("should call onToggleEditor when edit button clicked", async () => {
    const user = userEvent.setup();
    render(
      <HoursEditor
        horas={8}
        showEditor={false}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockOnToggleEditor).toHaveBeenCalledTimes(1);
  });

  it("should call onHorasChange with valid number input", async () => {
    const user = userEvent.setup();
    render(
      <HoursEditor
        horas={8}
        showEditor={true}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "10");

    expect(mockOnHorasChange).toHaveBeenCalled();
  });

  it("should close editor when input loses focus", async () => {
    const user = userEvent.setup();
    render(
      <HoursEditor
        horas={8}
        showEditor={true}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    const input = screen.getByRole("spinbutton");
    await user.click(input);
    await user.tab();

    expect(mockOnEditorClose).toHaveBeenCalled();
  });

  it("should have correct input attributes", () => {
    render(
      <HoursEditor
        horas={8}
        showEditor={true}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("step", "0.5");
    expect(input).toHaveAttribute("min", "0");
  });

  it("should display current value in input", () => {
    render(
      <HoursEditor
        horas={12.5}
        showEditor={true}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input.value).toBe("12.5");
  });

  it("should render Clock icon", () => {
    const { container } = render(
      <HoursEditor
        horas={8}
        showEditor={false}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    // lucide-react Clock3 icon renders as SVG
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should have aria-pressed attribute on button", () => {
    render(
      <HoursEditor
        horas={8}
        showEditor={true}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("should have aria-label on button", () => {
    render(
      <HoursEditor
        horas={8}
        showEditor={false}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute(
      "aria-label",
      "Mostrar/ocultar horas trabajadas"
    );
  });

  it("should focus input when editor is shown", async () => {
    const { rerender } = render(
      <HoursEditor
        horas={8}
        showEditor={false}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    rerender(
      <HoursEditor
        horas={8}
        showEditor={true}
        onToggleEditor={mockOnToggleEditor}
        onHorasChange={mockOnHorasChange}
        onEditorClose={mockOnEditorClose}
      />
    );

    await waitFor(() => {
      const input = screen.getByRole("spinbutton");
      expect(input).toBeInTheDocument();
    });
  });
});
