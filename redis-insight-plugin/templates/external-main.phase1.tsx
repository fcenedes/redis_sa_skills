// Phase 1 — Vanilla wiring. No React, no third-party libraries.
// Goal: prove activation, props, and iframe rendering work end-to-end.
//
// Replace [PLUGIN_NAME] with your plugin's stable log prefix (e.g. [GEO_PLUGIN]).

const PREFIX = '[PLUGIN_NAME]';

type ActivationProps = {
  command?: string;
  data?: unknown;
  [key: string]: unknown;
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );
}

export function renderExampleView(props: ActivationProps): void {
  console.log(PREFIX, 'activated', props);

  const root = document.getElementById('app');
  if (!root) {
    console.error(PREFIX, '#app element missing');
    return;
  }

  const command = String(props?.command ?? '');
  const dataJson = JSON.stringify(props?.data ?? null, null, 2);

  root.innerHTML = `
    <div style="padding:16px;font-family:sans-serif;color:#091A23;">
      <h2 style="color:#FF4438;margin:0 0 8px;">PLUGIN WORKS</h2>
      <p style="margin:0 0 4px;"><b>Command:</b> ${escapeHtml(command)}</p>
      <p style="margin:0 0 12px;"><b>Status:</b> ok</p>
      <pre style="background:#091A23;color:#fff;padding:12px;border-radius:5px;overflow:auto;">
${escapeHtml(dataJson)}
      </pre>
    </div>
  `;
}

export default { renderExampleView };
