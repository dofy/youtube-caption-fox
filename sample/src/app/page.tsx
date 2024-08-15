import { FormView } from '@/components/Form'

export default function Home() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-8 p-8">
      <header className="py-4">
        <h1 className="text-4xl font-medium">@dofy/youtube-cation-fox demo</h1>
      </header>

      <FormView />

      <section className="flex flex-col gap-4 rounded-lg bg-blue-200/30 p-4">
        <h3 className="text-2xl font-semibold">Result</h3>
        <p>This is a sample section.</p>
      </section>
    </main>
  )
}
