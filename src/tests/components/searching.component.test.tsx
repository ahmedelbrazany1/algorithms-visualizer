import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

const renderAtRoute = (route: string) => {
  window.history.pushState({}, "Test page", route);
  return render(<App />);
};

describe("Searching algorithm pages", () => {
  it("renders and runs Linear Search, then resets", async () => {
    const user = userEvent.setup();
    renderAtRoute("/searching/linear");

    expect(await screen.findByRole("heading", { name: /Linear Search/i })).toBeInTheDocument();

    const arrayInput = screen.getByLabelText(/Array \(space or comma separated\)/i);
    const targetInput = screen.getByLabelText(/Target/i);

    await user.clear(arrayInput);
    await user.type(arrayInput, "4 8 15 16 23 42");
    await user.clear(targetInput);
    await user.type(targetInput, "23");
    await user.click(screen.getByRole("button", { name: /^Start$/i }));

    expect(await screen.findByText(/Start linear search|Compare arr|Found 23/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^Reset$/i }));
    expect(screen.getByText(/Press Start to run the algorithm/i)).toBeInTheDocument();
  });

  it("renders and runs Binary Search", async () => {
    const user = userEvent.setup();
    renderAtRoute("/searching/binary");

    expect(await screen.findByRole("heading", { name: /Binary Search/i })).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/Array \(space or comma separated\)/i));
    await user.type(screen.getByLabelText(/Array \(space or comma separated\)/i), "2 4 6 8 10 12 14");
    await user.clear(screen.getByLabelText(/Target/i));
    await user.type(screen.getByLabelText(/Target/i), "12");
    await user.click(screen.getByRole("button", { name: /^Start$/i }));

    expect(await screen.findByText(/Start with low=0|Mid index|Found 12/i)).toBeInTheDocument();
  });

  it("opens Code Mode panel", async () => {
    const user = userEvent.setup();
    renderAtRoute("/searching/interpolation");

    expect(await screen.findByRole("heading", { name: /Interpolation Search/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Code Mode/i }));
    expect(await screen.findByRole("heading", { name: /Code Mode/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Execution steps/i })).toBeInTheDocument();
  });
});
