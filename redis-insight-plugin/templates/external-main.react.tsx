// Phase 2 — React rendering inside the Insight iframe.
// Goal: prove React mounts and displays props.
//
// Replace [PLUGIN_NAME] with your plugin's stable log prefix.
// React 17 uses ReactDOM.render; React 18+ uses createRoot. This template uses React 17 to match templates/external-parcel-package.json.

import * as React from 'react';
import * as ReactDOM from 'react-dom';

const PREFIX = '[PLUGIN_NAME]';

export type RedisInsightProps = {
  command?: string;
  data?: unknown;
  [key: string]: unknown;
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(PREFIX, 'render error', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="plugin-error">
          <p>Plugin failed to render. See console.</p>
          <pre>{String(this.state.error.message)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function ExampleApp({ command, data }: { command: string; data: unknown }) {
  return (
    <div className="example-plugin" style={{ padding: 16, fontFamily: 'sans-serif', color: '#091A23' }}>
      <h2 style={{ color: '#FF4438', margin: '0 0 8px' }}>Example Plugin</h2>
      <p style={{ margin: '0 0 4px' }}><b>Command:</b> {command || '(unknown)'}</p>
      <p style={{ margin: '0 0 12px' }}><b>Status:</b> ok</p>
      <pre
        style={{
          background: '#091A23',
          color: '#fff',
          padding: 12,
          borderRadius: 5,
          overflow: 'auto',
        }}
      >
        {JSON.stringify(data ?? null, null, 2)}
      </pre>
    </div>
  );
}

export function renderExampleView(props: RedisInsightProps): void {
  console.log(PREFIX, 'activated', props);

  const host = document.getElementById('app');
  if (!host) {
    console.error(PREFIX, '#app element missing');
    return;
  }

  try {
    ReactDOM.render(
      <ErrorBoundary>
        <ExampleApp command={String(props?.command ?? '')} data={props?.data} />
      </ErrorBoundary>,
      host
    );
  } catch (err) {
    console.error(PREFIX, 'render failed', err);
    host.innerHTML =
      '<pre style="color:red;padding:12px;">Plugin failed. See console.</pre>';
  }
}

export default { renderExampleView };
