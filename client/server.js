import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";
console.log("STARTING SERVER");
console.log("PORT:", Deno.env.get("PORT"));
async function handler(request) {
    const response = await serveDir(request, {
        fsRoot: ".",
        urlRoot: "",
        showDirListing: true
    })

    if (response.status == 404) {
        return serveDir(new Request(new URL("/index.html", request.url)), {
            fsRoot: ".",
            urlRoot: ""
        })
    }
    return response;

}

Deno.serve({
    port: 8000,
    hostname: "0.0.0.0"
}, handler);