import Link from 'next/link'
import Controls from 'app/components/controls'

export const metadata = {
  title: 'The Aizawa Attractor',
  description: 'The equations behind the animation in the background.',
}

// Typeset math without a LaTeX runtime: serif italics + stacked fractions
const mathFont = {
  fontFamily: "'STIX Two Math', 'Cambria Math', 'Times New Roman', serif",
}

function V({ children }: { children: React.ReactNode }) {
  return <i>{children}</i>
}

function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex flex-col items-center align-middle text-[11px] leading-[1.15]">
      <span className="border-b border-current px-1">{n}</span>
      <span className="px-1">{d}</span>
    </span>
  )
}

function Sup({ children }: { children: React.ReactNode }) {
  return <sup className="text-[9px]">{children}</sup>
}

function Eq({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-2 text-[14px]" style={mathFont}>
      {children}
    </div>
  )
}

export default function AttractorPage() {
  return (
    <>
      <Controls />
      <div aria-hidden="true" className="h-[400vh]" />
      <main className="fixed inset-0 flex items-center justify-center p-6">
        <section className="w-full max-w-lg p-8 md:p-10">
          <h1 className="mb-3 text-[17px] font-semibold ">
            The Aizawa Attractor
          </h1>

          <p className="mb-4 font-[425] text-[13px] leading-[1.32]">
            The animation in the background is the Aizawa attractor, a strange
            attractor: a chaotic system whose trajectories never repeat or
            settle down, yet stay confined to this sphere-like shape forever.
            Each particle follows three coupled differential equations:
          </p>

          <div className="panel mb-4 rounded-lg px-5 py-3">
            <Eq>
              <Frac n={<>d<V>x</V></>} d={<>d<V>t</V></>} /> = (<V>z</V> −{' '}
              <V>b</V>)<V>x</V> − <V>d</V>&#8202;<V>y</V>
            </Eq>
            <Eq>
              <Frac n={<>d<V>y</V></>} d={<>d<V>t</V></>} /> = <V>d</V>&#8202;
              <V>x</V> + (<V>z</V> − <V>b</V>)<V>y</V>
            </Eq>
            <Eq>
              <Frac n={<>d<V>z</V></>} d={<>d<V>t</V></>} /> = <V>c</V> +{' '}
              <V>a</V>&#8202;<V>z</V> −{' '}
              <Frac n={<><V>z</V><Sup>3</Sup></>} d={<>3</>} /> − (<V>x</V>
              <Sup>2</Sup> + <V>y</V>
              <Sup>2</Sup>)(1 + <V>e</V>&#8202;<V>z</V>) + <V>f</V>&#8202;
              <V>z</V>&#8202;<V>x</V>
              <Sup>3</Sup>
            </Eq>
          </div>

          <p className="mb-4 font-[425] text-[13px] leading-[1.32]">
            with constants a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25,
            f = 0.1. The first two equations spin points around the vertical
            axis while pushing them outward or inward depending on height; the
            third squeezes the flow vertically, folding it back into the tube
            you see.
          </p>

          <p className="mb-5 font-[425] text-[13px] leading-[1.32]">
            The system is chaotic: two particles that start almost together
            drift apart exponentially fast, which is why the swarm smears into
            a cloud instead of marching in lockstep. Every dot here is just
            these three equations stepped forward in time, thousands of times
            per second.
          </p>

          <Link href="/" className="lnk text-xs">
            ← back home
          </Link>
        </section>
      </main>
    </>
  )
}
