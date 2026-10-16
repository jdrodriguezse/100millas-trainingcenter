import { getSiteContent } from "@/lib/site-content";
import { ContentManager } from "@/components/admin/contenido/content-manager";

export const dynamic = "force-dynamic";

export default async function ContenidoAdminPage() {
  const content = await getSiteContent();
  return <ContentManager content={content} />;
}
