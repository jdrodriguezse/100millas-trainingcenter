import { prisma } from "@/lib/prisma";
import {
  DEFAULT_CONTENT,
  type SiteContentMap,
} from "@/lib/content-fields";

export async function getSiteContent(): Promise<SiteContentMap> {
  const map: SiteContentMap = { ...DEFAULT_CONTENT };
  try {
    const rows = await prisma.siteSetting.findMany();
    for (const row of rows) {
      if (Object.prototype.hasOwnProperty.call(map, row.key)) {
        map[row.key] = row.value;
      }
    }
  } catch {
    return { ...DEFAULT_CONTENT };
  }
  return map;
}
