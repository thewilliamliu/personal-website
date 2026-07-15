import Link from 'next/link'
import AizawaBackground from 'app/components/aizawa'
import Controls from 'app/components/controls'

export const metadata = {
  title: 'The Aizawa Attractor',
  description: 'The equations behind the animation on the homepage.',
}

function Eq({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[13px] leading-7 opacity-90">
      {children}
    </div>
  )
}

export default function AttractorPage() {
  return (
    <>
      <AizawaBackground />
      <Controls />
      <div aria-hidden="true" className="h-[400vh]" />
      <main className="fixed inset-0 flex items-center justify-center p-6">
        <section className="glass-card w-full max-w-lg rounded-[28px] p-8 md:p-10">
          <h1 className="mb-4 text-xl font-bold tracking-tight">
            The Aizawa Attractor
          </h1>

          <p className="mb-4 text-[15px] leading-relaxed">
            The animation on the homepage is the Aizawa attractor, a strange
            attractor: a chaotic system whose trajectories never repeat or
            settle down, yet stay confined to this sphere-like shape forever.
            Each particle follows three coupled differential equations:
          </p>

          <div className="mb-3 rounded-lg panel px-4 py-3">
            <Eq>dx/dt = (z − b)·x − d·y</Eq>
            <Eq>dy/dt = d·x + (z − b)·y</Eq>
            <Eq>dz/dt = c + a·z − z³/3 − (x² + y²)(1 + e·z) + f·z·x³</Eq>
          </div>

          <p className="mb-4 text-[15px] leading-relaxed">
            with constants a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25,
            f = 0.1. The first two equations spin points around the vertical
            axis while pushing them outward or inward depending on height; the
            third squeezes the flow vertically, folding it back into the tube
            you see.
          </p>

          <p className="mb-5 text-[15px] leading-relaxed">
            The system is chaotic: two particles that start almost together
            drift apart exponentially fast, which is why the swarm smears into
            a cloud instead of marching in lockstep. Every dot here is just
            these three equations stepped forward in time, thousands of times
            per second.
          </p>

          <Link
            href="/"
            className="lnk text-xs"
          >
            ← back home
          </Link>
        </section>
      </main>
    </>
  )
}
