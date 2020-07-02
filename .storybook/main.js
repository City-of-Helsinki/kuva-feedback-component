module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-docs",
    "@storybook/addon-viewport",
    "@storybook/addon-backgrounds",
    "@storybook/addon-knobs",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-storysource",
  ],
  webpack: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        // We need an alias for hds-react to point webpack to the
        // package as we can't use tilde (~) with rollup.
        "./hds-react": require("path").resolve(
          __dirname,
          "../../../node_modules/hds-react"
        ),
      },
    },
  }),
};
