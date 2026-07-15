import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "William Liu — Personal Website";

export default async function OpenGraphImage() {
  const faviconFile = await readFile(
    join(process.cwd(), "public", "favicon.svg"),
  );

  const favicon = `data:image/svg+xml;base64,${faviconFile.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#111111",
          color: "#ffffff",
          padding: "76px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <div style={{ display: "flex", fontSize: 34, letterSpacing: 4 }}>
            WILLIAM LIU
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "serif",
              fontSize: 76,
              fontWeight: 700,
            }}
          >
            Personal website
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#b5b5b5",
            }}
          >
            wlmliu.com
          </div>
        </div>

        <div
          style={{
            width: 330,
            height: 330,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            borderRadius: 56,
          }}
        >
          <img src={favicon} width={240} height={240} />
        </div>
      </div>
    ),
    size,
  );
}