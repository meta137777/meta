import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const GetAdSalePublishedTopAPI = async () => {
  try {
    const res = await httpService.get(`${FRONT2DB}/AdSale/Get/Published/Top`);
    return res.data.ads;
  } catch (err) {
    return Promise.reject(err);
  }
}
