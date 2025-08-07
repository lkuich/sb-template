import React, { type ReactElement } from "react";
import {
  richTextResolver,
  type StoryblokRichTextOptions,
  type StoryblokRichTextNode,
} from "@storyblok/richtext";
// @ts-expect-error: No TS types for this package
import he from "he";
import cx from "classnames";
import type { StoryblokRichtext } from "@/types/sb";

function camelCase(str: string) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function convertStyleStringToObject(styleString: string) {
  return styleString
    .split(";")
    .reduce((styleObject: { [key: string]: string }, styleProperty) => {
      let [key, value] = styleProperty.split(":");
      key = key?.trim();
      value = value?.trim();
      if (key && value) {
        styleObject[camelCase(key)] = value;
      }
      return styleObject;
    }, {});
}

function convertAttributesInElement(
  element: React.ReactElement | React.ReactElement[]
): React.ReactElement | React.ReactElement[] {
  if (Array.isArray(element)) {
    return element.map((el) =>
      convertAttributesInElement(el)
    ) as React.ReactElement[];
  }

  if (!React.isValidElement(element)) {
    return element;
  }

  const attributeMap: { [key: string]: string } = {
    class: "className",
    for: "htmlFor",
    targetAttr: "targetattr",
  };

  const newProps: { [key: string]: unknown } = Object.keys(
    element.props as Record<string, unknown>
  ).reduce((acc: { [key: string]: unknown }, key) => {
    let value = (element.props as Record<string, unknown>)[key];

    if (key === "style" && typeof value === "string") {
      value = convertStyleStringToObject(value);
    }

    const mappedKey = attributeMap[key] || key;
    acc[mappedKey] = value;
    return acc;
  }, {});

  newProps.key = element.key as string;

  const children = React.Children.map(
    (element.props as React.PropsWithChildren).children,
    (child) => convertAttributesInElement(child as React.ReactElement)
  );

  return React.createElement(element.type, newProps, children);
}

function decodeTextNodes(
  element: React.ReactElement | React.ReactElement[]
): React.ReactElement | React.ReactElement[] {
  if (Array.isArray(element)) {
    return element.map(decodeTextNodes) as React.ReactElement[];
  }

  if (!React.isValidElement(element)) {
    return element;
  }

  // @ts-expect-error: Unknown type
  const children = React.Children.map(element.props.children, (child) => {
    if (typeof child === "string") {
      return he.decode(child);
    } else if (React.isValidElement(child)) {
      return decodeTextNodes(child);
    }
    return child;
  });

  // @ts-expect-error: Unknown type
  return React.cloneElement(element, { ...element.props }, children);
}

export function processRichText(doc: StoryblokRichtext) {
  const flattenText = (nodes: StoryblokRichtext[]): string => {
    if (!nodes) return "";
    return nodes
      .map((node) => {
        if (node.type === "text") return node.text || "";
        if (node.type === "hard_break") return "\n";
        if (node.content) return flattenText(node.content);
        return "";
      })
      .join("");
  };

  const blocks = doc.content || [];

  const allText = flattenText(blocks);
  const wordCount = allText.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  let firstTextBlock = "";
  for (const block of blocks) {
    const text = flattenText(block.content || []).trim();
    if (text) {
      firstTextBlock = text;
      break;
    }
  }

  return { wordCount, readTimeMinutes, firstTextBlock };
}

export default function RichTextField({
  content,
  className,
}: {
  content?: StoryblokRichtext;
  className?: string;
}) {
  const options: StoryblokRichTextOptions<ReactElement> = {
    renderFn: React.createElement,
    keyedResolvers: true,
  };

  if (!content) {
    return null;
  }

  const rawHtml = richTextResolver(options).render(
    content as StoryblokRichTextNode<ReactElement>
  );

  const decodedHtml = decodeTextNodes(rawHtml);
  const formattedHtml = convertAttributesInElement(decodedHtml);

  return (
    <div className={cx("flex flex-col gap-3", className)}>{formattedHtml}</div>
  );
}
