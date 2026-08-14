---
name: at9-design-system
description: The At9 design system for the website (/website) and marketing — colour, type, spacing, components, accessibility, the marketing/social tiles and web-only CSS. Read it BEFORE writing or changing any page, section or marketing asset in /website. The rendered reference is at9-design-system.html at the repo root.
---

# At9 Design System — Website & marketing

The rules for building any At9 web surface — at9.app pages, the web booking link, social
posts and print. This is the source of truth for how the /website UI looks and behaves.
Read it before you write or change a page, section or marketing asset.

This skill covers the **website and marketing tiles**. The React Native app rules (the
migration protocol, RN platform gotchas, the app definition-of-done) live in the app's
copy of this skill. Everything about colour, type, spacing, components and accessibility
below applies to both platforms — the marketing/social section (§9) and the web-only CSS
(§12.3–§12.4) are web-specific.

## 1. The idea in one line

**At9 is a one-colour brand.** Primary is the brand. Mint is the spark, and it only ever
lives on primary. Everything else is neutral.

The most common way to wreck this system is to reach for another colour because a
layout feels flat. A flat layout is a **spacing** problem. Fix the spacing.

---

## 2. Use of colour

### 2.1 Brand

|              | Hex       | Job                                                |
| ------------ | --------- | -------------------------------------------------- |
| **Primary**   | `#554aca` | The brand. Interactive and selected. Nothing else. |
| **Lavender** | `#e7e4f8` | Emphasis without invitation.                       |
| **Mint**     | `#a3f6c0` | The spark. On primary only. **Never on white.**     |
| **Rose**     | `#e0409c` | Marketing only. Never on a control.                |

The full primary ramp. You should rarely need anything outside 100 / 500 / 700 / 950:

|         | Hex           | Use                                                      |
| ------- | ------------- | -------------------------------------------------------- |
| 50      | `#f4f2fc`     | Faint wash — hover on outlined buttons, selected rows    |
| 100     | `#e7e4f8`     | Container fill (light) · container text (dark)           |
| 200     | `#cbcbe8`     | Pressed state, dark mode                                 |
| 300     | `#ada5f2`     | —                                                        |
| 400     | `#6e6fbf`     | Dark-mode primary sits near here (`#ada5f2`)             |
| **500** | **`#554aca`** | **PRIMARY**                                              |
| 600     | `#463da6`     | Hover                                                    |
| 700     | `#3a2f86`     | Pressed · container fill (dark) · deep marketing grounds |
| 800     | `#222049`     | —                                                        |
| 900     | `#2f2a70`     | Text on lavender                                         |
| 950     | `#1a1440`     | Deepest ground. Mint sings here.                         |

### 2.2 Neutrals — primary-tinted, never pure grey

`#ffffff` `#fbfaff` `#f4f3f9` `#e6e4ef` `#cbc7d8` `#a29daf` `#6f6a80` `#565165`
`#3c3849` `#272335` `#1a1725` `#100e18`

Two of these carry contrast obligations and are **not interchangeable** with their
neighbours:

| Token           | Light     | Dark      | Why this exact value                                                                                                                                                                 |
| --------------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `borderControl` | `#8d8799` | `#706a88` | The border of a form control **is** the thing that identifies it, so WCAG 1.4.11 requires **3:1**. `#e6e4ef` is 1.26:1 — it fails. This clears 3.47:1 on white and 3.14:1 on sunken. |
| `textFaint`     | `#6f6a80` | `#8b85a1` | Captions and overlines are small text and need **4.5:1** on _every_ surface they can land on, including `sunken`. The old `#78738a` was 4.12:1 on sunken — a fail.                   |

`border` (`#e6e4ef`) stays light. It separates cards and panels — decorative structure,
not a control boundary — so the 3:1 rule doesn't apply to it. **This split is the whole
trick:** the light border keeps the UI clean, and the darker one goes only where it's
legally and practically required. It also happens to reinforce §3's rule that a form
control's border must read as an affordance you can act on.

Pure `#888` next to `#554aca` looks dirty. The tint is what makes the palette read as
designed rather than assembled. **Never use a neutral from outside this list.**

### 2.3 The colour budget — check every screen against this

| Layer       | Share     | What it covers                               |
| ----------- | --------- | -------------------------------------------- |
| Neutral     | **~80%**  | Backgrounds, text, borders, cards            |
| Primary      | **~15%**  | The interactive layer + one container region |
| Status      | as needed | Only where there is real status to report    |
| Mint + rose | **≤3%**   | Most screens use **zero**                    |

### 2.4 Where primary goes

**Primary means: this is interactive, or this is selected.** Nothing else.

| ✅ Primary                                            | ❌ Never primary                         |
| ---------------------------------------------------- | --------------------------------------- |
| The one filled button on a screen                    | Headings or body text                   |
| Selected: checkbox, radio, tab, nav item, chip, date | Decorative panels or gradients          |
| The app header bar                                   | Non-interactive icons                   |
| Focus rings, links                                   | A second filled button in the same view |

`#e7e4f8` is for **emphasis without invitation** — the summary card, a tonal button, the
selected drawer row. Roughly **one lavender region per screen**; more and the whole app
goes pastel. Its text is `#2f2a70` (10.3:1). Grey on lavender looks like a rendering
bug.

### 2.5 Where mint goes — the signature rule

**Mint only ever appears on primary.** This is not taste, it is arithmetic:

| Mint `#a3f6c0` on…               | Contrast    | Verdict                                                   |
| -------------------------------- | ----------- | --------------------------------------------------------- |
| Primary 500 `#554aca`             | **5.1:1**  | ✅ graphics, icons, rules, large text ≥24px. ❌ body text |
| Primary 700 `#3a2f86`             | **9.4:1**  | ✅ anything, any size                                     |
| Primary 950 `#1a1440`             | **13.8:1** | ✅ anything. Mint is at its best here                     |
| **White**                        | **1.2:1**  | ❌ **Invisible. A bug, not a style.**                     |
| Ink `#06301e` **on** a mint fill | 12:1      | ✅ the only safe way to put text on mint                  |

Sanctioned mint slots — and only these:

1. The active tab underline in the primary app header
2. A highlight block or underline on a primary hero headline
3. The "9" in the wordmark, when the mark sits on primary
4. A small marker on a primary tile — a live dot, a keyline, a corner rule
5. One accent series in a chart drawn on a primary ground
6. Social and print: a keyline, a highlighter mark, a sticker — on primary
7. **The focus ring on a primary surface** — mint is the only palette colour that reads as
   a ring against primary (5.1:1). See §6.2.
8. **A `<TextBlock>` marker stroke on a primary surface** — this is the _only_ sanctioned
   way to ink a word. The component picks the colour from the surface, so it can't get it
   wrong. See §7.7.
9. **A big number on a deep-primary ground** — mint is the only accent that can carry
   display type (13.8:1 on primary 950). See §9.2.
10. **The ring on a circular photo** in an endcard, on primary.

Mint is **never** a button, a status, an alert, or a control. If you find mint on a
white card, delete it.

### 2.6 Where rose goes

Marketing only: a chip, an illustration, a chart series, a sticker. **Never on a control
or a status** — rose sits 20° from danger red and will be read as an error.

**Rose `#e0409c` is a fill, not a text colour** — it's 3.9:1 on white, which fails. If
rose must be text, use **`#b02275`** (6.3:1).

Mint and rose never appear on the same view, except in a deliberate marketing lockup.

### 2.7 Status

Hues sit at 155° / 40° / 355° / 200°, far from primary's 254°, so a badge can never be
misread as brand.

|         | Light     | Container | On-container | Dark      | Dark container | On-dark-container |
| ------- | --------- | --------- | ------------ | --------- | -------------- | ----------------- |
| success | `#10794f` | `#d5f2e3` | `#06301e`    | `#58d69d` | `#094a31`      | `#c3f0d9`         |
| warning | `#8f5700` | `#ffe6c2` | `#331d00`    | `#f2b45a` | `#573200`      | `#ffe0b5`         |
| danger  | `#c02a3c` | `#ffdbdf` | `#40000a`    | `#ff8d99` | `#7a121f`      | `#ffd9dd`         |
| info    | `#0a6f96` | `#cdeefc` | `#002534`    | `#6dd2f5` | `#06455c`      | `#c3ecfb`         |

**Badges and banners use the container pair, not the solid.** Solid status fill is for
exactly one thing: a destructive button.

### 2.9 Surfaces — the layering model

**Three levels. Never a fourth.**

| Level           | Token        | Light     | Dark      | What sits here                                                                                                                                                  |
| --------------- | ------------ | --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0 · Ground**  | `background` | `#fbfaff` | `#100e18` | The screen itself.                                                                                                                                              |
| **1 · Surface** | `surface`    | `#ffffff` | `#1a1725` | Cards, panels, list containers, sheets, menus, the calendar.                                                                                                    |
| **2 · Sunken**  | `sunken`     | `#f4f3f9` | `#15121f` | Recessed _inside_ a surface. Reads as **carved in**: segmented-control tracks, slider tracks, skeletons, thumbnails, the file dropzone, secondary icon buttons. |

Plus two tints that sit **on** a surface rather than between levels:

| Token              | Light     | Dark      | Use                                                                                                    |
| ------------------ | --------- | --------- | ------------------------------------------------------------------------------------------------------ |
| `surfaceBrand`     | `#f4f2fc` | `#251f47` | The faintest primary wash. Hover on an outlined button, a hovered or selected row. Never a whole panel. |
| `primaryContainer` | `#e7e4f8` | `#3a2f86` | The **one** emphasis region per screen.                                                                |

**The direction rule, and why dark mode breaks without it:** _surface is always lighter
than ground; sunken always sits between them._ That holds in **both modes**. Dark mode is
not an inversion — a dark card is still _lighter_ than the dark screen behind it. Invert
the relationship and every card reads as a hole punched in the page.

**Never stack three surfaces.** Ground → surface → sunken is the ceiling.

**In dark mode, elevation is carried by surface lightness and a 1px border — not shadow.**
Shadow is nearly invisible on a dark ground.

### 2.9.1 Two layout modes — pick one per screen, never mix

Content does **not** always need to live in a card. Forcing cards onto a long,
homogeneous list gives you a stack-of-boxes texture and throws away ~32px of row width on
boundaries that carry no information — every row is the same kind of thing, so the
boundary says nothing.

Every screen is one of two modes. **Decide before you build, and don't mix them.**

#### Mode A — Grouped

```
ground  = background (#fbfaff)      ← tinted
content = cards and panels on top   ← inset, 16px gutter
```

Use when the screen holds **discrete objects of different kinds**: the Today screen, a
booking detail, settings groups, a dashboard. The boundary is doing real work — it tells
you where one booking ends and the next begins.

#### Mode B — Plain

```
ground  = surface (#ffffff)         ← level 0 and 1 collapse into one
content = rows directly on it, 1px dividers between
```

Use for **long, homogeneous lists**: the guest list, messages, search results, the
bookings index. Set `background = surface` for the whole screen. Rows sit straight on it
with a divider between them and no card in sight.

This is not a violation of the layering model — it's level 0 collapsing into level 1.
Sunken still works normally on top (the search field's fill).

**Never mix.** A grouped card sitting above a plain divider-list on the same screen is two
competing systems, and it reads as a bug. If a screen genuinely needs both, it's two
screens, or the grouped part becomes a header that scrolls away.

**Never put a plain list on a tinted ground.** Rows with no surface behind them, floating
on `#fbfaff`, look homeless. If you're in Mode B, the ground goes white.

### 2.9.2 What may sit directly on the ground

**Structural text lives on the ground. Records live on a surface.**

| ✅ On the ground                                        | ❌ Needs a surface                         |
| ------------------------------------------------------- | ------------------------------------------ |
| Screen titles (H1) and section headings (H2)            | A booking, a guest, a payment — any record |
| Overlines and group headers above a set of rows         | Anything a user taps or acts on            |
| Explanatory copy — _"Choose what gets emailed to you."_ | Anything with a status                     |
| Empty states                                            | Any figure the user needs to trust         |
| Captions and footnotes beneath a group                  | Form controls                              |

The test: **does this text _describe_ content, or _is_ it content?** A heading describing
a group belongs on the ground — wrapping it in a card would be absurd. A guest's name and
their unpaid deposit is a record: it gets a boundary.

### 2.9.3 Which mode, where in At9

| Screen                          | Mode            |
| ------------------------------- | --------------- |
| Today (summary + mixed cards)   | **A · Grouped** |
| Booking detail                  | **A · Grouped** |
| Settings                        | **A · Grouped** |
| Calendar (one big surface)      | **A · Grouped** |
| Guests list                     | **B · Plain**   |
| Messages                        | **B · Plain**   |
| Bookings index / search results | **B · Plain**   |

### 2.10 Coloured surfaces, and the text that goes on them

Some surfaces aren't neutral. Each one has **exactly one** text colour, and its muted
variant is _that colour at reduced opacity_ — never `textMuted`.

| Surface                    | Primary text         | Muted text            | Border on it            |
| -------------------------- | -------------------- | --------------------- | ----------------------- |
| `background` / `surface`   | `text`               | `textMuted`           | `border`                |
| `sunken`                   | `text`               | `textFaint`           | `border`                |
| `primary` (the app header) | `onPrimary`          | `onPrimary` @ **85%** | white @ 24%             |
| `primaryContainer`         | `onPrimaryContainer` | same @ 80%            | transparent             |
| Status container           | its `on-container`   | same @ 85%            | its solid status colour |
| Primary 500 (marketing)     | `#ffffff`            | white @ **85%**       | white @ 20%             |
| Primary 950 (marketing)     | `#ffffff`            | white @ **75%**       | white @ 14%             |
| Mint fill                  | `#06301e`            | —                     | none                    |

**Never use `textMuted` on a coloured surface.** It's a neutral tuned for white and near-
black grounds; on primary or lavender it goes muddy and drops below 4.5:1. On a coloured
surface, "muted" means _the on-colour, at lower opacity_.

**The alphas above are computed, not chosen.** White at 62% on primary is 4.5:1 — it
fails. 85% is 7:1. Muted-on-colour is a much narrower band than it looks: don't go
below these numbers because a mock looks prettier.

Same for borders: a neutral `border` on a primary header is invisible. Use white at low
opacity.

### 2.11 Which surface, when

| Situation                                                        | Surface                                         |
| ---------------------------------------------------------------- | ----------------------------------------------- |
| The screen background                                            | `background`                                    |
| A booking card, a settings panel, a menu, a sheet                | `surface`                                       |
| A search field's fill, a segmented track, a skeleton, a dropzone | `sunken`                                        |
| A row the user is hovering or has selected                       | `surfaceBrand`                                  |
| The one summary card at the top of Today                         | `primaryContainer`                              |
| The app header                                                   | `primary`                                       |
| A warning about an expiring certificate                          | `warningContainer`                              |
| A toast                                                          | dark surface, in **both** modes                 |
| A modal scrim                                                    | `scrim`                                         |
| A social tile                                                    | primary 500, primary 950, white, or lavender (§9) |

**Three rules that catch most mistakes:**

1. **Pick a layout mode and hold it** (§2.9.1). Grouped or plain, never both on one screen.
2. **Records get a surface; structural text doesn't.** If it's a thing the user acts on or
   must trust, it needs a boundary. If it merely describes what follows, it doesn't.
3. **One `primaryContainer` region per screen.** A second one means neither is emphasised.

### 2.8 Dark mode is not an inversion

`#554aca` is 4.2:1 on a dark surface — it **fails** as dark-mode text or icon colour. So
the two brand colours swap roles:

| Token                | Light     | Dark      |
| -------------------- | --------- | --------- |
| `primary`            | `#554aca` | `#ada5f2` |
| `onPrimary`          | `#ffffff` | `#1a1440` |
| `primaryContainer`   | `#e7e4f8` | `#3a2f86` |
| `onPrimaryContainer` | `#2f2a70` | `#e6e1f9` |

Mint does **not** change between modes. It's already at home on a dark primary ground.

---

## 3. Borders — the structural language

At9 separates things with **lines, not shadows**. This is the biggest single reason the
UI reads as clean rather than as a pile of floating cards.

| Weight            | Token                    | Where                                                                                                                            |
| ----------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **1px**           | `border` `#e6e4ef`       | Panels, cards, dividers, table rules, list separators. The default.                                                              |
| **1.5px**         | `borderControl`          | Form controls — inputs, selects, pickers, textareas, search. The border **is** the affordance, so it clears WCAG 1.4.11 (3:1); see §2.2 / §6.1. (Outlined buttons carry a label, so they may use `border`.) |
| **2px**           | `borderStrong` `#cbc7d8` | Unchecked checkbox, radio, switch track.                                                                                         |
| **2px `primary`** |                          | Selected or focused control border.                                                                                              |
| **3px `primary`** |                          | Left rail on a card needing attention. Sparingly.                                                                                |
| **3px ring**      | `focusRing`              | Keyboard focus. Always.                                                                                                          |

**Shadow is reserved for things that genuinely float:** modals, bottom sheets, dropdown
panels, context menus, toasts, the FAB. **A card never has a shadow. A panel never has a
shadow.**

---

## 4. Layout, spacing and alignment

### 4.1 The scale

**4px base grid.** Every gap, pad and margin is a multiple. Nothing is 15px, 18px or 30px.

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`

Below 4px, use 2px only for hairline optical corrections (a border offset, a baseline
nudge). Never as layout.

### 4.2 Screen gutters — the outer edge

The gutter is the space between content and the screen edge. **Everything on a screen
shares this one left edge.** It is the spine of the layout.

| Width      | Device                              | Gutter   |
| ---------- | ----------------------------------- | -------- |
| < 480px    | Phone                               | **16px** |
| 480–767px  | Large phone / small tablet portrait | **20px** |
| 768–1023px | Tablet                              | **24px** |
| 1024px+    | Desktop / tablet landscape          | **32px** |

Only three things may break the gutter and go full-bleed: the app header bar, a
hero image, and a horizontally-scrolling row (which starts _at_ the gutter and runs off
the right edge — that overflow is the affordance that tells you it scrolls).

### 4.3 Container widths — the counter-intuitive one

**Wider screens do not mean wider content.** They mean _more margin_, or _another
column_. A form field stretched to 900px is harder to use than one at 400px, because the
eye can't track from label to value.

| Content               | Max width                                                                 |
| --------------------- | ------------------------------------------------------------------------- |
| Prose                 | **65ch** (~640px). Beyond this the eye loses the row on the return sweep. |
| A form column         | **480px.** Never wider, on any device.                                    |
| Modal dialog          | **400px**                                                                 |
| App shell / marketing | **1200px**, centred                                                       |

On tablet, the answer to extra width is a **second column** (list + detail), not a
stretched one. If there's no second column to show, centre the content and let the
margins grow.

### 4.4 Vertical rhythm

Space belongs **below** the thing it separates, not above. Set `margin-bottom`, never
`margin-top` — then a section's spacing is a property of the section itself and doesn't
collapse or double up when things move.

| Relationship                          | Gap                                                 |
| ------------------------------------- | --------------------------------------------------- |
| Heading → its own body copy           | **8px**                                             |
| Body copy → the next heading          | **24px**                                            |
| Section → section                     | **32px** phone · **40px** tablet · **48px** desktop |
| Card → card in a list                 | **12px**                                            |
| List row → list row                   | **0** — separated by a 1px divider, not a gap       |
| Form field → form field               | **16px**                                            |
| Label → its control                   | **6px**                                             |
| Label → help text → control           | **4px**, then **8px**                               |
| Control → its error message           | **6px**                                             |
| Buttons side by side                  | **8px**                                             |
| Icon → its label (in a button)        | **8px**                                             |
| Icon or avatar → text (in a list row) | **12px**                                            |

**One gap value per relationship type, across the whole product.** If cards are 12px
apart on one screen and 16px on another, the app feels loose even though no single screen
looks wrong.

### 4.5 Component padding

| Component            | Padding                                                      |
| -------------------- | ------------------------------------------------------------ |
| Card                 | **16px**                                                     |
| Panel                | **20px** phone · **24px** desktop                            |
| Modal / bottom sheet | **20px**                                                     |
| Button               | **18px** horizontal, height fixed at 44px                    |
| Small button         | **12px** horizontal, 36px high                               |
| Text input, select   | **14px** horizontal, 44px min height                         |
| Textarea             | **14px** horizontal, **12px** vertical                       |
| Badge / chip         | **9px** horizontal                                           |
| List row             | **12px** vertical, **0** horizontal (it inherits the gutter) |

**Inner padding is always less than outer padding.** A 16px card inside a 20px panel is
correct; a 20px card inside a 16px panel is not — the nesting reads backwards.

### 4.6 Alignment

- **One left edge.** Headings, body, icons, avatars, cards all start at the gutter. If
  something is indented, it's because it's _inside_ something — nesting, not decoration.
- **One right edge.** Trailing chevrons, badges, switches and prices all end at the
  gutter. A ragged right edge in a list is the fastest way to make an app look cheap.
- **Numbers right-align. Text left-aligns.** Always, in every table and every list where
  a figure repeats down a column. Right-aligned tabular figures let you compare
  magnitudes without reading them.
- **Never centre a paragraph.** Centre a single line (an empty state, a hero), never a
  block. A centred paragraph has no left edge for the eye to return to.
- **Optical, not mathematical, centring.** A chevron or play glyph has more visual weight
  on one side; nudge it 1px so it _looks_ centred. This is the one place a non-grid value
  is allowed.
- **Text has side bearings.** Large display type sits ~2–4% in from its box. On marketing
  headlines, pull it back with a negative margin so the text edge — not the box edge —
  lines up with everything below it. In the app, leave it alone.

### 4.7 Touch and safe areas

- **44×44pt minimum tap target**, even when the visual mark is 20px.
- **8px minimum between adjacent targets.** Two 44px buttons touching is one 88px mistake.
- Respect the **top safe area** (notch) and the **bottom safe area** (home indicator,
  ~34pt on iOS). Never place a control inside them.
- Scrollable content ends with **bottom padding = footer height + safe area + 24px**, so
  the last row clears the footer nav and the FAB.
- The **thumb zone** is the bottom third of a phone screen. Primary actions belong there
  — a FAB, a sticky footer button — not at the top of a long scroll.

### 4.8 Radius

| Radius | Where                                                        |
| ------ | ------------------------------------------------------------ |
| 6px    | Checkbox                                                     |
| 8px    | Badges, chips, tags, menu items                              |
| 12px   | Buttons, inputs, selects, dropdowns, context menus, tooltips |
| 16px   | Cards, panels, list rows                                     |
| 20px   | Modals, bottom sheets, calendar                              |
| 999px  | Switch track, avatar, round icon button, segmented control   |

Never mix radii within one component. A 12px button inside a 16px card is correct; a 12px
button beside an 8px button is not.

**Nested radius:** an inner radius should be the outer radius minus the padding between
them. A 16px card with 16px padding holds a child with a **12px** radius comfortably; give
that child 16px and the corners look pinched.

---

## 5. Typography

**Two faces, split by what the surface *does* — not by which folder it lives in.**

| Surface                                              | Face                                  |
| ---------------------------------------------------- | ------------------------------------- |
| **Product** — the app, and the web booking page (`/website/book`) | **Inter** — 400 / 500 / 600 / 700 |
| **Marketing** — every other page on the website      | **Switzer** — 400 / 500 / 600 / 700   |
| Any number in a list, table or price                 | the surface's face + `tabular-nums` + `slashed-zero` |

**The test: is the person reading, or working?** A marketing page is read — it has to
have a voice and persuade someone who has never heard of At9. A product surface is
worked: slots, dates, prices, forms, counts. Inter is drawn for exactly that — tall
x-height, open apertures, figures that hold a column at 13px. It is also unremarkable,
which is right behind a working diary and wrong on a page that has to sell. Switzer is
warmer and more distinctive, and carries the marketing surfaces without tipping into
decoration.

**The web booking page is the case that proves the rule.** It sits under `/website`, so
"the website uses Switzer" would put it there — but it is a booking tool with a calendar,
forty time slots and a payment step, and the customer using it is working, not reading.
It uses **Inter**, like the app. Its brand is carried by the indigo palette and the
"Powered by At9 Booking" mark, which do that job better than a typeface does at 13px.

**One face per surface.** Within either, do not introduce a second family for headings.
Weight, size and colour are the hierarchy; a second face is not.

- **App, and `/website/book`:** load Inter (the app bundles it; the booking page loads weights 400–700). React Native fallback if you cannot bundle it: the system stack
  (SF Pro / Roboto). Do not substitute a random Google font — a mismatched fallback is
  worse than a system font.
- **Website (marketing pages):** load Switzer from Fontshare, **weights 400/500/600/700 only**. Nothing on
  the site uses 800, and loading a weight you do not use is a file on the critical path
  for nothing. Never reference a weight that is not loaded — the browser synthesises a
  fake bold, which reads as smeared and uneven.
- Fallback stack on web: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

**The one exception — Caveat.** A handwriting face used for a small number of
handwritten-aside accents on the **marketing homepage only** (the hero badge, hero tags,
the booking-link annotation). It is the brand's one moment of warmth. It must never
appear in the app, on the booking page, or in running prose, and it never carries
information that is not also available without it. If you are reaching for it anywhere
else, the answer is no.

### The scale — app (dp)

Twelve styles. If you reach for a thirteenth, you've made a mistake.

| Style          | Size / line | Weight | Tracking      | Default colour | **Use it for**                                                                                                             |
| -------------- | ----------- | ------ | ------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Display**    | 32 / 38     | 700    | −0.03em       | `text`         | Onboarding and in-app marketing screens. **One per screen, never in a list.**                                              |
| **H1**         | 28 / 34     | 700    | −0.025em      | `text`         | The screen title. One per screen.                                                                                          |
| **H2**         | 22 / 28     | 700    | −0.02em       | `text`         | Section headings within a screen.                                                                                          |
| **H3**         | 18 / 24     | 600    | −0.01em       | `text`         | Subsection headings. Modal and bottom-sheet titles.                                                                        |
| **Title**      | 15 / 20     | 600    | −0.01em       | `text`         | **Card titles and list-row titles.** The guest's name, the booking name. Not a heading — it names _one thing_.             |
| **Body large** | 17 / 26     | 400    | 0             | `text`         | Dialog body copy. Empty-state prose. Onboarding paragraphs. Anywhere a single paragraph carries real weight.               |
| **Body**       | 15 / 22     | 400    | 0             | `text`         | The default. Everything with no better answer.                                                                             |
| **Body small** | 13 / 20     | 400    | 0             | `textMuted`    | **The second line under a Title** — "Pen 3 · 18–26 Jul · £140.00". Secondary table cells. Supporting detail inside a card. |
| **Label**      | 13 / 16     | 600    | +0.01em       | `textMuted`    | **Form field labels, and nothing else.** Sits above every input, select, textarea, stepper, slider and dropzone.           |
| **Button**     | 15 / 20     | 600    | −0.01em       | contextual     | Buttons, chips, segmented controls, menu items, drawer nav items.                                                          |
| **Caption**    | 12 / 16     | 500    | +0.02em       | `textMuted`    | **Help text under a label.** Timestamps, footnotes, chart axes, "Sent at 7am". **Never actionable.**                       |
| **Overline**   | 11 / 14     | 700    | +0.09em, caps | `textFaint`    | **Eyebrows and group headers.** Table column headers, settings group headers, panel headers, the kicker above a heading.   |

Plus one specialist: **Nav label** — 11 / 14, 600, for footer navigation only. It follows
its icon's colour (`textFaint` → `primary`), not the text tokens.

### The scale — web

| Style        | Size / line                     | Weight | Tracking      | **Use it for**                                                                       |
| ------------ | ------------------------------- | ------ | ------------- | ------------------------------------------------------------------------------------ |
| **Hero**     | `clamp(40px, 6vw, 64px)` / 1.03 | 700    | −0.035em      | The landing page headline. Once, above the fold.                                     |
| **H1**       | 40 / 46                         | 700    | −0.03em       | Page titles on every page that isn't the landing page.                               |
| **H2**       | 30 / 38                         | 700    | −0.02em       | Section headings. The rhythm of a long page.                                         |
| **H3**       | 22 / 30                         | 600    | −0.01em       | Subsections. Feature card titles. FAQ questions.                                     |
| **Lead**     | 20 / 32                         | 400    | −0.005em      | The one paragraph directly under a Hero or H1. **Never two in a row.**               |
| **Body**     | 17 / 28                         | 400    | 0             | All prose. Web body is bigger than app body — the reader is further from the screen. |
| **Small**    | 15 / 24                         | 400    | 0             | Secondary prose, card copy, footer links.                                            |
| **Caption**  | 13 / 20                         | 500    | +0.01em       | Legal, image captions, form help text, timestamps.                                   |
| **Overline** | 12 / 16                         | 700    | +0.09em, caps | Eyebrows above headings. Section kickers.                                            |

### The distinctions people get wrong

These four styles all look "small and greyish" and are constantly swapped. They are not
interchangeable:

|                | It answers                       | Where it sits                                  | Actionable?             |
| -------------- | -------------------------------- | ---------------------------------------------- | ----------------------- |
| **Label**      | _What do I type here?_           | Directly **above a form control**              | No — but its control is |
| **Caption**    | _What should I know about this?_ | **Below a label** (help text) or below content | **Never**               |
| **Overline**   | _What group am I in?_            | **Above** a heading or a set of rows           | Never                   |
| **Body small** | _What are the details?_          | **Below a Title**, inside a card or row        | Sometimes               |

Concretely:

- ✅ Label on a form field: "Deposit amount"
- ✅ Caption under it: "Taken when the booking is confirmed."
- ❌ Label as a section header — that's an **Overline**. A label without a control beneath
  it is a bug.
- ❌ Overline as a sentence. Three words maximum. Caps at a sentence's length is
  unreadable.
- ❌ Caption for a link or a button. If someone can act on it, it's at least Body small.
- ❌ Title for a section header. Title names _one thing_ (a guest, a booking). A section
  is a group — that's H2 or Overline.

### Type rules

- **Tracking is inverse to size.** Big type tightens, small type opens. A 64px headline at
  default tracking looks amateur; an 11px overline at default tracking is unreadable.
- **Headings are `text`, never primary.** An primary heading steals the meaning of primary.
- **Weight before size.** Distinguish a Title from its Body small by _weight_, not by
  bumping the size. Two adjacent sizes 2px apart read as a mistake, not a hierarchy.
- **Never stack two heading levels** with nothing between them. If H2 is immediately
  followed by H3, one of them isn't earning its place.
- **One Display or H1 per screen.** If you need two, you have two screens.
- **Title Case names things; sentence case says things.** A screen heading, a card or
  tile title, a tab, a button or a menu item is the *name* of a destination or an
  action — those take Title Case: "Booking History", "Add Booking", "What You Offer".
  Everything that is read as language rather than pointed at — descriptions, help text,
  empty states, errors, snackbars, dialog copy — stays sentence case. The Overline is
  caps regardless.

  This replaces an earlier "sentence case everywhere" rule. The reason it changed: a
  lowercase second word makes a short label read as an unfinished sentence rather than
  as the name of a place, and in a grid of tiles that is the difference between a label
  and a caption. Prose is unaffected, because prose *is* a sentence.
- **Body prose maxes at 65ch.** Longer and the eye loses the row.
- **13px is the floor.** 15px is the floor for anything read at length.
- **One weight jump per step:** 400 → 600 → 700. 500 as a heading weight reads as a
  mistake, not a choice. (500 exists only for Caption, where 400 goes muddy at 12px.)
- **Numbers in any list, table or price are tabular.** Always.

---

## 6. Accessibility — not negotiable

Every value here is computed, not estimated. If you invent a pair, compute it.

### 6.1 Contrast

| What                                      | Needs                                               | Notes                                                                             |
| ----------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------- |
| Body and small text                       | **4.5:1**                                           | Includes captions, overlines and labels. 11px bold is still small text.           |
| Large text (≥24px, or ≥19px bold)         | **3:1**                                             | This is what lets mint sit on primary 500 (5.1:1) for headlines.                  |
| **Form control borders**                  | **3:1**                                             | The border _is_ what identifies the control. Use `borderControl`, never `border`. |
| Icons and meaningful graphics             | **3:1**                                             | Status dots, chevrons, the calendar's today-ring.                                 |
| **Focus indicator**                       | **3:1** against both the control and its background | See below.                                                                        |
| Decorative borders (card, panel, divider) | none                                                | They separate; they don't identify a control.                                     |
| Disabled controls                         | exempt by WCAG — but see §6.4                       |                                                                                   |

### 6.2 Focus

A translucent focus ring is a fake focus ring. **A 3px primary ring at 32% alpha is 1.75:1
— it fails.**

```
Focus = 2px solid `primary` outline + 2px offset.       6.5:1 on white. ✅
On a primary surface (the app header) the ring is MINT.  5.1:1 on primary. ✅
```

The mint focus ring on the primary header is not a novelty — it's the _only_ colour in the
palette that reads as a ring against primary, and it happens to be sanctioned mint slot
#7. An primary ring on a primary header is invisible.

- Never `outline: none` without a replacement.
- Focus must never be obscured by a sticky header or footer (WCAG 2.2, SC 2.4.11): when
  focus moves, scroll it into view with padding.
- Focus order follows visual order. Always.

### 6.3 Colour is never the only signal

Every state carries a second, non-colour cue. Audit each one:

| State                 | Colour cue       | **Non-colour cue**                               |
| --------------------- | ---------------- | ------------------------------------------------ |
| Checked checkbox      | primary fill      | the tick                                         |
| Selected radio        | primary ring      | the filled dot                                   |
| Switch on             | primary track     | **the thumb's position**                         |
| Selected tab          | white text       | the mint underline                               |
| Selected chip         | lavender fill    | the tick                                         |
| Selected date         | primary fill      | bold weight                                      |
| Status badge          | container colour | **the word**                                     |
| Form error            | red border       | the icon **and** the message                     |
| Link in body text     | primary           | **underline it** — colour alone fails WCAG 1.4.1 |
| Calendar density dots | status colour    | count + the accessible label                     |

The calendar dots are the weakest point in the system: hue is doing most of the work.
They're acceptable **only** because each day's accessible label spells it out — "18 July,
three bookings, one needs a check" — and the legend is always visible. Don't remove
either.

### 6.4 Disabled states

**Prefer not to disable.** A disabled button gives no reason and can't be focused, so a
screen reader user often can't discover why they're stuck. Keep the button enabled and
show the validation error when it's pressed.

If you must disable: **never use `opacity: 0.38`** — that puts the label at 2.39:1. Use a
`sunken` fill with `textMuted` (6.9:1) and `accessibilityState={{ disabled: true }}`.

### 6.5 Targets and motion

- **44×44pt minimum**, even when the visual mark is 20px. Use `hitSlop`.
- **8px minimum between adjacent targets.**
- Respect `prefers-reduced-motion` / `isReduceMotionEnabled` — durations go to **0ms**,
  not to "subtler".
- Nothing flashes more than three times per second, ever.

### 6.6 Text scaling

The app must survive **200% text size** (WCAG 1.4.4) — and a cattery owner reading a
phone in a pen block is exactly who turns it on.

- Never put a **fixed height** on anything containing text. Rows, cards and buttons grow.
  Use `minHeight`, never `height`.
- Never `numberOfLines={1}` on a guest's name or any user content. Truncating someone's
  cat's name is a bug.
- Don't disable `allowFontScaling`. If a control would break, cap it with
  `maxFontSizeMultiplier={1.6}` — never with `allowFontScaling={false}`.
- Test the whole app at the largest system size before shipping. Things will break; that's
  the point of testing.

### 6.7 Screen readers

- **Group a list row into one element.** Three separate nodes make VoiceOver read
  "Mochi and Nori" / "Pen 3" / "Confirmed" as three swipes. One `accessible` container
  with a composed label makes it one: _"Mochi and Nori, pen 3, 18 to 26 July, confirmed."_
- Screen titles and section headings get `accessibilityRole="header"`.
- Every icon-only control gets an `accessibilityLabel`.
- Toasts announce themselves — `accessibilityLiveRegion="polite"` /
  `announceForAccessibility`. A silent toast doesn't exist for a blind user.
- Modals trap focus: `accessibilityViewIsModal` (iOS),
  `importantForAccessibility="no-hide-descendants"` on the content behind (Android).
- Errors are announced, not just drawn. Tie the message to the field so it's read on
  focus, not left as a floating red line.
- Set the input's purpose — `autoComplete` / `textContentType` (WCAG 1.3.5). Autofill is
  an accessibility feature before it's a convenience.

### 6.8 Timing

A toast that auto-dismisses at 5s and holds the only "Undo" fails WCAG 2.2.1.

- Pause the timer on hover, focus or screen-reader focus.
- **Never put the only route to an action inside a transient toast.** If it can be undone
  in a toast, it can be undone from the record.

---

## 7. Components

### 7.1 Buttons

One filled primary button per screen. In a row the order is: text → outlined → primary
(rightmost).

| Variant     | Fill                                              | When                                     |
| ----------- | ------------------------------------------------- | ---------------------------------------- |
| Primary     | `primary` / `onPrimary`                           | The one action                           |
| Tonal       | `primaryContainer` / `onPrimaryContainer`         | A strong second option, not destructive  |
| Outlined    | transparent, 1.5px `borderStrong`, `primary` text | Neutral alternatives — Export, Back      |
| Text        | transparent, `primary` text                       | Dismissals. Always left-most in a dialog |
| Destructive | `danger` / white                                  | **Only inside a confirmation**           |

**Round icon button** — 44px. Filled primary only when it is the screen's primary action
(the FAB). Otherwise `sunken` fill with a `text` icon.

**Split button** — one action with a shelf behind it. The chevron half is the _same_
colour as the main half, divided by a 1px rule at 30% opacity. Never two colours.

**Button group / toggle group** — 1px border, shared edges, no gaps. Selected segment is
`primaryContainer`.

### 7.2 Form components

Every form control shares one skin: `surface` fill, **1.5px border**, 12px radius.

**Every row-based control is the same height: 48dp at `Md`.** Text input, dropdown,
split dropdown, number stepper, time field, date field — one row, one height. 44dp is the
touch-target floor (§4.7), not the design height; sizing to the floor makes a form of
mixed controls sit on no rhythm at all.

Two rules follow from that, and both have been broken in practice:

- **A field adds no vertical padding of its own.** The control already carries its
  height. Padding on the wrapper as well makes that one field taller than its
  neighbours — a difference that reads as "off" without being obvious why, because the
  labels stop sharing a baseline down the form.
- **A composite field matches the rhythm inside it too.** A list of chosen items beneath
  a picker is read on the same 48dp rhythm as the picker, not squeezed tighter because
  it is "just a list".
- **The field owns the gap below it; a caller never adds one.** `FormField` applies the
  16px of §4.4 itself. Wrapping a field in a `View` with its own `marginBottom` gets you
  both, and the result is a form where a few rows are further apart than the rest for no
  reason visible in any one place — the fix is always to delete the wrapper's margin, not
  to trim the field's. A control used *without* `FormField` (a bare `NumberSelect`, say)
  has to state the same 16px, or it alone sits tighter than the form around it.
- **Icons inside a control are 20dp.** The stepper's + and −, a `SplitDropdown`'s
  action, a trailing affordance — all 20. The steppers were 16, which read as a different
  class of button beside the + on the customer field directly above them. Where 20dp
  leaves the target under 44dp, `hitSlop` makes it up (see below).
- **Trailing actions and adornments share the field's right edge.** Whatever sits at the
  end of a control — a chevron, a + action, a count badge — lands on the same vertical
  line as it does in every other field, so a column of stacked fields has one right edge
  rather than several. A `SplitDropdown`'s + carried its own padding and sat 12dp further
  in than the `Dropdown` chevron above it; small enough to look like a mistake in the
  layout rather than in the control, which is what makes it worth a rule.
  **Where that leaves a touch target under 44dp, buy it back with `hitSlop`, never with
  padding** — padding moves the pixel, `hitSlop` does not.
- **The value shares a left edge with its label.** A contained control must drop its own
  horizontal padding — the wrapper already pads the box. `Dropdown` and `SplitDropdown`
  kept theirs, so their text sat 14dp right of the label above it while every text field
  sat flush. A notched label only reads as belonging to its field while the two line up;
  misaligned, it starts to look like the caption of the field above.

- **The label sits on the top border, not above the field.** One box holds the label and
  the control, with the label straddling the border and masking the line behind it — a
  notched outline. A form of six fields is six boxes rather than twelve alternating rows,
  and the field is **no taller than a plain input**: the label costs a gap in a line, not
  a row.

  This replaces an earlier "label above, always" rule. What has not changed is the reason
  behind it: **the label is always visible.** It is not a placeholder that vanishes the
  moment someone types — someone mid-entry must still be able to see what the field was,
  and must not have to clear it to recover from an error.

  Three things the pattern gets wrong if they are not deliberate:

  - **The box must carry no vertical padding.** The control keeps its own height; padding
    on the box as well makes every field taller than its neighbours, which is the opposite
    of the point.
  - **The control must not draw its own border.** Two nested borders is two boxes.
    `FormField` passes `bare` to its child automatically rather than asking every caller
    to remember.
  - **The notch is painted the colour of the ground it sits on.** There is no real gap in
    the border — the label masks it. On the wrong ground it reads as a coloured box behind
    the text.

  **Not everything is a field.** A group of radios or checkboxes is a set of choices, not
  one value; a border around it says otherwise. Those opt out with `contained={false}`.
  An inline row — a label beside a switch — is never boxed either.
- **Help text** sits between the label and the control, in caption / `textMuted`.
- **Required** is the word _(required)_ on the label, never an asterisk.
- **Focus:** 2px `primary` border + 3px ring.
- **Error:** `danger` border plus a message below saying _what to do_ — "Enter an amount
  in pounds, like 40.00", never "Invalid input".
- Covers: text input, textarea, search field, select, multi-select, number stepper,
  slider, date field, time field, file dropzone.

**Checkbox / radio** — unchecked is a 2px `borderStrong` outline on transparent; checked
fills with `primary`. Checkbox 6px radius, radio a circle. Indeterminate uses a **dash**,
never a lighter primary.

**Switch** — the only control where colour alone carries state, so it must always sit
beside a label. Never in a bare column.

**Segmented control** — 2–4 mutually exclusive views. `sunken` track; the selected
segment is a `surface` pill with a 1px border. It is not a tab bar and not a filter.

**Chips vs tags** — chips are _toggles_ (filters, multi-select): 1px border when off,
`primaryContainer` with a tick when on. Tags are _labels_: `sunken`, `textMuted`, no
selected state. Don't use one as the other.

### 7.3 Panels, cards, lists

- **Panel** — a bordered region grouping related content. 1px `border`, 16px radius, no
  shadow, `surface` fill. Optional header: overline, plus one trailing text action.
- **Card** — a panel that represents _one thing_ (a booking, a guest). Status sits
  top-right as a badge. A 3px `primary` left rail marks a card needing attention.
- **List row** — for dense collections. A 1px divider _between_ rows, not a border around
  each. Leading icon or avatar, title and meta, trailing chevron or action.
- **Accordion** — 1px divider between items, chevron rotates, one open at a time by
  default.
- **Table** — 1px row rules, **no vertical rules, no zebra striping**. Header row is
  overline style. All numeric columns right-aligned and tabular.

**A card is a boundary, not an object.** No shadow, ever.

### 7.4 Feedback

- **Inline banner** — persistent, in the flow of the layout. Container fill, 1px border
  in the matching status colour, an icon, a heading and a next step. Dismissible only if
  the information is genuinely optional.
- **Toast / snackbar** — transient, floats (shadow allowed). Dark surface in **both**
  modes, one optional action, auto-dismisses at 5s. Never for an error that needs a
  decision.
- **Modal dialog sizing** — `width: 100%`, `maxWidth: 400`, and the **screen gutter of
  §4.2 applied to the scrim**, not to the dialog. Three consequences worth stating,
  because the component got each of them wrong:
  - **Never edge to edge, on any device.** A full-bleed dialog reads as a page that has
    failed to load rather than a question on top of one, and it puts the buttons in the
    bottom corners — the two places a thumb lands by accident. Material and Apple both
    inset alerts from the edge for the same reason; neither ever fills the width.
  - **400px is a maximum, not a tablet rule.** The limit exists because a line of dialog
    copy stops being readable past it — a fact about text, not about the device. Gating
    it on a tablet flag leaves a large phone in landscape with a full-width dialog.
  - **Put the gutter on the scrim.** Then the dialog asks for 100% and still cannot touch
    the edge, and the inset matches every other screen instead of being a second opinion
    about where the edge is.
- **Modal dialog** — a question that blocks. Scrim, 20px radius, shadow. The title states
  the consequence ("Cancel Pepper's booking?"), the body explains what happens, buttons
  run text-left / primary-or-destructive-right.
- **Bottom sheet** — the mobile default for anything that isn't a hard yes/no. Drag
  handle, 20px top radius.
- **Empty state** — an invitation, not a mood. One line of what's missing, one line of
  what to do, one button. Never an apology.
- **Skeleton** — matches the real layout's shape. A pulsing `sunken` block. Never use a
  spinner for content whose shape you already know.
- **Progress / spinner** — primary. Determinate whenever the length is knowable.
- **Tooltip** — dark surface, 12px radius, caption text. Never holds the only copy of
  essential information.

### 7.5 Navigation

- **Tab bar** — inside the primary header. Inactive `rgba(255,255,255,.62)`, active white
  with a **2.5px mint underline** (sanctioned mint slot #1). Max four tabs.
- **Burger drawer** — 76% width over a scrim. Current item is `primaryContainer`.
  Secondary navigation only — never hide a primary destination behind it.
- **Footer nav** — 3–5 items. Icon and label change colour _together_, `textFaint` →
  `primary`. Labels always visible; an icon-only footer is a guessing game.
- **Breadcrumb** — web only. `textMuted`, current page `text`, chevron separators.
- **Pagination** — the current page is a `primary` fill; the rest are ghost buttons.
- **Steps** — a linear flow (business setup). Completed steps are `primary` with a tick,
  current is `primary` outlined, upcoming is `borderStrong`.

### 7.6 Identity

- **Avatar** — circle. Initials on `primaryContainer`. Groups overlap by −8px with a 2px
  `surface` ring.
- **Count badge** — `danger` fill, white text, 18px min, tabular. Caps at "9+".
- **Status dot** — only ever alongside a word.

### 7.7 TextBlock — the marker component

The only component that draws ink. It renders a type-scale string and can mark **one**
matched phrase with a highlighter stroke.

```tsx
<TextBlock variant="h1" highlight="catteries">
  I cold-called 50 catteries
</TextBlock>

<TextBlock variant="hero" underline={/voicemail/i} surface="primary">
  Stop losing bookings to voicemail
</TextBlock>
```

| Prop         | Type                  | Notes                                                                                                                         |
| ------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `children`   | **plain string only** | The pattern is matched against text. Nested elements can't be matched — if you need rich content, you don't need a TextBlock. |
| `variant`    | a §5 type style       | `display` · `h1` · `h2` · `h3` · `title` · `body` … Defaults to `body`.                                                       |
| `highlight`  | `string \| RegExp`    | **Full-cover stroke.** Forces the matched text to the on-ink colour.                                                          |
| `underline`  | `string \| RegExp`    | **Under-baseline swipe.** The matched text keeps its own colour.                                                              |
| `surface`    | `'light' \| 'primary'` | Which ground it sits on. Defaults to `light`. Determines the ink.                                                             |
| `seed`       | `number`              | Locks the stroke geometry. Omit and it derives from the text, so the same string always inks the same way.                    |
| `inkOpacity` | `0.7–1`               | Defaults to `0.8`. **`0.7` is a hard floor.**                                                                                 |

**The ink colour is decided by the surface, not by the caller.** This is the rule that
keeps §2.5 true without anyone having to remember it:

| `surface` | Stroke               | Text on the stroke | Contrast |
| --------- | -------------------- | ------------------ | -------- |
| `light`   | **primary** `#554aca` | white              | 6.5:1   |
| `primary`  | **mint** `#a3f6c0`   | ink `#06301e`      | 12:1   |

Mint on a light surface is 1.2:1, so the component simply never produces it. There is no
prop to override this. If you find yourself wanting one, you want a different design.

**Rules:**

- **`highlight` and `underline` are mutually exclusive.** One TextBlock, one gesture.
- **Only the first match is inked**, even if the pattern matches twice. Two marks is not a
  highlight, it's a pattern.
- **One inked TextBlock per screen or tile.** A second one and neither means anything.
- **`underline` when you want the text to keep its own weight and colour**; `highlight`
  when you want the word lifted out of the sentence entirely.
- **`inkOpacity` below 0.8 requires a scrim at 0.8 or above** behind it (§9.2). On a flat
  surface, leave it at the default.
- **Never in a list, a card, a control, or a table.** TextBlock's ink belongs to hero
  moments only: marketing, onboarding, empty states, the upgrade screen. A booking list
  with a highlighted word in it is a broken product, not an expressive one.
- **Never animate the stroke.** It's ink, not a loading bar.

**React Native:** needs `react-native-svg`. The stroke can't be drawn until the text has
been measured, so it's a two-pass render: lay the words out with `onLayout`, then paint an
absolutely-positioned `<Svg>` behind each. Never apply the displacement filter to the text
itself — only ever to the stroke.

### 7.8 Calendar — the workhorse. Get this right.

- **Today:** a `primary` **ring**, not a fill. A fill looks selected.
- **Selected day:** solid `primary`, `onPrimary` text.
- **Range:** `primaryContainer` fill with `onPrimaryContainer` text; the two endpoints
  are solid `primary`.
- **Booking density:** dots under the numeral, in **status colours, never brand** — an
  primary dot competes with the selection state.
- **Unavailable:** a faint numeral. No strikethrough, no red. Unavailable is not an
  error.
- Weekend and weekday are the same weight. Peak season is a data problem, not a
  typographic one.

---

## 8. Motion

|                               | Duration | Curve                      |
| ----------------------------- | -------- | -------------------------- |
| Hover, colour change          | 120ms    | ease                       |
| Control state (check, switch) | 150ms    | cubic-bezier(.4, 0, .2, 1) |
| Drawer, sheet, modal          | 240ms    | cubic-bezier(.4, 0, .2, 1) |
| Toast in / out                | 200ms    | ease-out                   |

Nothing animates for longer than 300ms. Nothing bounces. Under
`prefers-reduced-motion`, everything is 0ms.

---

## 9. Marketing and social

The app is restrained so the marketing can be bold. This is where mint earns its keep.

### 9.1 Flat tiles — three formulas

1. **Primary ground.** `#554aca` or `#1a1440`, full bleed. White Inter Tight headline with
   **one** word marked in mint. Wordmark bottom-left. This is _the_ At9 tile.
2. **White ground.** `#fbfaff`, near-black headline, one primary element — a button, a
   card, a UI screenshot. A rose chip is permitted as a launch flag. **No mint.**
3. **Lavender ground.** `#e7e4f8` with `#2f2a70` text. Quiet — testimonials and quotes.
   No mint, no rose.

### 9.2 Photo tiles — the build-in-public series

Reference implementation: **`design-system/at9-social-kit.html`** (drop in a photo, type
the copy, render with Playwright at 1080×1350).

**The one rule everything else hangs off: text never sits directly on a photo.** It sits
on a solid primary block, a solid primary band, or a duotone. Photos are unpredictable — a
white wall one week, a dark doorway the next — and drop-shadowed white text on a photo is
the single tell of an amateur founder account. Blocks make contrast a property of the
_template_, not of the shot.

**The ink treatment.** Text sits on **marker strokes**, not rectangles. Each word gets its
own stroke: a shape _behind_ the word, roughed up by an SVG displacement filter, tilted
under a degree, overshooting the word at both ends. The filter is applied to the **stroke,
never the text** — distorted type is a different and much worse aesthetic. Four seeds and
four tilts cycle through, so no two strokes match.

**The ink is see-through, at 82%** — the photo reads faintly underneath, as real ink does.
This is only safe because the **scrim bounds what can sit behind it**. The scrim must stay
at or above **80% across the whole text block**; with that in place, even a blown-out white
highlight in the photo still leaves ink-on-mint at **7.87:1**.

**70% is the hard floor.** Below it the scrim can no longer guarantee the text. And the two
settings move together: never weaken the scrim without raising the ink, or the transparency
becomes a contrast lottery you lose the first time you shoot against a window.

Two ways mint meets a word, and they are not interchangeable:

|                | The stroke                                             | The text          | Contrast            |
| -------------- | ------------------------------------------------------ | ----------------- | ------------------- |
| **Full cover** | Mint behind the whole word                             | **Ink `#06301e`** | 12:1 ✅           |
| **Swipe**      | Mint **under the baseline**, never crossing the glyphs | stays **white**   | 6.5:1 on primary ✅ |

White on a mint fill is 1.2:1 — that combination is a bug, not a style. If you want the
see-through highlighter look, use the **swipe**: it never touches the letterforms, so the
text keeps its own contrast.

**Five templates. Don't invent a sixth.**

|                 | When                                                                                                                        | Mint does                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **The Marker**  | 80% of posts. Headline in per-word primary strokes.                                                                          | One word in a mint stroke, ink text                             |
| **The Band**    | Longer copy, or a photo too busy for strokes. Photo above, solid primary band below.                                         | The under-baseline **swipe**, plus a brush rule                 |
| **The Duotone** | A clean portrait. Photo crushed to primary, so white text is safe on it. **The only template where text touches the image.** | The eyebrow chip                                                |
| **The Split**   | A real number. Photo above, primary 950 below, torn mint edge between.                                                       | **Carries the number** — the only place mint holds display type |
| **The Endcard** | Last slide of a carousel. Mostly primary, small circular photo.                                                              | The hand-inked ring                                             |

**Fixed across all five — this is what makes the grid read as a brand:**

- **Content is bottom-left, 76px from the edge.** Never centred, never top-right.
- **One mint element per tile. Count it before you ship.** One word, _or_ one number, _or_
  one ring — never two. This is the rule that is broken most often, because each individual
  mint touch looks fine on its own; it's the second one that kills the first.
- **Text never sits on a bare photo.** Ink, band, or duotone.
- **Never tilt a stroke more than 1°.** Past that it stops reading as a hand and starts
  reading as a mistake.
- **The scrim is primary (`#1a1440`), never black.** Black grey-ifies the brand; primary
  deepens it.
- **The wordmark is on every tile**, with a mint "9".
- **Six words maximum** in a headline. More and it's a Band, or a carousel.
- **No rose in this series.**

**Shooting for it:** frame yourself right of centre and leave the bottom-left third empty —
the ink covers roughly the lower-left half. Shoot 4:5; crop down to 1:1 later, never the
other way. Head landing bottom-left? Use the Band. Busy background? Use the Duotone.

**Copy:** the headline is _the story, not the topic_. "I cold-called 40 catteries" is a
post; "Cold calling tips" is a folder. The eyebrow carries the series — `Day 14 · Building
At9` — and the running counter is the reason people come back.

**The tile is always 1080px wide in the DOM**, so the Playwright render is pixel-identical
to the preview. Screenshot `.tile` at `deviceScaleFactor: 2` for a 2160px master.

**Never** change the layout because a post feels special. It isn't. The grid view is the
product.

---

## 10. Writing

- **Title Case for names, sentence case for prose** (§5). "Booking History" is a place;
  "No arrivals tomorrow" is a sentence. Plain verbs. No filler.
- A button says what happens: "Add booking", not "Submit".
- An action keeps its name through the flow: "Add booking" → "Booking added".
- Errors say what happened and what to do. They don't apologise and they're never vague.
- Empty states invite: "No arrivals tomorrow. Add a booking to get started."
- Write from the owner's side of the counter. She has **pens, guests and a diary**. She
  does not have entities, records or resources.

---

## 11. Before you ship

- [ ] Exactly one filled primary button on the screen.
- [ ] No mint on white. No mint on a control. No rose on a control.
- [ ] Mint + rose together under 3%, or absent entirely.
- [ ] Checked in both light and dark.
- [ ] Every status carries a word, not just a colour.
- [ ] Every tap target ≥ 44px. Every icon-only control has a label.
- [ ] Focus rings are **solid**, not translucent. Mint on primary surfaces.
- [ ] Form control borders use `borderControl`, not `border`.
- [ ] Body links are underlined, not just primary.
- [ ] No fixed heights on anything containing text. Checked at 200% text size.
- [ ] No disabled button uses opacity.
- [ ] Numbers in lists and tables are tabular and right-aligned.
- [ ] Nothing below 13px. Body prose under 65ch.
- [ ] No shadow on a card or a panel — including Android `elevation`.
- [ ] Three surface levels at most. No card on a card.
- [ ] The screen is either grouped or plain — not both. A plain list is on a white ground.
- [ ] No `textMuted` on a coloured surface — muted there means the on-colour at lower opacity.
- [ ] Remove one thing. There is always one.

---

## 12. Engineering the system

A design system dies of **drift**, not of bad taste. Everything here exists to stop
`#554aca` quietly becoming `#5c3ef5` on one screen.

### 12.1 One source of truth — do this first

Right now the palette lives in `CLAUDE.md`, in `theme.ts`, and in two HTML files. **That
is four sources of truth, which means zero.** They will drift, and nobody will notice
until a screenshot looks wrong.

Put the tokens in one machine-readable file and generate everything else:

```
design-system/
  tokens.json          ← the only place a hex ever appears
  build-tokens.mjs     ← Style Dictionary
  → generates: theme.ts (RN) · tokens.css (web) · tailwind.tokens.js
```

Use the **W3C Design Tokens format** (`$value` / `$type`), which Style Dictionary, Tokens
Studio and Figma all read:

```json
{
  "color": {
    "primary": { "500": { "$value": "#554aca", "$type": "color" } },
    "primary": { "$value": "{color.primary.500}", "$type": "color" }
  }
}
```

Three layers, in this order — **never let a component reach past its layer**:

1. **Primitive** — `primary.500`, `neutral.200`. Raw values. Never used in a component.
2. **Semantic** — `primary`, `surface`, `danger`, `borderControl`. What components use.
3. **Component** — `button.primary.background`. Only when a component genuinely needs its
   own knob.

A screen that references `primary.500` instead of `primary` has broken the system, even
though it renders identically today.

### 12.2 Authoring in OKLCH, shipping hex

Author the ramps in **OKLCH** — it's perceptually uniform, so the steps between 400/500/600
are _visually_ even rather than mathematically even, and the semantic hues really are
equidistant from primary. Tailwind 4 moved to it for exactly this reason.

**But compile to hex.** React Native supports neither `oklch()` nor `color-mix()`. If OKLCH
lands in `theme.ts`, the app crashes. OKLCH is an authoring convenience; hex is the
artefact. Style Dictionary does the conversion in the build.

### 12.3 Web-only CSS worth using

|                                              | Why                                                                                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `text-wrap: balance` on headings             | Kills orphaned last words. One line of CSS, and it's the fastest typographic upgrade available.                                                 |
| `text-wrap: pretty` on body                  | No widows.                                                                                                                                      |
| `light-dark()`                               | Halves the theme CSS — one declaration instead of two blocks.                                                                                   |
| `@layer tokens, base, components, utilities` | Cascade control. Specificity wars stop being a thing.                                                                                           |
| Container queries                            | Components respond to _their own_ width, not the viewport. This is what makes a card work in a sidebar and full-bleed.                          |
| `size-adjust` on the fallback font           | Matches the fallback's metrics to Switzer's, so nothing shifts when the webfont lands. Prevents CLS — a real Core Web Vitals score, not a nicety. |

None of these exist in React Native. Don't try.

### 12.4 Two accessibility media queries the system now needs

```css
/* The ink is deliberately translucent. Some people ask for that not to be. */
@media (prefers-reduced-transparency: reduce) {
  .marker-stroke {
    opacity: 1;
  }
}

/* Windows High Contrast: the OS owns the palette. Keep structure, drop paint. */
@media (forced-colors: active) {
  .card,
  .panel,
  .badge {
    border: 1px solid ButtonBorder;
  }
  :focus-visible {
    outline: 3px solid Highlight;
  }
}
```

`prefers-reduced-transparency` matters here specifically **because** §9.2 made the ink
see-through. A rule you introduce is a rule you have to honour.

### 12.5 Enforcement — a rule nobody checks is a suggestion

| Check                                                      | Catches                                                                 |
| ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| ESLint rule banning raw hex outside `theme/`               | The single most common way this system dies                             |
| Stylelint `declaration-property-value-allowed-list`        | Off-grid spacing, stray radii                                           |
| **Storybook** — one story per component, light + dark      | The place the system actually lives. Documentation that can't go stale. |
| **Visual regression** (Chromatic / Playwright screenshots) | The 1px shift nobody reviewed                                           |
| **axe-core in CI**                                         | Contrast and label regressions, automatically                           |
| A contrast unit test over `tokens.json`                    | Someone "brightening" a colour and dropping below 4.5:1                 |

That last one is worth writing today. Every pair in §2 was computed; a ten-line test keeps
them computed. **§11's checklist is only real once CI runs it.**

### 12.6 The order to do this in

1. `tokens.json` + Style Dictionary → `theme.ts`. Delete every other hex.
2. The ESLint no-raw-hex rule. Now drift is impossible, not just discouraged.
3. Storybook for the primitives.
4. axe-core + the contrast test in CI.
5. Visual regression, once the components have stopped moving.

Steps 1 and 2 are worth more than the other three combined.

---

