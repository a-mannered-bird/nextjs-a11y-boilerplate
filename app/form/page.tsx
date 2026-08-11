import { Heading } from "@/components/Content";
import SuperForm from "@/features/super-form/super-form";

export default function () {
  return (
    <div>
      <Heading level={1}>My super form</Heading>
      <SuperForm />
    </div>
  );
}
