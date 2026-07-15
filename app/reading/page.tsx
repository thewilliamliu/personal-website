import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Bookshelf' }

const books = {
  current: [
    ['Dubliners', 'James Joyce'],
    ['The Infinity Machine', 'Sebastian Mallaby'],
    ['The Myth of Sisyphus', 'Albert Camus'],
  ],
  allTime: [
    ['The Brothers Karamazov', 'Fyodor Dostoevsky'],
    ['Faust', 'Johann Wolfgang von Goethe'],
    ['The Magic Mountain', 'Thomas Mann'],
    ['Stoner', 'John Williams'],
    ['The Remains of the Day', 'Kazuo Ishiguro'],
    ['The Aeneid', 'Virgil*'],
    ['Nicomachean Ethics', 'Aristotle'],
    ['On the Genealogy of Morality', 'Friedrich Nietzsche'],
  ],
}

function Book({ title, author }: { title: string; author: string }) {
  return (
    <p className="font-[425] text-[13px] leading-[1.6]">
      <em>{title}</em>, {author}
    </p>
  )
}

export default function Page() {
  return (
    <PageShell title="Bookshelf">
      <p className="mb-4 font-[425] text-[13px] leading-[1.32]">
        I usually read about 3-4 books at a time. Each book takes me a couple
        weeks to finish, and I stagger them. I like to diversify: something
        from philosophy, a classic from world literature, a modern piece of
        fiction, and some notes on society and technology.
      </p>

      <h2 className="mb-2 mt-5 text-[13px] font-semibold">Current Rotation</h2>
      {books.current.map(([t, a]) => (
        <Book key={t} title={t} author={a} />
      ))}

      <h2 className="mb-2 mt-5 text-[13px] font-semibold">All-Time Books</h2>
      {books.allTime.map(([t, a]) => (
        <Book key={t} title={t} author={a} />
      ))}

      <p className="mt-4 font-[425] text-[12px] leading-[1.32] opacity-70">
        *read in Latin
      </p>
    </PageShell>
  )
}
