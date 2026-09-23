/*
 * Derived from vercel/ai-elements (packages/elements/src/image.tsx).
 * Copyright 2023 Vercel, Inc. Licensed under Apache-2.0.
 * Modified by ZCode: local integration, formatting and adaptations.
 * Adapted for @zcode-ui/ai-elements: local GeneratedImage shape (no hard ai type pin).
 */
import { cn } from "@zcode-ui/core/utils";

/** Minimal generated-image shape compatible with the Vercel AI SDK. */
export type GeneratedImageData = {
  base64: string;
  uint8Array?: Uint8Array;
  mediaType: string;
};

export type ImageProps = GeneratedImageData & {
  className?: string;
  alt?: string;
};

export const Image = ({ base64, uint8Array: _uint8Array, mediaType, ...props }: ImageProps) => (
  <img
    {...props}
    alt={props.alt}
    className={cn("h-auto max-w-full overflow-hidden rounded-md", props.className)}
    src={`data:${mediaType};base64,${base64}`}
  />
);
