import PageShell from 'app/components/page-shell'

export const metadata = {
  title: 'The Aizawa Attractor',
  description: 'The equations behind the animation in the background.',
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
    <PageShell title="The Aizawa Attractor">

          <p className="mb-4 font-[425] text-[13px] leading-[1.32]">
            The animation in the background is the Aizawa attractor, a strange
            attractor: a chaotic system whose trajectories never repeat or
            settle down, yet stay confined to this sphere-like shape forever.
            Each particle follows three coupled differential equations:
          </p>

          <div className="panel mb-4 rounded-lg px-4 py-3">
            <Eq>dx/dt = (z − b)·x − d·y</Eq>
            <Eq>dy/dt = d·x + (z − b)·y</Eq>
            <Eq>dz/dt = c + a·z − z³/3 − (x² + y²)(1 + e·z) + f·z·x³</Eq>
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

    </PageShell>
  )
}
