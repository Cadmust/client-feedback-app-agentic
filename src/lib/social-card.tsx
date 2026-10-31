import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const socialCardSize = { width: 1200, height: 630 };
export const socialCardAlt = `${siteName}: one link is all it takes to get clear feedback.`;

// ImageResponse can't read CSS custom properties, so the light theme token
// values from globals.css are repeated here as literals.
const colors = {
  canvas: "#fdf8f1",
  ink: "#1a1714",
  body: "#5c5751",
  accentInk: "#c2410c",
  accentBright: "#f26b1d",
};

export function renderSocialCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: colors.canvas,
          color: colors.ink,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: `6px solid ${colors.accentBright}`,
            }}
          />
          {siteName}
        </div>
        <div style={{ marginTop: 48, fontSize: 28, fontWeight: 600, color: colors.accentInk }}>
          Collect feedback on live pages
        </div>
        <div style={{ marginTop: 16, fontSize: 72, fontWeight: 800, lineHeight: 1.1, maxWidth: 960 }}>
          One link is all it takes to get clear feedback.
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: colors.body }}>
          Share your page. Clients pin comments. You resolve everything in one inbox.
        </div>
      </div>
    ),
    socialCardSize,
  );
}
