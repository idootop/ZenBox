import { createMetadataImage } from "fumadocs-core/server";
import { source } from "lib/source";

export const metadataImage = createMetadataImage({
  source,
});

import type { Metadata } from "next/types";

export function createMetadata(
  options: Metadata & {
    images?: string;
  }
): Metadata {
  const { images = "/logo.png", ...override } = options;

  let title = override.title ?? "ZenBox";
  if (title !== "ZenBox") {
    title = `${title} | ZenBox`;
  }

  const description =
    override.description ??
    "ZenBox is a modern React state management library focused on simplicity and developer experience.";

  return {
    ...override,
    metadataBase: new URL("https://zenbox.del.wang"),
    openGraph: {
      title,
      description,
      images,
      url: "https://zenbox.del.wang",
      siteName: "ZenBox",
      ...override.openGraph,
    },
    twitter: {
      title,
      description,
      images,
      card: "summary_large_image",
      creator: "@del_wang_404",
      ...override.twitter,
    },
  };
}
