# kuva-feedback-component

**NOTE:** This project is currently being released in a temporary npm package until we have a first release candidate ready for publishing.

## Commands

| Name         | Purpose                                                                                                  | Useful Options                |
| ------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `yarn start` | Start storybook that points to `/src`. Useful for developers of this component.                          |                               |
| `yarn lint`  | Lints the application to be according to quality standards (eslint) and formatting standards (prettier). | `--fix`: fix fixable problems |
| `yarn test`  | Runs local tests with jest.                                                                              | `--watch`: enable watch mode  |
| `yarn build` | Builds application with rollup.                                                                          |                               |

## Storybook

The `yarn start` command will start `storybook` in port `6006`. When you make changes in `src`, they'll be automatically updated to `storybook`.

The `storybook` in this project is configured to build with a setup that mimics CRA.

## Build

This project uses `rollup` for its final bundle.

## Releasing new versions

A new version of the `npm` package is automatically released when a new release is created in GitHub. Additionally, a new canary release is created after each new push into develop.

## Before taking into use

- This component uses `hds-react`, which injects some global styles for instance for headings. Be mindful of this if your application does not already use HDS. [174](https://github.com/City-of-Helsinki/helsinki-design-system/issues/174)
- This component does not inject the Helsinki Grotesk font for you--you must add it yourself.
- This component expects `hds-design-tokens` to be available for it in their entirety.
