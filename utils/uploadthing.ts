import { ourfileRouter } from "@/app/api/uploadthing/core";

import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing } = generateReactHelpers<ourfileRouter>();
