import { createRouteHandler  } from "uploadthing/next";
import { ourfileRouter } from "./core";

export  const {GET,POST}= createRouteHandler({
    router: ourfileRouter,
})