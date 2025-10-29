export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      // Extract font key (remove /fonts/ prefix)
      const fontKey = url.pathname.replace(/^\/fonts\//, "");

      // Fetch the font from KV as binary data
      const font = await env.FONTS.get(fontKey, { type: "arrayBuffer" });

      if (!font) {
        return new Response("Font not found", {
          status: 404,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      // Serve the .woff2 font with correct headers
      return new Response(font, {
        headers: {
          "Content-Type": "font/woff2",
          "Access-Control-Allow-Origin": "*",          // Allow use across domains
          "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
          "Cross-Origin-Resource-Policy": "cross-origin",
        },
      });
    } catch (err) {
      return new Response("Internal Server Error: " + err.message, { status: 500 });
    }
  },
};
