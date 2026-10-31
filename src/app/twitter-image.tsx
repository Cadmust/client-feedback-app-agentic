import { renderSocialCard, socialCardAlt, socialCardSize } from "@/lib/social-card";

export const alt = socialCardAlt;
export const size = socialCardSize;
export const contentType = "image/png";

export default function Image() {
  return renderSocialCard();
}
