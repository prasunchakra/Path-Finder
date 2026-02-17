import { redirect } from "next/navigation";

/**
 * Nested path route: /roadmap/tech/frontend → redirects to /roadmap/tech?path=frontend
 * This provides clean URLs like /roadmap/tech/frontend
 */
export default async function PathPage({
  params,
}: {
  params: Promise<{ industry: string; path: string }>;
}) {
  const { industry, path } = await params;
  redirect(`/roadmap/${industry}?path=${path}`);
}
