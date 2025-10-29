export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const fontKey = url.pathname.replace('/fonts/', 'fonts/');
      const font = await env.KV.get(fontKey, { type: 'arrayBuffer' });

      if (!font) {
        return new Response('Font not found', { status: 404 });
      }

      return new Response(font, {
        headers: {
          'Content-Type': 'font/woff2',
          'Cache-Control': 'public, max-age=31536000',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (err) {
      return new Response(`Worker error: ${err.message}`, { status: 500 });
    }
  }
}
