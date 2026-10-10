import type { Skill } from '@/content/skills'
import { cn } from '@/lib/cn'

const VIOLET = '#8b6fff'
const LIME = '#d9ff43'
const PAPER = '#f2f0f3'
const INK = '#0e0b1a'
const PLATE = '#1e1936'

const TITLE_FONT = "'Clash Grotesk', 'Inter', sans-serif"
const MONO_FONT = "'JetBrains Mono', monospace"

/**
 * Procedural artwork for a Skill. Each category renders a different kind of
 * "screen" — a printed page, a slide, a film frame, an image — drawn from the
 * Skill's own title so the card and the gallery stay recognisably the same
 * product. Deterministic: the same Skill always draws the same art.
 */
export function ArtifactPreview({
  skill,
  seed = 0,
  className,
}: {
  skill: Skill
  seed?: number
  className?: string
}) {
  const tone = (skill.art.tone ?? 'violet') === 'lime' ? LIME : VIOLET
  return (
    <svg
      viewBox="0 0 320 200"
      className={cn('block h-full w-full', className)}
      role="img"
      aria-label={`${skill.name} — preview`}
      preserveAspectRatio="xMidYMid slice"
    >
      {skill.category === 'web' && <WebArt skill={skill} tone={tone} seed={seed} />}
      {skill.category === 'slides' && <SlideArt skill={skill} tone={tone} seed={seed} />}
      {skill.category === 'video' && <VideoArt skill={skill} tone={tone} seed={seed} />}
      {skill.category === 'image' && <ImageArt skill={skill} tone={tone} seed={seed} />}
    </svg>
  )
}

function Chrome() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="20" fill={INK} />
      <rect x="10" y="7" width="6" height="6" fill={LIME} />
      <rect x="22" y="7" width="6" height="6" fill={VIOLET} />
      <rect x="34" y="7" width="6" height="6" fill={PAPER} opacity="0.6" />
      <rect x="52" y="7" width="120" height="6" fill={PAPER} opacity="0.25" />
    </g>
  )
}

/* ------------------------------------------------------------------ Web */
function WebArt({ skill, tone, seed }: { skill: Skill; tone: string; seed: number }) {
  const shape = skill.art.shape
  return (
    <g>
      <rect width="320" height="200" fill={PAPER} />
      <Chrome />
      {shape === 0 ? (
        <g>
          <rect x="0" y="20" width="320" height="120" fill={tone} />
          <circle cx={160 + seed * 6} cy="80" r="34" fill={PAPER} />
          <circle cx={148 + seed * 6} cy="76" r="4" fill={INK} />
          <circle cx={172 + seed * 6} cy="76" r="4" fill={INK} />
          <path d={`M${148 + seed * 6} 92 q12 10 24 0`} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={118 + i * 22} y="122" width="16" height="10" fill={i === seed % 4 ? INK : PAPER} opacity={i === seed % 4 ? 1 : 0.75} />
          ))}
        </g>
      ) : shape === 1 ? (
        <g>
          <rect x="20" y="44" width="140" height="12" fill={INK} />
          <rect x="20" y="64" width="104" height="12" fill={INK} />
          <rect x="20" y="92" width="120" height="4" fill={INK} opacity="0.4" />
          <rect x="20" y="102" width="96" height="4" fill={INK} opacity="0.4" />
          <rect x="180" y="40" width="120" height="112" fill={tone} />
          <rect x="192" y="52" width="40" height="6" fill={PAPER} opacity="0.8" />
        </g>
      ) : shape === 2 ? (
        <g>
          <rect x="0" y="20" width="320" height="72" fill={INK} />
          <rect x="24" y="42" width="150" height="14" fill={PAPER} />
          <rect x="24" y="64" width="96" height="6" fill={LIME} />
          <rect x="228" y="44" width="68" height="26" fill={tone} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={24 + i * 94} y="112" width="78" height="64" fill={PAPER} />
              <rect x={24 + i * 94} y="112" width="78" height="4" fill={i === seed % 3 ? tone : INK} />
              <rect x={34 + i * 94} y="130" width="42" height="6" fill={INK} opacity="0.7" />
              <rect x={34 + i * 94} y="144" width="58" height="4" fill={INK} opacity="0.35" />
              <rect x={34 + i * 94} y="154" width="50" height="4" fill={INK} opacity="0.35" />
            </g>
          ))}
        </g>
      ) : (
        <g>
          <rect x="20" y="40" width="150" height="130" fill={tone} />
          <ellipse cx="95" cy="118" rx="52" ry="24" fill={PAPER} opacity="0.9" />
          <rect x="190" y="44" width="72" height="10" fill={INK} />
          <rect x="190" y="62" width="110" height="4" fill={INK} opacity="0.4" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={190 + i * 26} y="86" width="20" height="10" fill={i === seed % 3 ? INK : PAPER} stroke={INK} strokeWidth="1" />
          ))}
          <rect x="190" y="118" width="86" height="28" fill={INK} />
          <rect x="200" y="130" width="52" height="4" fill={LIME} />
        </g>
      )}
      <text x="20" y="188" fontFamily={MONO_FONT} fontSize="9" letterSpacing="1.5" fill={INK} opacity="0.55">
        {skill.category.toUpperCase()} · {skill.version.toUpperCase()}
      </text>
    </g>
  )
}

/* --------------------------------------------------------------- Slides */
function SlideArt({ skill, tone, seed }: { skill: Skill; tone: string; seed: number }) {
  const shape = skill.art.shape
  return (
    <g>
      <rect width="320" height="200" fill={PAPER} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x="0" y={30 + i * 22} width="320" height="1" fill={INK} opacity="0.12" />
      ))}
      <rect x="0" y="0" width="8" height="200" fill={tone} />
      {shape === 0 ? (
        <g>
          <rect x="28" y="40" width="180" height="16" fill={INK} />
          <rect x="28" y="66" width="120" height="16" fill={INK} />
          <rect x="28" y="100" width="150" height="4" fill={INK} opacity="0.4" />
          <rect x="28" y="110" width="132" height="4" fill={INK} opacity="0.4" />
          <g transform="translate(244 44)">
            <rect width="52" height="52" fill={LIME} />
            <rect x="8" y="10" width="36" height="4" fill={INK} opacity="0.6" />
            <rect x="8" y="20" width="28" height="4" fill={INK} opacity="0.6" />
            <text x="8" y="44" fontFamily={MONO_FONT} fontSize="9" fill={INK}>
              01
            </text>
          </g>
          <text x="28" y="176" fontFamily={MONO_FONT} fontSize="9" letterSpacing="1.5" fill={INK} opacity="0.55">
            {skill.art.title.toUpperCase()} · {skill.art.sub?.toUpperCase()}
          </text>
        </g>
      ) : shape === 1 ? (
        <g>
          <rect x="26" y="36" width="96" height="40" fill={PAPER} stroke={INK} strokeWidth="2" />
          <rect x="36" y="50" width="60" height="4" fill={INK} opacity="0.6" />
          <rect x="36" y="60" width="40" height="4" fill={INK} opacity="0.6" />
          <rect x="150" y="66" width="110" height="44" fill={tone} />
          <rect x="228" y="40" width="64" height="34" fill={PAPER} stroke={INK} strokeWidth="2" />
          <path d="M124 60 L148 74" stroke={INK} strokeWidth="2" markerEnd="" />
          <path d="M146 74 l-8 -3 l2 8 z" fill={INK} />
          <path d="M196 112 C 200 140, 120 150, 60 128" stroke={INK} strokeWidth="2" fill="none" />
          <circle cx="60" cy="128" r="4" fill={LIME} stroke={INK} strokeWidth="1.5" />
          <rect x="30" y="150" width="120" height="4" fill={INK} opacity="0.35" />
          <rect x="30" y="160" width="90" height="4" fill={INK} opacity="0.35" />
        </g>
      ) : shape === 2 ? (
        <g>
          <rect x="0" y="0" width="320" height="200" fill={INK} />
          <rect x="0" y="0" width="320" height="0" />
          <rect x="28" y="60" width="200" height="18" fill={PAPER} />
          <rect x="28" y="90" width="140" height="18" fill={tone} />
          <rect x="28" y="130" width="60" height="4" fill={LIME} />
          <text x="28" y="176" fontFamily={MONO_FONT} fontSize="9" letterSpacing="1.5" fill={PAPER} opacity="0.6">
            {skill.art.sub?.toUpperCase()}
          </text>
        </g>
      ) : (
        <g>
          <rect x="28" y="38" width="200" height="12" fill={INK} />
          <rect x="28" y="56" width="120" height="4" fill={INK} opacity="0.4" />
          <g transform="translate(28 84)">
            {[42, 64, 30, 78, 52].map((h, i) => (
              <rect key={i} x={i * 28} y={72 - h} width="18" height={h} fill={i === seed % 5 ? tone : INK} opacity={i === seed % 5 ? 1 : 0.85} />
            ))}
          </g>
          <line x1="28" y1="156" x2="248" y2="156" stroke={INK} strokeWidth="1.5" />
          <rect x="262" y="112" width="34" height="44" fill={LIME} />
          <rect x="270" y="122" width="18" height="4" fill={INK} opacity="0.6" />
          <rect x="270" y="132" width="12" height="4" fill={INK} opacity="0.6" />
        </g>
      )}
    </g>
  )
}

/* ---------------------------------------------------------------- Video */
function VideoArt({ skill, tone, seed }: { skill: Skill; tone: string; seed: number }) {
  const shape = skill.art.shape
  return (
    <g>
      <rect width="320" height="200" fill={PLATE} />
      <rect width="320" height="200" fill="url(#vgrid)" opacity="0.5" />
      <defs>
        <pattern id="vgrid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0 L0 0 0 16" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
      </defs>
      {shape === 0 ? (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={14 + i * 76} y="50" width="64" height="76" fill={i === seed % 4 ? tone : '#2e2656'} />
              <rect x={14 + i * 76} y="50" width="64" height="76" fill="none" stroke={PAPER} strokeOpacity="0.15" />
            </g>
          ))}
          <path d="M150 82 l22 13 l-22 13 z" fill={LIME} />
          <text x="14" y="160" fontFamily={MONO_FONT} fontSize="11" letterSpacing="2" fill={LIME}>
            {skill.art.title.toUpperCase()}
          </text>
          <rect x="14" y="174" width="292" height="6" fill={PAPER} opacity="0.15" />
          <rect x="14" y="174" width={90 + seed * 40} height="6" fill={LIME} />
          <text x="286" y="170" fontFamily={MONO_FONT} fontSize="9" fill={PAPER} opacity="0.6" textAnchor="end">
            {skill.art.sub}
          </text>
        </g>
      ) : shape === 1 ? (
        <g>
          <rect x="0" y="0" width="320" height="200" fill={INK} />
          <rect x="20" y="112" width="280" height="2" fill={LIME} />
          <text x="20" y="96" fontFamily={TITLE_FONT} fontSize="46" fontWeight="500" letterSpacing="-1" fill={PAPER}>
            {skill.art.title}
          </text>
          <rect x="20" y="130" width="70" height="4" fill={LIME} />
          <text x="300" y="176" fontFamily={MONO_FONT} fontSize="10" letterSpacing="2" fill={PAPER} opacity="0.55" textAnchor="end">
            {skill.art.sub}
          </text>
        </g>
      ) : shape === 2 ? (
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={40 + i * 22} y={40 + i * 22} width={240 - i * 44} height={120 - i * 44} fill="none" stroke={i === 2 ? LIME : PAPER} strokeOpacity={i === 2 ? 1 : 0.25} strokeWidth="2" />
          ))}
          <rect x="130" y="86" width="60" height="28" fill={LIME} />
          <text x="160" y="105" fontFamily={MONO_FONT} fontSize="12" fontWeight="700" fill={INK} textAnchor="middle">
            {skill.art.sub}
          </text>
          <text x="160" y="176" fontFamily={MONO_FONT} fontSize="10" letterSpacing="2" fill={PAPER} opacity="0.6" textAnchor="middle">
            {skill.art.title.toUpperCase()}
          </text>
        </g>
      ) : (
        <g>
          <rect x="118" y="26" width="84" height="150" fill="#2e2656" />
          <rect x="124" y="32" width="72" height="138" fill={INK} />
          <rect x="130" y="42" width="60" height="8" fill={tone} />
          <rect x="130" y="58" width="44" height="4" fill={PAPER} opacity="0.5" />
          <rect x="130" y="74" width="60" height="30" fill={PLATE} />
          <rect x="130" y="112" width="60" height="6" fill={PAPER} opacity="0.3" />
          <rect x="130" y="124" width="36" height="6" fill={LIME} />
          <rect x="130" y="146" width="60" height="14" fill={tone} />
          <text x="30" y="104" fontFamily={MONO_FONT} fontSize="11" letterSpacing="2" fill={LIME}>
            {skill.art.title}
          </text>
          <text x="30" y="122" fontFamily={MONO_FONT} fontSize="10" fill={PAPER} opacity="0.55">
            {skill.art.sub}
          </text>
        </g>
      )}
    </g>
  )
}

/* ---------------------------------------------------------------- Image */
function ImageArt({ skill, tone, seed }: { skill: Skill; tone: string; seed: number }) {
  const shape = skill.art.shape
  return (
    <g>
      <rect width="320" height="200" fill={PAPER} />
      {shape === 0 ? (
        <g>
          <defs>
            <linearGradient id={`og-${seed}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={PAPER} />
              <stop offset="1" stopColor={tone} stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <rect width="320" height="200" fill={`url(#og-${seed})`} />
          <text x="26" y="96" fontFamily={TITLE_FONT} fontSize="26" fontWeight="500" letterSpacing="-0.5" fill={INK}>
            {skill.art.title}
          </text>
          <rect x="26" y="112" width="70" height="3" fill={INK} />
          <rect x="250" y="150" width="44" height="24" fill={INK} />
          <text x="262" y="166" fontFamily={MONO_FONT} fontSize="9" fill={LIME}>
            SB
          </text>
        </g>
      ) : shape === 1 ? (
        <g>
          <rect width="320" height="200" fill={tone} />
          <rect x="0" y="0" width="320" height="200" fill={INK} opacity="0.12" />
          <circle cx="160" cy="86" r="38" fill={PAPER} />
          <path d="M92 200 q68 -70 136 0 z" fill={PAPER} />
          <rect x="120" y="24" width="80" height="4" fill={PAPER} opacity="0.5" />
          <text x="160" y="188" fontFamily={MONO_FONT} fontSize="9" letterSpacing="2" fill={INK} opacity="0.6" textAnchor="middle">
            {skill.art.sub?.toUpperCase()}
          </text>
        </g>
      ) : shape === 2 ? (
        <g>
          <rect width="320" height="200" fill={PAPER} />
          <rect x="18" y="30" width="86" height="46" stroke={INK} strokeWidth="2" fill="none" />
          <rect x="30" y="44" width="40" height="4" fill={INK} />
          <rect x="30" y="56" width="56" height="4" fill={INK} opacity="0.5" />
          <circle cx="196" cy="52" r="20" fill={LIME} stroke={INK} strokeWidth="2" />
          <path d="M108 52 C 140 52, 150 52, 174 52" stroke={INK} strokeWidth="2" fill="none" />
          <path d="M172 52 l-8 -4 l0 8 z" fill={INK} />
          <rect x="60" y="112" width="140" height="4" fill={INK} opacity="0.4" />
          <rect x="60" y="122" width="110" height="4" fill={INK} opacity="0.4" />
          <rect x="60" y="132" width="128" height="4" fill={INK} opacity="0.4" />
          <path d="M196 108 C 240 120, 250 140, 244 156" stroke={INK} strokeWidth="2" fill="none" />
          <circle cx="244" cy="160" r="6" fill={tone} />
          <text x="18" y="186" fontFamily={MONO_FONT} fontSize="9" letterSpacing="2" fill={INK} opacity="0.6">
            {skill.art.title.toUpperCase()}
          </text>
        </g>
      ) : (
        <g>
          <rect width="320" height="200" fill={tone} />
          <rect x="96" y="40" width="128" height="120" fill={PAPER} />
          <rect x="112" y="60" width="96" height="52" fill={INK} />
          <circle cx="140" cy="86" r="9" fill={LIME} />
          <circle cx="180" cy="86" r="9" fill={LIME} />
          <path d="M150 102 q10 8 20 0" stroke={LIME} strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="128" y="126" width="64" height="18" fill={INK} opacity="0.85" />
          <rect x="112" y="30" width="96" height="10" fill={INK} />
          <rect x="150" y="12" width="20" height="10" fill={INK} />
          <text x="160" y="182" fontFamily={MONO_FONT} fontSize="9" letterSpacing="2" fill={INK} opacity="0.7" textAnchor="middle">
            {skill.art.sub?.toUpperCase()}
          </text>
        </g>
      )}
    </g>
  )
}
