import { serveDir } from "jsr:@std/http/file-server";

function handler(request) {
    return serveDir(request, {
        fsRoot: ".",
        urlRoot: "",
        showDirListing: true
    })
}

Deno.serve(handler);