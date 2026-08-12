import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "@/components/react-aria/Button";
import { SuperForm } from "./super-form";

const meta: Meta<typeof SuperForm> = {
  component: SuperForm,
};

export default meta;
type Story = StoryObj<typeof SuperForm>;

const closeAction = (
  <Button slot="close" variant="secondary">
    Close
  </Button>
);

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Queried by accessible label, so the assertion fails if the labelling breaks.
    const name = canvas.getByLabelText(/your full name/i);
    await userEvent.type(name, "John Doe");
    await expect(name).toHaveValue("John Doe");
  },
};

// The success state replaces the form, so it has to re-render whatever the
// caller passed as actions. It previously did not, leaving a dialog with no
// visible way out once submitted.
export const Submitted: Story = {
  args: { actions: closeAction },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/your full name/i), "John Doe");
    await userEvent.type(canvas.getByLabelText(/your email/i), "a@example.com");
    await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

    await expect(
      await canvas.findByText(/form submitted/i),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /close/i }),
    ).toBeInTheDocument();
  },
};

export const WithErrorSummary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // "@" in a name is what the action rejects, so this reaches the server-side
    // branch rather than being stopped by browser validation.
    const name = canvas.getByLabelText(/your full name/i);
    await userEvent.type(name, "a@b.com");
    await userEvent.type(canvas.getByLabelText(/your email/i), "a@example.com");
    await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

    const summary = await canvas.findByRole("heading", {
      name: /unable to submit/i,
    });
    await expect(summary).toHaveFocus();

    // The summary entry has to resolve to the field it describes, which is the
    // whole point of the pattern. Only the href is asserted: what a browser
    // does on activating a fragment link is the browser's behaviour, and it
    // does not apply inside Storybook's iframe anyway.
    await expect(
      canvas.getByRole("link", { name: /valid name/i }),
    ).toHaveAttribute("href", `#${name.id}`);
  },
};
