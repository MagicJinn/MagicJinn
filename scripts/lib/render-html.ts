import { inlineMarkdown, type Link, type Project } from "./parse-readme.ts";

const INDENT = "            "; // 12 spaces, matches index.html articles

function linkHtml(link: Link, boldWrapper: "strong-a" | "a-strong"): string {
  if (boldWrapper === "strong-a") {
    return `<strong><a href="${link.url}" target="_blank">${link.label}</a></strong>`;
  }
  return `<a href="${link.url}" target="_blank"><strong>${link.label}</strong></a>`;
}

function joinLinks(links: Link[], style: "strong-a" | "a-strong"): string {
  return links.map((l) => linkHtml(l, style)).join(", ");
}

  const lines: string[] = [];
  if (project.language) {
    lines.push(`<strong>Language:</strong> ${escapePlain(project.language)}`);
  }
  if (project.role) {
    lines.push(`<strong>Role:</strong> ${escapePlain(project.role)}`);
  }
  if (project.technologies) {
    lines.push(`<strong>Technologies:</strong> ${escapePlain(project.technologies)}`);
  }

  const hasMeta = lines.length > 0;
  const putLinksInside = project.links.length > 0 && !project.meta.linksOutside && hasMeta;
  if (putLinksInside) {
    lines.push(joinLinks(project.links, "strong-a"));
  }

  if (!lines.length) return "";

  const body = lines
    .map((line, i) => {
      const br = i < lines.length - 1 ? "<br>" : "";
      return `${INDENT}        ${line}${br}`;
    })
    .join("\n");

  return `${INDENT}    <div class="project-tech">\n${body}\n${INDENT}    </div>`;
}

function escapePlain(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderProject(project: Project): string {
  const classes = ["project-card"];
  if (project.meta.featureComplete) classes.push("feature-complete");
  const classAttr = classes.join(" ");

  if (project.meta.kind === "group") {
    const items = project.items
      .map((item) => {
        const { htmlBody, links } = renderItemBody(item.body);
        const linkSuffix = links.length ? ` ${joinLinks(links, "strong-a")}` : "";
        return `${INDENT}        <li><strong>${escapePlain(item.name)}</strong> - ${htmlBody}${linkSuffix}</li>`;
      })
      .join("\n");

    return [
      `${INDENT}<article class="${classAttr}">`,
      `${INDENT}    <h3>${escapePlain(project.title)}</h3>`,
      `${INDENT}    <ul class="mod-list">`,
      items,
      `${INDENT}    </ul>`,
      `${INDENT}</article>`,
    ].join("\n");
  }

  const parts: string[] = [
    `${INDENT}<article class="${classAttr}">`,
    `${INDENT}    <h3>${escapePlain(project.title)}</h3>`,
  ];

  for (const p of project.paragraphs) {
    parts.push(`${INDENT}    <p>${inlineMarkdown(p)}</p>`);
  }

  // Vortex-style: only a link, no tech block
  const tech = renderTech(project);
  if (tech) {
    parts.push(tech);
  } else if (project.links.length && !project.meta.linksOutside) {
    parts.push(`${INDENT}    <p>${joinLinks(project.links, "strong-a")}</p>`);
  }

  if (project.meta.linksOutside && project.links.length) {
    parts.push(`${INDENT}    <p>${joinLinks(project.links, "a-strong")}</p>`);
  }

  parts.push(`${INDENT}</article>`);
  return parts.join("\n");
}

function renderItemBody(body: string): { htmlBody: string; links: Link[] } {
  const links: Link[] = [];
  const withoutLinks = body.replace(/\[\*\*(.+?)\*\*\]\((.+?)\)/g, (_, label: string, url: string) => {
    links.push({ label, url });
    return "";
  });
  const cleaned = withoutLinks.replace(/[,\s]+$/g, "").trim();
  return { htmlBody: inlineMarkdown(cleaned), links };
}

export function renderProjects(projects: Project[]): string {
  return projects.map(renderProject).join("\n\n");
}

export const START_MARKER = "<!-- PROJECTS:START -->";
export const END_MARKER = "<!-- PROJECTS:END -->";

export function injectProjects(html: string, projectsHtml: string): string {
  const start = html.indexOf(START_MARKER);
  const end = html.indexOf(END_MARKER);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Missing ${START_MARKER} / ${END_MARKER} markers in index.html`);
  }

  const before = html.slice(0, start + START_MARKER.length);
  const after = html.slice(end + END_MARKER.length);
  return `${before}\n${projectsHtml}\n            ${END_MARKER}${after}`;
}
