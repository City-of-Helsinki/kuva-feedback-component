# kuva-feedback-component

**NOTE:** This project is currently being released in a temporary npm package until we have a first release candidate ready for publishing.

Demo: [http://kuva-feedback-component.prod.kuva.hel.ninja/](http://kuva-feedback-component.prod.kuva.hel.ninja/)

## Quick Start

**Note:** This component uses `hds-react`, which injects some global styles for instance for headings. Be mindful of this if your application does not already use HDS. [174](https://github.com/City-of-Helsinki/helsinki-design-system/issues/174)  

**Note:** This component does not inject the Helsinki Grotesk font for you--you must add it yourself.

### 1. Request API key
Posting feedback requires an API key. Instructions for requesting and API key can be found from [here](https://dev.hel.fi/open311-test/v1/discovery.json).

For requests made against the test API, you can find credentials from [here](https://dev.hel.fi/open311-test/v1/discovery.json).

### 2. Integrate component

**Install it**

```bash
yarn add kuva-feedback-component-temp
```

**Add it into your application**

`App.tsx`

```tsx
// ...
import { FeedbackComponent } from "kuva-feedback-component-temp";

// ...

const feedbackComponentBackendConfig = {
  apiKey: "...",
  // Location of feedback API
  url: "...",
  // Which service you want to send the feedback into. For instance KuVa
  // has its own service code.
  serviceCode: "...",
};

// ...

function App() {
  const { i18n } = useTranslate();

  return (
    <Switch>
      <Route
        exact
        path="/feedback"
        render={(props) => (
          <FeedbackComponent
            locale={i18n.locale}
            backendConfig={feedbackComponentBackendConfig}
          />
        )}
      />
    </Switch>
  );
}
```

`Footer.tsx`

```tsx
// ...
<Link path="/feedback">{t("footer.doGiveFeedback")}</Link>
// ...
```

## Module API

### `FeedbackForm`

**Props**

| Prop                    | Description                                                                                                                                                                                                                                                                             | Default                |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `locale`                | Controls the current language of the component.                                                                                                                                                                                                                                         |                        |
| `messages?`             | Controls the messages that are used for translations.                                                                                                                                                                                                                                   | `defaultMessages`      |
| `backendConfig?`        | The component provides a default backend that integrates it into Helsinki's Open311 based feedback system. If you want to use it, you have to provide this configuration object. You can find an example from storybook.                                                                |                        |
| `onSubmit?`             | If you do not want to use the default backend, you can use a custom one by providing `onSubmit`.                                                                                                                                                                                        |                        |
| `theme?`                | By default this component is themed to match with HDS. If you do not want that, or you need to tweak the component due to some other reason, you can do it by providing a theme. You can use the `hdsTheme` as a basis for your tweak.                                                  | `hdsTheme`             |
| `include?`              | Control which fields you want to include into the form.                                                                                                                                                                                                                                 | `all fields`           |
| `exclude?`              | Control fields that are excluded from the form. Fields are first included and then excluded. If you include and exclude the same field, it will be excluded.                                                                                                                            | `[]`                   |
| `defaultInitialValues?` | By default the form has empty initial values. If you want to pre-fill some fields, you can use this object to do so.                                                                                                                                                                    | `defaultInitialValues` |
| `enableReinitialize?`   | By default the form listens on initialValues values on mount and ignores subsequent changes to them. By toggling this flag up, changes in initialValues will cascade into the form's state.                                                                                             | `false`                |
| `insertLocale?`         | By default the form send the value of `locale` prop in the `locale` field. In case the locale of the form does not match the locale of the written content, you can provide a string value that represents a locale. You can turn off location insertion by setting the prop as `false` | `true`                 |

### `defaultMessages`

The set of translations that the `FeedbackForm` component uses by default.

### `hdsTheme`

An object containing a set of components that are styled according to HDS.

## Internationalization

The `FeedbackForm` component is internationalized into three locales by default: `fi`, `sv` and `en`.

The component requires its consumer to provide the current locale as in most cases trying to infer it automatically would be doing something the consuming application has already done.

### Changing translation content

If some of the default translations do not suit your needs, you can always overwrite the defaults by using `FeedbackForm`'s `messages` prop. I recommend that you import `defaultMessages` from this package and use it as a basis for your new translations.

### Adding new locales

You can add new locales by overriding the default messages by using `FeedbackForm`'s `messages` prop. I recommend that you import `defaultMessages` from this package and extend it with your new locale. After the new locale is added, you can toggle the component to use it by simply changing the `locale` prop into that locale.

## For Developers of Library

_Demo for `develop` branch: [http://kuva-feedback-component.test.kuva.hel.ninja/](http://kuva-feedback-component.test.kuva.hel.ninja/)_

| Name         | Purpose                                                                                                  | Useful Options                |
| ------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `yarn start` | Start storybook that points to `/src`. Useful for developers of this component.                          |                               |
| `yarn lint`  | Lints the application to be according to quality standards (eslint) and formatting standards (prettier). | `--fix`: fix fixable problems |
| `yarn test`  | Runs local tests with jest.                                                                              | `--watch`: enable watch mode  |
| `yarn build` | Builds application with rollup.                                                                          |                               |

### Storybook

The `yarn start` command will start `storybook` in port `6006`. When you make changes in `src`, they'll be automatically updated to `storybook`.

The `storybook` in this project is configured to build with a setup that mimics CRA.

### Build

This project uses `rollup` for its final bundle.

### Releasing new versions

A new version of the `npm` package is automatically released when a new release is created in GitHub. Additionally, a new canary release is created after each new push into develop.
