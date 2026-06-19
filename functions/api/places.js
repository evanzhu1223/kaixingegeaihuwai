export async function onRequestGet() {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };

  try {
    const response = await fetch("https://zhenjiang-feishu-proxy.zhuqu1223.workers.dev/", {
      headers: { "Accept": "application/json" },
      cf: { cacheTtl: 0, cacheEverything: false },
    });

    const text = await response.text();
    return new Response(text, {
      status: response.status,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({
      code: -1,
      msg: error.message || "Pages Function proxy failed",
    }), {
      status: 502,
      headers,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
