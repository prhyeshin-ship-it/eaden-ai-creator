# Design System Strategy: The Midnight Sanctuary

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Midnight Sanctuary."** 

We are moving away from the "template-heavy" web. This system rejects the rigid, boxy layouts of standard SaaS products in favor of a **High-End Editorial** experience. It is designed to feel like a premium digital concierge—quiet, authoritative, and restorative. 

To achieve this, we leverage **intentional asymmetry** and **tonal depth**. Rather than filling every pixel, we treat "negative space" as a luxury material. Elements should overlap slightly to create a sense of physical composition, mimicking the layout of a high-fashion magazine or a bespoke gallery catalog. Transitions must be "liquid"—slow, ease-in-out motions that reinforce the healing, premium nature of the brand.

---

## 2. Color Philosophy & Surface Architecture
The palette is rooted in the depth of a midnight sky (`surface: #001427`) contrasted against the warmth of aged parchment and muted gold.

### The "No-Line" Rule
**Borders are a design failure.** In this system, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined through background color shifts.
*   **Implementation:** Use `surface-container-low` to define a section sitting on a `surface` background. The transition should be felt, not seen as a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine paper.
*   **Base:** `surface` (#001427) for the main background.
*   **Level 1 (Subtle Inset):** `surface-container-low` (#081d30) for large structural areas.
*   **Level 2 (Active/Floating):** `surface-container-high` (#182b3f) for cards or interactive modules.
*   **Level 3 (Prominence):** `surface-container-highest` (#23364a) for modals or elevated navigation.

### The "Glass & Gradient" Rule
To avoid a flat, "standard" look, use **Glassmorphism** for floating elements. Apply a semi-transparent `surface-variant` with a `backdrop-blur` of 20px–40px. 
*   **Signature Textures:** For main CTAs or Hero backgrounds, use a subtle radial gradient transitioning from `primary` (#e8caa1) to `primary_container` (#cbaf87). This adds "soul" and a sense of metallic shimmer that flat colors lack.

---

## 3. Typography: The Editorial Voice
Our typography creates a dialogue between tradition (`notoSerif`) and modernity (`manrope`).

*   **Display & Headlines (The Serif Authority):** Use `notoSerif` for all `display-` and `headline-` scales. This provides the "Deep Classic" feel. Increase letter-spacing slightly (0.02em) on headlines to evoke luxury.
*   **Body & Labels (The Functional Gothic):** Use `manrope` (as the modern gothic equivalent) for all `body-` and `label-` scales. It ensures maximum readability and a clean, high-tech counter-balance to the serif headers.
*   **Hierarchy Note:** Use the `tertiary` (#d7ceb9) color for sub-captions to create a soft, readable contrast against the deep navy background without the harshness of pure white.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "digital." We achieve depth through atmospheric light.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on a `surface-container-low` section. This creates a soft, natural "lift" that feels integrated into the environment.
*   **Ambient Shadows:** If a floating effect is required (e.g., a primary modal), use a shadow with a blur of `40px` and an opacity of `6%`. The shadow color must be a tinted version of `on-surface` (#d1e4fe), not black, to mimic natural ambient light.
*   **The "Ghost Border" Fallback:** If a container requires a boundary for accessibility, use the `outline_variant` (#4d463c) at **15% opacity**. This creates a "Ghost Border"—visible enough to define space, but soft enough to remain premium.
*   **Glassmorphism:** Use semi-transparent layers for navigation bars to allow the "Deep Navy" background colors to bleed through, softening the edges of the UI.

---

## 5. Components

### Buttons
*   **Primary:** Pill-shaped (`rounded-full`). Background is a gradient of `primary` to `primary_container`. Text color is `on_primary` (#3f2d10).
*   **Secondary:** Ghost style. No background. Use a `Ghost Border` (outline-variant at 20%) and `primary` colored text.
*   **Tertiary:** Underlined text only. Use `notoSerif` for a sophisticated "text link" look.

### Cards & Lists
*   **Rule:** **No divider lines.** 
*   **Spacing:** Use a 32px or 48px vertical gap to separate list items. 
*   **Selection:** Instead of a border, a selected card should shift its background from `surface-container-low` to `surface-container-high`.

### Input Fields
*   **Style:** Minimalist. No bottom line or full box. Use a subtle `surface-container-highest` background with a `sm` (0.125rem) corner radius.
*   **Focus State:** The background stays the same, but the `primary` color (Muted Gold) appears as a subtle 1px "Ghost Border" at 40% opacity.

### Additional Component: The "Curated Detail"
*   **The Signature Accent:** Use a 2px vertical gold line (`primary`) to the left of `headline-lg` elements to denote "Featured Content." This acts as a visual anchor in an asymmetrical layout.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., a wider left margin than right) for editorial pages to create a "gallery" feel.
*   **Do** use `smooth-step` transitions (0.4s to 0.6s) for all hover states.
*   **Do** ensure that the `on_surface` text (#d1e4fe) is never used at 100% opacity for secondary information—drop it to 70% to maintain hierarchy.

### Don't
*   **Don't** use 1px solid lines for any reason other than the "Signature Accent" mentioned above.
*   **Don't** use pure black (#000000) for shadows; it kills the "Midnight Sanctuary" depth. Use a tinted navy.
*   **Don't** crowd elements. If the screen feels full, increase the spacing. Luxury is defined by the space you *don't* use.
*   **Don't** use standard "vibrant" colors for success or error. Use the muted `error` (#ffb4ab) to ensure it doesn't break the calming aesthetic.