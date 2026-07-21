import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseReadme } from "./lib/parse-readme.ts";
import { END_MARKER, injectProjects, renderProjects, START_MARKER } from "./lib/render-html.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readmePath = join(root, "README.md");
const templatePath = join(root, "index.html");
const distDir = join(root, "dist");

const STATIC_ENTRIES = ["assets", "style.css", "script.js", "CNAME", ".nojekyll"];

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");

function buildHtml(): { html: string; projectsHtml: string; count: number } {
  const readme = readFileSync(readmePath, "utf8");
  const template = readFileSync(templatePath, "utf8");

  if (!template.includes(START_MARKER) || !template.includes(END_MARKER)) {
    throw new Error(`index.html must contain ${START_MARKER} and ${END_MARKER}`);
  }

  const projects = parseReadme(readme);
  if (!projects.length) {
    throw new Error("No projects found. Mark sections with [//]: # (html: project) or (html: group).");
  }

  const projectsHtml = renderProjects(projects);
  return {
    html: injectProjects(template, projectsHtml),
    projectsHtml,
    count: projects.length,
  };
}

function copyStatic() {
  for (const entry of STATIC_ENTRIES) {
    const from = join(root, entry);
    if (!existsSync(from)) continue;
    cpSync(from, join(distDir, entry), { recursive: true });
  }
}

const { html, projectsHtml, count } = buildHtml();

if (dryRun) {
  console.log(projectsHtml);
  console.error(`\nParsed ${count} project(s). Dry run only, dist/ untouched.`);
  process.exit(0);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, "index.html"), html, "utf8");
copyStatic();

console.log(`Built dist/ with ${count} project(s). Source index.html left unchanged.`);
