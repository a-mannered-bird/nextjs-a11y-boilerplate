import { Breadcrumb, Breadcrumbs } from "@/components/Breadcrumbs";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

export default async function ({ children }: LayoutProps<"/test">) {
  return (
    <div>
      <Breadcrumbs>
        <Breadcrumb href="/">Home</Breadcrumb>
        <Breadcrumb href="/test/">Test</Breadcrumb>
        <DynamicBreadcrumb basePath="/test" />
      </Breadcrumbs>
      <main>{children}</main>
    </div>
  );
}
