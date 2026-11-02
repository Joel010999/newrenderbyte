# RenderByte Design System

## Direction

**Precision Glass** — a faithful extension of RenderByte’s Instagram identity: cool light grounds, magenta–violet–cyan brand energy, translucent panels and refractive liquid forms. The web version is more restrained than a social post: glass communicates hierarchy and state, while typography and evidence carry the sales narrative.

## Brand Source

- Instagram profile `renderbyte.web`.
- Confirmed references: posts `DdXJaCrmnKs` and `DdH0Azjmnbn`.
- Preserve the multicolor RB identity, pale background, dark typography, iridescent geometry and translucent material.

## Palette

- Cool ground: `#f4f3f8`
- Paper: `#ffffff`
- Primary ink: `#21182d`
- Magenta: `#c42ab6`
- Violet: `#7b4ee6`
- Cyan: `#20b9dc`

The brand gradient is reserved for primary actions and active progress. The hero phrase uses two solid endpoint colors—magenta and cyan—rather than gradient text. It never becomes a generic full-page wash.

## Typography

- Manrope: headings, navigation and reading text.
- IBM Plex Mono: technical state, sequence indices and pipeline metadata only.
- Display tracking stops at `-0.04em`; paragraphs target a 65-character measure.

## Material

- Liquid glass combines a translucent white fill, white inner highlight, cool structural edge and soft violet depth shadow.
- Glass panels require content or hierarchy; blur is never standalone decoration.
- Nested glass uses concentric radii: 24px outer, 18px inner, 6px inset.
- A solid fallback is provided when `backdrop-filter` is unavailable.

## Structure

- Hero: commercial proposition plus a real delivery-pipeline artifact inside one liquid-glass instrument.
- Services: specification rows, avoiding a generic equal-card grid.
- Process: the primary authored movement, synchronized through Planificación, Código, Testing and Deploy.
- Portfolio: asymmetric evidence grid sized by project significance.

## Motion

- CSS state changes use transitions.dev duration tokens.
- Hero load uses a GSAP timeline with left-to-right stagger.
- Process uses ScrollTrigger pinning on desktop and a static readable sequence on mobile.
- GSAP animates transforms and opacity; pointer response reuses `quickTo` tweens.
- The subtle overshoot curve is restricted to hover lift and arrows, matching the requested native spring response.
- `prefers-reduced-motion` disables authored movement and pinning.

## Accessibility

- Controls have a minimum 44px target.
- Dark text on pale glass maintains WCAG AA contrast.
- Keyboard focus is explicit and branded.
- The menu exposes state through `aria-expanded`; content remains readable without JavaScript or blur support.
