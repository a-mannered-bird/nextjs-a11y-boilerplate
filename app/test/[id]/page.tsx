import ServerComponent from "@/components/server-component";
import Test from "@/components/test";

export default async function Page({ params }: PageProps<"/test/[id]">) {
  const { id } = await params;
  return (
    <div>
      <h1>Test</h1>
      <p>This is a {id} page.</p>
      <br />
      <br />
      <br />
      <Test>
        <ServerComponent />
      </Test>
    </div>
  );
}
