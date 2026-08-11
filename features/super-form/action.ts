"use server";

export type SuperFormState = {
  errors: Record<string, string>;
  success: boolean;
};

export async function submitSuperForm(
  prevState: SuperFormState,
  formData: FormData,
): Promise<SuperFormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const fullName = formData.get("full-name") as string;
  if (fullName.includes("@"))
    return {
      errors: { "full-name": "Please enter a valid name." },
      success: false,
    };
  return { errors: {}, success: true };
}
