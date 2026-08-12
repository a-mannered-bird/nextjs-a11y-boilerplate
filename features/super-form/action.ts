"use server";

export type SuperFormState = {
  errors: Record<string, string>;
  success: boolean;
};

// Deliberately permissive: the only thing worth rejecting server-side is input
// that cannot be an address at all. Anything stricter rejects valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * `FormData.get` returns `string | File | null`, and a Server Function is a
 * public endpoint: a request that omits the field, or sends a file part under
 * its name, reaches this code regardless of what the client form enforces.
 * Narrowed rather than asserted so those requests get a validation error
 * instead of crashing the action.
 */
function getTextField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitSuperForm(
  prevState: SuperFormState,
  formData: FormData,
): Promise<SuperFormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const fullName = getTextField(formData, "full-name");
  const email = getTextField(formData, "email");

  const errors: Record<string, string> = {};

  if (!fullName) errors["full-name"] = "Enter your full name.";
  else if (fullName.includes("@"))
    errors["full-name"] = "Please enter a valid name.";

  if (!email) errors["email"] = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(email))
    errors["email"] = "Enter an email address in the format name@example.com.";

  if (Object.keys(errors).length > 0) return { errors, success: false };

  return { errors: {}, success: true };
}
