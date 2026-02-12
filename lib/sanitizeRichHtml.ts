// lib/sanitizeRichHtml.ts
import sanitizeHtml from "sanitize-html";

export function sanitizeRichHtml(dirty = "") {
  return sanitizeHtml(dirty, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "colgroup",
      "col",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["style", "class"],
      a: ["href", "name", "target", "rel"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      table: ["cellpadding", "cellspacing", "border"],
    },
    // optional: keep inline styles if your editor uses them
    allowedStyles: {
      "*": {
        color: [/^.*$/],
        "background-color": [/^.*$/],
        "text-align": [/^left$|^right$|^center$|^justify$/],
        "font-weight": [/^.*$/],
        "font-style": [/^.*$/],
        "text-decoration": [/^.*$/],
        border: [/^.*$/],
        "border-collapse": [/^.*$/],
        width: [/^.*$/],
      },
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}
