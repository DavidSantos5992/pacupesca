import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const port = 3107;
const landingPath = "/loja-de-pesca-varzea-paulista";
const existingLandingUrl = `http://127.0.0.1:3000${landingPath}`;
const temporaryLandingUrl = `http://127.0.0.1:${port}${landingPath}`;
const nextBin = new URL("../node_modules/.bin/next", import.meta.url).pathname;
const expectedHrefs = [
  "https://www.pacupesca.com.br/produtos/",
  "https://www.pacupesca.com.br/varas-de-pesca/",
  "https://www.pacupesca.com.br/iscas/",
  "https://www.pacupesca.com.br/carretilhas/",
  "https://www.pacupesca.com.br/molinetes/",
  "https://www.pacupesca.com.br/linhas/",
  "https://www.pacupesca.com.br/anzol/",
  "https://www.pacupesca.com.br/acessorio/",
  "https://www.pacupesca.com.br/pet/",
];
const expectedLinkedLabels = {
  "Anzóis": "https://www.pacupesca.com.br/anzol/",
  "Iscas": "https://www.pacupesca.com.br/iscas/",
  "Linhas": "https://www.pacupesca.com.br/linhas/",
  "Praia e costão": "https://www.pacupesca.com.br/varas-de-pesca/",
  "Rações": "https://www.pacupesca.com.br/pet/",
  "Redes": "https://www.pacupesca.com.br/acessorio/",
  "Suportes": "https://www.pacupesca.com.br/acessorio/",
  "Varas": "https://www.pacupesca.com.br/varas-de-pesca/",
};

let server;
let serverOutput = "";

async function fetchPage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.text();
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      return await fetchPage(url);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error(`Landing page did not become ready in time.\n${serverOutput}`);
}

try {
  let html;

  try {
    html = await fetchPage(existingLandingUrl);
  } catch {
    server = spawn(
      nextBin,
      ["dev", "-p", String(port), "-H", "127.0.0.1"],
      {
        cwd: process.cwd(),
        env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    server.stdout.on("data", (chunk) => {
      serverOutput += chunk;
    });
    server.stderr.on("data", (chunk) => {
      serverOutput += chunk;
    });

    html = await waitForServer(temporaryLandingUrl);
  }

  for (const href of expectedHrefs) {
    assert.match(html, new RegExp(`href="${href.replaceAll("/", "\\/")}"`));
  }

  for (const [label, href] of Object.entries(expectedLinkedLabels)) {
    const linkedLabel = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
      .map(([, anchorHref, content]) => ({
        href: anchorHref,
        text: content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      }))
      .some((anchor) => anchor.href === href && anchor.text.includes(label));

    assert.equal(linkedLabel, true, `${label} should link to ${href}`);
  }

  assert.doesNotMatch(html, /href="https:\/\/www\.pacupesca\.com\/produtos\/"/);
  assert.doesNotMatch(html, /href="\/produtos\/substituir-link/);
} finally {
  server?.kill("SIGTERM");
}
