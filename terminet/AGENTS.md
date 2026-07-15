# Building this terminet profile — for coding agents

You're helping a human set up a **terminet** profile: a terminal-native
"webring" page, viewed with `npx terminet <handle>`. You do the mechanics; the
human provides taste and presses publish.

## Files
- `profile.json` — the profile. Validated by `profile.schema.json` (read it for
  exact field rules). Keep it human-readable.
- `banner.json` — generated ASCII banner frames, referenced by profile.json.
  Never hand-edit it; regenerate with `terminet banner`.

## Step 1 — interview the human (ask, don't guess)
- **handle** — the npm scope they publish under: their npm username (`npm whoami`)
  or an npm org they can publish to. Publishes as `@<handle>/profile`, and viewers
  reach them with `terminet <handle>`, so it must be a scope they own.
- **name** and a one-line **tagline**.
- **links** — label → https URL (github, site, x). http(s) only.
- **banner** — a photo/gif/video to ascii-fy, a short wordmark, or none.
- **connections** — handles they want to link to, each with an optional one-line
  note on why (`{ "handle": "...", "note": "..." }`). Curation is the whole point.
- **accent** — a hex color, or a vibe you translate to one.

## Step 2 — build
- **Set up a live preview first.** Ask the human to open a **separate terminal
  window** in this folder and run `terminet preview --watch`. It hot-reloads on
  every save, so they watch the profile update live as you edit — keep it running
  the whole time. (You only get the static `terminet preview --snapshot`, so this
  is how the human judges the animation and vibe.)
- Edit `profile.json` (respect `profile.schema.json` — don't invent fields).
- Banner: `terminet banner <file>` (image/gif/video → ASCII) or
  `terminet banner --text <word>`. Flags: --width --frames --contrast --invert.
- Check your own work: `terminet preview --snapshot` prints a static render.
- Iterate on the human's feedback from the live preview.

## Step 3 — publish (guide the human through auth)
- Preflight: `npm whoami`. If it errors, they must `npm login` first. The handle
  is the npm scope — their username, or an org they can publish to (`whoami` shows
  the username, not the org, so a differing handle is fine if it's their org).
- **Have the human run `terminet publish` themselves.** It prints a summary (public
  access, the target scope, which npm account) and waits for a `y` confirmation —
  so they see and approve that it's a public publish under their name. Don't paper
  over that with `--yes` unless they've explicitly told you to publish unattended.
- Wait ~1 min for CDN propagation, then `terminet <handle>` shows it to anyone.
- **Auth gotchas:** publishing needs a login + 2FA or a granular npm token
  (read+write, all packages). On 403/404 it's auth — fix it, don't retry blindly.

## Rules
- Only fields in `profile.schema.json`. Links must be http(s). Handles are
  lowercase letters, digits, and hyphens.
- Frame data lives in `banner.json`, not `profile.json`.
- Connections are one-way links — no follows/followers, no reciprocity.
