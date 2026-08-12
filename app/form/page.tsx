import { Button } from "@/components/Button";
import { Heading } from "@/components/Content";
import { Dialog, DialogTrigger } from "@/components/Dialog";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/Disclosure";
import { DisclosureGroup } from "@/components/DisclosureGroup";
import { Modal } from "@/components/Modal";
import SuperForm from "@/features/super-form/super-form";
import SignatureCounter from "./SignatureCounter";

export default function () {
  return (
    <main>
      <Heading level={1}>My super form</Heading>
      <DisclosureGroup defaultExpandedKeys={["personal"]}>
        <Disclosure id="personal">
          <DisclosureHeader>Personal Information</DisclosureHeader>
          <DisclosurePanel>
            <p>Personal information form here.</p>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure id="billing">
          <DisclosureHeader>Billing Address</DisclosureHeader>
          <DisclosurePanel>
            <p>Billing address form here.</p>
          </DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
      <DialogTrigger>
        <Button>Sign up</Button>
        <Modal>
          <Dialog>
            <Heading slot="title">Subscribe to our newsletter</Heading>
            <p className="mb-6">
              Enter your information to subscribe to our newsletter and receive
              updates about new features and announcements.
            </p>
            <SuperForm isInModal />
          </Dialog>
        </Modal>
      </DialogTrigger>
      <SignatureCounter />
    </main>
  );
}
