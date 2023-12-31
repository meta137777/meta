import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export async function GetAdSaleIdImagesRemoveId(
  ad_id: string,
  image_id: string
) {
  try {
    let res = await httpService.get(
      `${FRONT2MESSAGE}/AdSale/Id/${ad_id}/Images/Remove/Id/${image_id}`
    );
    return res;
  } catch (err) {}
}
