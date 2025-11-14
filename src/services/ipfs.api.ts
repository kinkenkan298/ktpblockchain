import { PersonalInfoSchema } from "@/features/auth/types/register-schema";
import { pinata } from "@/lib/pinata";
import { createServerFn } from "@tanstack/react-start";

export const $uploadData = createServerFn({ method: "POST" })
  .inputValidator(PersonalInfoSchema)
  .handler(async ({ data }) => {
    const result = await pinata.upload.private.json(data, {
      metadata: { name: "metadata-ktp" },
    });

    return {
      cid: result.cid,
      url: `https://${process.env.PINATA_GATEWAY}/ipfs/${result.cid}`,
    };
  });

export const $getDataUser = createServerFn({ method: "GET" }).handler(
  async () => {
    return true;
  }
);
