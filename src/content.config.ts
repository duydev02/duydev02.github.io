import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const metadata = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().optional(),
});
function loader(base: string) {
  return glob({
    base,
    pattern: "**/*.md",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, "").replace(/\.md$/, ""),
  });
}
const blog = defineCollection({ loader: loader("./src/content/blog"), schema: metadata });
const projects = defineCollection({
  loader: loader("./src/content/projects"),
  schema: metadata.extend({
    demoURL: z.url().optional(),
    repoURL: z.url().optional(),
  }),
});
export const collections = { blog, projects };
