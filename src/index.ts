export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Extract font key from URL path
    const fontKey = url.pathname.replace('/fonts/', 'fonts/');

    // Retrieve font from KV
    const font = await env.KV.get(fontKey, { type: 'arrayBuffer' });

    if (!font) {
      return new Response('Font not found', { status: 404 });
    }

    // Serve font with proper headers
    return new Response(font, {
      headers: {
        'Content-Type': 'font/woff2',
        'Cache-Control': 'public, max-age=31536000',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
