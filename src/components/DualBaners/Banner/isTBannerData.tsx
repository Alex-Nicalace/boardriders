import { TBannerData } from '../DualBanners';

export function isTBannerData(obj: any): obj is TBannerData {
  return 'title' in obj && 'to' in obj && 'img' in obj;
}
