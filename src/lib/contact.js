/**
 * Enquiries go straight to WhatsApp rather than through a server, which is how
 * the shop already handles product enquiries from the detail pages.
 */

export const whatsappNumber = "923027036363";

export function buildWhatsappLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
