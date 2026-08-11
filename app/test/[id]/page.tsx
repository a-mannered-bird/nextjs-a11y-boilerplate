export default async function Page(params: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <div>
        <h1>Test</h1>
        <p>This is a {id} page.</p>
    </div>
}