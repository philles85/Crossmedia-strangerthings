import { serveDir } from "jsr:@std/http/file-server";

async function handler(request) {
    const response = await serveDir(request, {
        fsRoot: ".",
        urlRoot: "",
        showDirListing: true
    })

    if (response.status == 404) {
        return serveDir(new Request(new URL("./index.html", request.url)), {
            fsRoot: "."
        })
    }
    return response;

}

Deno.serve(handler);