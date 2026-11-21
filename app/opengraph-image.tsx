import { ImageResponse } from "next/og";

export const alt = "Comtech Associates IT solutions across Pakistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 72px",
          color: "#ffffff",
          backgroundColor: "#040404",
          backgroundImage:
            "radial-gradient(ellipse at 82% 18%, rgba(87,36,216,.55), transparent 44%), radial-gradient(ellipse at 8% 100%, rgba(30,75,210,.48), transparent 48%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(145deg, #7950e2, #5724d8)",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: 1 }}>
            COMTECH ASSOCIATES
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#bba5ff",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 3,
            }}
          >
            IT SOLUTIONS PROVIDER IN PAKISTAN
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 1000,
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -2,
            }}
          >
            <span>Networking, Cybersecurity</span>
            <span>&amp; Data Centers</span>
          </div>
          <div style={{ color: "#d0c9df", fontSize: 22 }}>
            Design. Secure. Manage.
          </div>
        </div>

        <div style={{ color: "#b7b2c1", fontSize: 18 }}>
          comtech.net.pk
        </div>
      </div>
    ),
    size,
  );
}
