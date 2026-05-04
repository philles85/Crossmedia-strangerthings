import { serveDir } from "https://deno.land/std/http/file_server.ts";

async function handler(request) {
    const response = await serveDir(request, {
        fsRoot: ".",
        urlRoot: "",
        showDirListing: true
    })

    if (response.status == 404) {
        return serveDir(new Request(new URL("/index.html", request.url)), {
            fsRoot: "."
        })
    }
    return response;

}

Deno.serve({
    port: Number(Deno.env.get("PORT")) || 8080,
    hostname: "0.0.0.0"
}, handler);