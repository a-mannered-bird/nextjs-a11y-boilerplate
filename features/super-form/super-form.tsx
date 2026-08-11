"use client";

import { TextField } from "@/components/TextField";
import { useActionState } from "react";
import { submitSuperForm } from "./action";
import { Form } from "@/components/Form";
import { Button } from "@/components/Button";
import { Text } from "@/components/Content";

export default function () {
  const [{ errors, success }, formAction, pending] = useActionState(
    submitSuperForm,
    {
      errors: {},
      success: false,
    },
  );

  return (
    <>
      {!success && (
        <Form action={formAction} validationErrors={errors}>
          <TextField
            name="full-name"
            label="Your full name"
            isRequired
            isDisabled={pending}
          />
          <Button type="submit" isDisabled={pending}>
            Submit
          </Button>
        </Form>
      )}

      {success && <Text>Form submitted!</Text>}
    </>
  );
}
