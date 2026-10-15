import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Dipendra P. Yadav — Founder & Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public", "headshot.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 80px", background: "linear-gradient(135deg,#080f1a 55%,#2a0f12)", color: "white", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#e0513f", fontWeight: 700 }}>FOUNDER &amp; ENGINEER</div>
          <div style={{ fontSize: 68, fontWeight: 800, marginTop: 20, lineHeight: 1.05 }}>Dipendra P. Yadav</div>
          <div style={{ fontSize: 30, marginTop: 24, color: "rgba(255,255,255,0.78)", lineHeight: 1.35 }}>
            Building Queuella, and data platforms for regulated industries.
          </div>
          <div style={{ fontSize: 22, marginTop: 36, color: "rgba(255,255,255,0.6)" }}>dipenyadav.com</div>
        </div>
        <img src={src} width={330} height={330} alt="" style={{ borderRadius: 9999, objectFit: "cover", objectPosition: "50% 18%", border: "6px solid rgba(255,255,255,0.15)" }} />
      </div>
    ),
    size,
  );
}
