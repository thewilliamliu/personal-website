import PageShell from 'app/components/page-shell'

export const metadata = { title: 'A Blueprint for Life' }

const p = 'mb-4 font-[425] text-[13px] leading-[1.32]'
const li = 'mb-2.5 font-[425] text-[13px] leading-[1.32]'

// TODO: replace '#' hrefs with your real links
const links = {
  benefitHumanity: '#',
  narcissism: 'https://www.youtube.com/watch?v=F3fCktnkBbc',
  jobs: '#',
  collison: 'https://patrickcollison.com/advice',
  voyager: 'https://voyager.jpl.nasa.gov/golden-record/',
  game4: '#',
  falconHeavy: '#',
  amodei: 'https://darioamodei.com/machines-of-loving-grace',
  faust: '#',
  bigHero6: '#',
  op131: '#',
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className="lnk"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export default function Page() {
  return (
    <PageShell title="A Blueprint for Life">
      <p className="mb-4 text-[12px] italic opacity-70">
        Last updated: June 2026
      </p>

      <p className={p}>
        My ultimate mission is to serve God and the people around me. More
        specifically, I think we are on the cusp of a technological revolution
        that can <A href={links.benefitHumanity}>vastly benefit humanity</A>. I
        aim to contribute to that — one way or another — to help steer the
        ship in the right direction.
      </p>

      <p className={p}>
        To accomplish the above, I recognize that extreme discipline is not
        only helpful, but necessary. Here are some principles that I try my
        very best to follow, in no particular order:
      </p>

      <ul className="mb-4 list-disc pl-5">
        <li className={li}>
          Creativity and curiosity are two great gifts of childhood. It&apos;s
          tempting to lose the spirit of adventure in an age where conformity
          is increasingly common.
        </li>
        <li className={li}>
          The people you surround yourself with determine who you become.
          Achievement and intellect are not the only values to admire in
          others; habits, drive, and honesty often prevail.
        </li>
        <li className={li}>
          Somebody once told me to stick to things I&apos;m good at. I believe
          you can be good at nearly anything if you set your mind to it: if
          you&apos;re confident you won&apos;t fail, you&apos;re probably
          being too risk-averse.
        </li>
        <li className={li}>
          Self-belief requires self-discipline to prevent self-delusion.
        </li>
        <li className={li}>
          Ancient wisdom is quite valuable and sometimes overlooked by
          futurists and innovators. The best &ldquo;self-help&rdquo; books are
          often recycled ways of rephrasing lessons from great literature and
          philosophy.
        </li>
        <li className={li}>
          Input should be balanced with output: read and write, learn
          textbooks and pursue research, dream and act.
        </li>
        <li className={li}>
          Many of the diseases of traditional career-climbing — including
          performative startup culture — come from this &ldquo;
          <A href={links.narcissism}>extreme narcissism</A>&rdquo; that our
          society has become accustomed to. Recognizing one&apos;s own
          finitude is an incredibly important prerequisite to true creativity,
          curiosity, and collaboration.
        </li>
      </ul>

      <p className={p}>Also, a list of things that inspire me:</p>

      <ul className="mb-4 list-disc pl-5">
        <li className={li}>
          Steve Jobs on the <A href={links.jobs}>boundaries of life</A> and
          what one can do with their time on Earth.
        </li>
        <li className={li}>
          Patrick Collison&apos;s <A href={links.collison}>advice page</A>.
        </li>
        <li className={li}>
          The <A href={links.voyager}>Voyager Golden Record</A> launched by
          NASA in 1977.
        </li>
        <li className={li}>
          Jalen Brunson and the Knicks coming back in{' '}
          <A href={links.game4}>Game 4</A> of the 2026 NBA finals.
        </li>
        <li className={li}>
          The <A href={links.falconHeavy}>landing of Falcon Heavy</A> in 2017.
          Still remember seeing this on TV as a third grader.
        </li>
        <li className={li}>
          Dario Amodei&apos;s optimism-essay on artificial intelligence,{' '}
          &ldquo;<A href={links.amodei}>Machines of Loving Grace</A>.&rdquo;
        </li>
        <li className={li}>
          Act I of Goethe&apos;s <em>Faust II</em>, as he turns his{' '}
          <A href={links.faust}>back to the sun</A>.
        </li>
        <li className={li}>
          That scene in <A href={links.bigHero6}><em>Big Hero 6</em></A> where
          the characters build and suit up (childhood memory).
        </li>
        <li className={li}>
          Beethoven String Quartet No. 14, <A href={links.op131}>Op. 131</A>
        </li>
      </ul>
    </PageShell>
  )
}
