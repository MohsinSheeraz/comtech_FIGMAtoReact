import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 42,
          background: "linear-gradient(145deg, #7950e2, #32117e)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          fontSize: 128,
          fontWeight: 700,
        }}
      >
        C
      </div>
    ),
    size,
  );
}
