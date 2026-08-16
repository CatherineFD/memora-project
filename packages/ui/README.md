# @repo/ui

A small UI component library that wraps underlying component implementations (default: antd).

Goals:
- Use Ant Design (antd) by default for quick development.
- Provide an abstraction so the implementation can be swapped easily (via UiProvider).
- Build as a lightweight React component library suitable for consumption by microfrontends.

Usage

1) Default (antd) usage

- Ensure the host app imports antd styles once (recommended in root):

  import 'antd/dist/reset.css'; // or custom compiled theme

- Wrap the application with the provider (in the host or remote app):

  import { UiProvider, antdImplementation } from '@repo/ui';

  function App() {
    return (
      <UiProvider impl={antdImplementation}>
        <YourApp />
      </UiProvider>
    );
  }

- Use components directly:

  import { Button, Card, Code } from '@repo/ui';

  <Button onClick={() => {}}>Click me</Button>

2) Overriding the implementation

- Create an object that matches the UIImpl shape (Button, Card, Code components) and pass it to UiProvider:

  import { UiProvider } from '@repo/ui';
  import MyButton from './my-button';

  const myImpl = { Button: MyButton, Card: MyCard, Code: MyCode };

  <UiProvider impl={myImpl}>
    <App />
  </UiProvider>

Microfrontends notes

- Keep React and antd as peer dependencies to avoid duplicate copies across remotes and the host. The package.json declares react/react-dom/antd as peerDependencies. The host should provide matching versions.
- Import styles (antd reset / theme) from the host application so that all microfrontends share consistent styling.
- When exposing remotes, export components as ESM from `dist/` (built by `yarn build`). The host and remotes should coordinate to share React and antd as externals.

Build

- Compile types and JS with: `yarn build` (runs `tsc -p .`) which produces `dist/`.

Design notes

- Components in `src/` are thin adapters that call into an implementation resolved through context. This keeps the public API stable while the implementation can be swapped without changing imports across apps.

