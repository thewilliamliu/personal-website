import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Coursework' }

// Grouped by department; * = in progress or subject to change
const groups: [string, string][][] = [
  [
    ['MAT 345', 'Abstract Algebra*'],
    ['MAT 215', 'Real Analysis'],
    ['MAT 217', 'Linear Algebra'],
    ['MAT 203', 'Vector Calculus'],
  ],
  [
    ['COS 226', 'Algorithms and Data Structures'],
    ['ECE 435', 'Machine Learning and Pattern Recognition*'],
  ],
  [['PHY 207', 'Classical and Quantum Mechanics*']],
  [
    ['HIS 369', 'European Intellectual History'],
    ['HUM 418', 'The Faust Tradition'],
    ['PHI 301', 'Aristotle and His Successors'],
  ],
]

export default function Page() {
  return (
    <PageShell title="Coursework">
      {groups.map((group, gi) => (
        <div key={gi} className="mb-4">
          {group.map(([code, name]) => (
            <p key={code} className="font-[425] text-[13px] leading-[1.6]">
              <strong className="font-semibold">{code}</strong> {name}
            </p>
          ))}
        </div>
      ))}
      <p className="mt-4 font-[425] text-[12px] leading-[1.32] opacity-70">
        *In progress or subject to change.
      </p>
    </PageShell>
  )
}
