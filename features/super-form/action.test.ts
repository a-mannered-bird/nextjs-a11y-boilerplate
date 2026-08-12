import { describe, expect, it } from "vitest";

import { submitSuperForm, type SuperFormState } from "./action";

const EMPTY: SuperFormState = { errors: {}, success: false };

function formDataOf(fields: Record<string, string | File>): FormData {
  const formData = new FormData();
  for (const [name, value] of Object.entries(fields))
    formData.append(name, value);
  return formData;
}

const valid = { "full-name": "John Doe", email: "a@example.com" };

describe("submitSuperForm", () => {
  it("succeeds on valid input", async () => {
    await expect(submitSuperForm(EMPTY, formDataOf(valid))).resolves.toEqual({
      errors: {},
      success: true,
    });
  });

  // A Server Function is a public endpoint, so it receives requests the client
  // form would never send. These previously threw a TypeError rather than
  // returning a validation error.
  it.each([
    ["both fields missing", {}],
    ["only the name present", { "full-name": "John Doe" }],
    ["only the email present", { email: "a@example.com" }],
  ])("rejects a request with %s instead of throwing", async (_, fields) => {
    const { success, errors } = await submitSuperForm(
      EMPTY,
      formDataOf(fields),
    );

    expect(success).toBe(false);
    expect(Object.keys(errors).length).toBeGreaterThan(0);
  });

  it("rejects a field sent as a file part", async () => {
    const { success, errors } = await submitSuperForm(
      EMPTY,
      formDataOf({ ...valid, "full-name": new File(["x"], "x.txt") }),
    );

    expect(success).toBe(false);
    expect(errors["full-name"]).toBeDefined();
  });

  it("rejects whitespace-only input", async () => {
    const { success } = await submitSuperForm(
      EMPTY,
      formDataOf({ ...valid, "full-name": "   " }),
    );

    expect(success).toBe(false);
  });

  it.each(["not-an-email", "missing@domain", "@example.com", "a b@c.com"])(
    "rejects %j as an email",
    async (email) => {
      const { success, errors } = await submitSuperForm(
        EMPTY,
        formDataOf({ ...valid, email }),
      );

      expect(success).toBe(false);
      expect(errors["email"]).toBeDefined();
    },
  );

  it("keys the error to the field so the form can attach it to the input", async () => {
    const { errors } = await submitSuperForm(
      EMPTY,
      formDataOf({ ...valid, "full-name": "a@b.com" }),
    );

    expect(errors).toEqual({ "full-name": "Please enter a valid name." });
  });
});
