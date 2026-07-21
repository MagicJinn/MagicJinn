export type Link = { label: string; url: string };

export type ProjectMeta = {
  kind: "project" | "group";
  featureComplete: boolean;
  linksOutside: boolean;
  extraLinks: Link[];
};

export type Project = {
  title: string;
  meta: ProjectMeta;
  paragraphs: string[];
  language?: string;
  role?: string;
  technologies?: string;
  links: Link[];
  items: { name: string; body: string }[];
};

const COMMENT_RE = /^\[\/\/\]:\s*#\s*\((.+)\)\s*$/;
const HEADING_RE = /^##\s+(.+)\s*$/;
const META_FIELD_RE = /^\*\*(Language|Role|Technologies):\s*(.+?)\*\*\s*(?:<br\s*\/?>)?\s*$/i;
const BULLET_RE = /^-\s+\*\*(.+?)\*\*\s*-\s*(.+)$/;
const STORE_LINK_RE = /\[\*\*(.+?)\*\*\]\((.+?)\)/g;
const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function parseMetaComment(raw: string): Partial<ProjectMeta> & { include?: boolean } {
  const inner = raw.trim();
  if (!inner.startsWith("html:")) return {};

  const result: Partial<ProjectMeta> & { include?: boolean } = { extraLinks: [] };
  const payload = inner.slice("html:".length).trim();
  if (!payload) return result;

  for (const part of payload.split(",").map((p) => p.trim()).filter(Boolean)) {
    if (part === "project") {
      result.include = true;
      result.kind = "project";
      continue;
    }
    if (part === "group") {
      result.include = true;
      result.kind = "group";
      continue;
    }
    if (part === "feature-complete") {
      result.featureComplete = true;
      continue;
    }
    if (part === "links-outside") {
      result.linksOutside = true;
      continue;
    }

    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();

    if (key === "link") {
      const pipe = value.indexOf("|");
      if (pipe === -1) continue;
      result.extraLinks!.push({
        label: value.slice(0, pipe).trim(),
        url: value.slice(pipe + 1).trim(),
      });
    }
  }

  return result;
}

function extractStoreLinks(text: string): { text: string; links: Link[] } {
  const links: Link[] = [];
  const cleaned = text.replace(STORE_LINK_RE, (_, label: string, url: string) => {
    links.push({ label, url });
    return "";
  });
  return { text: cleaned.replace(/[,\s]+$/g, "").trim(), links };
}

function parseSection(title: string, bodyLines: string[]): Project | null {
  const meta: ProjectMeta = {
    kind: "project",
    featureComplete: false,
    linksOutside: false,
    extraLinks: [],
  };
  let include = false;
  const contentLines: string[] = [];

  for (const line of bodyLines) {
    const comment = line.match(COMMENT_RE);
    if (comment) {
      const parsed = parseMetaComment(comment[1]);
      if (parsed.include) include = true;
      if (parsed.kind) meta.kind = parsed.kind;
      if (parsed.featureComplete) meta.featureComplete = true;
      if (parsed.linksOutside) meta.linksOutside = true;
      if (parsed.extraLinks?.length) meta.extraLinks.push(...parsed.extraLinks);
      continue;
    }
    contentLines.push(line);
  }

  if (!include) return null;

  const paragraphs: string[] = [];
  const items: { name: string; body: string }[] = [];
  const links: Link[] = [];
  let language: string | undefined;
  let role: string | undefined;
  let technologies: string | undefined;
  let paragraphBuf: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuf.length) return;
    paragraphs.push(paragraphBuf.join(" ").replace(/\s+/g, " ").trim());
    paragraphBuf = [];
  };

  for (const line of contentLines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const field = trimmed.match(META_FIELD_RE);
    if (field) {
      flushParagraph();
      const key = field[1].toLowerCase();
      const value = field[2].trim();
      if (key === "language") language = value;
      else if (key === "role") role = value;
      else if (key === "technologies") technologies = value;
      continue;
    }

    if (meta.kind === "group") {
      const bullet = trimmed.match(BULLET_RE);
      if (bullet) {
        flushParagraph();
        items.push({ name: bullet[1].trim(), body: bullet[2].trim() });
        continue;
      }
    }

    // Standalone store-link lines (possibly comma-separated)
    if (/^\[\*\*.+?\*\*\]\(/.test(trimmed)) {
      flushParagraph();
      const extracted = extractStoreLinks(trimmed);
      links.push(...extracted.links);
      continue;
    }

    paragraphBuf.push(trimmed);
  }
  flushParagraph();

  // Pull trailing store links that sat on the last prose line
  if (meta.kind === "project" && paragraphs.length) {
    const last = paragraphs[paragraphs.length - 1];
    if (STORE_LINK_RE.test(last)) {
      STORE_LINK_RE.lastIndex = 0;
      const extracted = extractStoreLinks(last);
      if (extracted.links.length) {
        links.push(...extracted.links);
        if (extracted.text) paragraphs[paragraphs.length - 1] = extracted.text;
        else paragraphs.pop();
      }
    }
  }

  if (role) meta.linksOutside = true;

  const mergedLinks = [...meta.extraLinks, ...links];
  // Dedupe by label+url, preserve order
  const seen = new Set<string>();
  const deduped = mergedLinks.filter((l) => {
    const key = `${l.label}|${l.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    title,
    meta,
    paragraphs,
    language,
    role,
    technologies,
    links: deduped,
    items,
  };
}

export function parseReadme(markdown: string): Project[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const projects: Project[] = [];
  let title: string | null = null;
  let body: string[] = [];

  const flush = () => {
    if (!title) return;
    const project = parseSection(title, body);
    if (project) projects.push(project);
    title = null;
    body = [];
  };

  for (const line of lines) {
    const heading = line.match(HEADING_RE);
    if (heading) {
      flush();
      title = heading[1].trim();
      continue;
    }
    if (title) body.push(line);
  }
  flush();

  return projects;
}

export function inlineMarkdown(text: string): string {
  // Protect store-style and normal links, bold, italic, code
  type Slot = { html: string };
  const slots: Slot[] = [];
  const park = (html: string) => {
    const i = slots.length;
    slots.push({ html });
    return `\u0000${i}\u0000`;
  };

  let out = text;

  out = out.replace(/\[\*\*(.+?)\*\*\]\((.+?)\)/g, (_, label: string, url: string) =>
    park(`<strong><a href="${escapeAttr(url)}" target="_blank">${escapeHtml(label)}</a></strong>`),
  );
  out = out.replace(INLINE_LINK_RE, (_, label: string, url: string) =>
    park(`<a href="${escapeAttr(url)}" target="_blank">${inlineMarkdownBasic(label)}</a>`),
  );
  out = inlineMarkdownBasic(out);
  out = out.replace(/\u0000(\d+)\u0000/g, (_, i: string) => slots[Number(i)].html);
  return out;
}

function inlineMarkdownBasic(text: string): string {
  type Slot = { html: string };
  const slots: Slot[] = [];
  const park = (html: string) => {
    const i = slots.length;
    slots.push({ html });
    return `\u0000B${i}\u0000`;
  };

  let out = escapeHtml(text);
  // After escape, ** and * and ` are still present as characters
  out = out.replace(/`([^`]+)`/g, (_, code: string) => park(`<code>${code}</code>`));
  out = out.replace(/\*\*(.+?)\*\*/g, (_, bold: string) => park(`<strong>${bold}</strong>`));
  out = out.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, (_, em: string) => park(`<em>${em}</em>`));
  out = out.replace(/\u0000B(\d+)\u0000/g, (_, i: string) => slots[Number(i)].html);
  return out;
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function escapeAttr(text: string): string {
  return escapeHtml(text).replace(/'/g, "&#39;");
}
