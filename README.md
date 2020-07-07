# kuva-feedback-component

**NOTE:** This project is currently being released in a temporary npm package until we have a first release candidate ready for publishing.

Storybook for current release: [http://kuva-feedback-component.prod.kuva.hel.ninja/](http://kuva-feedback-component.prod.kuva.hel.ninja/)
Storybook for current `develop`: [http://kuva-feedback-component.test.kuva.hel.ninja/](http://kuva-feedback-component.test.kuva.hel.ninja/)

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

## Module API

### `FeedbackForm`

**Props**

| Prop        | Description                                                                                                                                                                                      | Default           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `locale`    | Controls the current language of the component.                                                                                                                                                  |                   |
| `messages?` | Controls the messages that are used for translations.                                                                                                                                            | `defaultMessages` |
| `fluid?`    | By default the component has a max width set in accordance with HDS. If you want to ignore it, you can set this option to true, in which case the form will span with no `max-width` limitation. | `false`           |

### `defaultMessages`

The set of translations that the `FeedbackForm` component uses by default.

## Internationalization

The `FeedbackForm` component is internationalized into three locales by default: `fi`, `sv` and `en`.

The component requires its consumer to provide the current locale as in most cases trying to infer it automatically would be doing something the consuming application has already done.

### Changing translation content

If some of the default translations do not suit your needs, you can always overwrite the defaults by using `FeedbackForm`'s `messages` prop. I recommend that you import `defaultMessages` from this package and use it as a basis for your new translations.

### Adding new locales

You can add new locales by overriding the default messages by using `FeedbackForm`'s `messages` prop. I recommend that you import `defaultMessages` from this package and extend it with your new locale. After the new locale is added, you can toggle the component to use it by simply changing the `locale` prop into that locale.
