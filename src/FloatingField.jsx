const objects = [
  { id: 'sphere', className: 'shape-sphere', visual: <span className="sphere-core" /> },
  {
    id: 'diamond',
    className: 'shape-diamond',
    visual: (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 4 94 50 50 96 6 50Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 4v92M6 50h88M50 4 6 50 50 96 94 50Z" fill="none" stroke="currentColor" strokeWidth="0.7" opacity=".52" />
      </svg>
    ),
  },
  {
    id: 'star',
    className: 'shape-star',
    visual: (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 0c5 29 21 45 50 50-29 5-45 21-50 50C45 71 29 55 0 50 29 45 45 29 50 0Z" fill="currentColor" />
      </svg>
    ),
  },
  { id: 'tile', className: 'shape-tile', visual: <span className="glass-core" /> },
  {
    id: 'curve',
    className: 'shape-curve',
    visual: (
      <svg viewBox="0 0 160 90" aria-hidden="true">
        <path d="M3 68C39 2 92 7 157 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 78C45 25 92 24 152 55" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'grid',
    className: 'shape-grid',
    visual: (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M10 10h100M10 35h100M10 60h100M10 85h100M10 110h100M10 10v100M35 10v100M60 10v100M85 10v100M110 10v100" fill="none" stroke="currentColor" strokeWidth=".8" opacity=".58" />
      </svg>
    ),
  },
];

export default function FloatingField() {
  return (
    <div className="floating-field" aria-hidden="true">
      {objects.map((object) => (
        <div className={`float-path ${object.className}`} data-float-path={object.id} key={object.id}>
          <div className="float-react" data-float-react={object.id}>
            <div className="float-pointer" data-float-pointer={object.id}>
              <div className="float-idle" data-float-idle={object.id}>
                {object.visual}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
