# Template

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Server-Side Rendering (SSR)

This project has been configured for Angular SSR with client hydration.

- Dev SSR (live server rendering):

```bash
npm run serve:ssr
```

This runs the SSR dev server on `http://localhost:4200/`.

- Build for SSR (client + server bundles):

```bash
npm run build:ssr
```

- Prerender static routes:

```bash
npm run prerender
```

Prerendered HTML will be generated for the routes configured in `angular.json` under the `prerender` target.

### Notes for SSR
- Avoid directly using `window`, `document`, or other browser-only globals during server rendering. Use Angular's `isPlatformBrowser` checks or defer code to `ngAfterViewInit` on the client.
- Third-party libraries that depend on the DOM should be imported and initialized only in the browser context.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
