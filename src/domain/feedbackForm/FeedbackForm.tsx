import React from "react";
import { Formik, Form } from "formik";

import Input from "../../common/components/formikWrappers/Input";
import defaultInitialValues from "./defaultInitialValues";
import useTranslation from "../i18n/useTranslation";
import hdsTheme from "../hdsTheme/hdsTheme";
import { FormValues, FormTheme } from "./types";
import schema from "./schema";

export interface Props {
  initialValues?: Partial<FormValues>;
  onSubmit: (values: FormValues) => Promise<unknown>;
  theme?: FormTheme;
}

function FeedbackForm({
  initialValues: externalInitialValues,
  onSubmit,
  theme: Theme = hdsTheme,
}: Props) {
  const [t] = useTranslation();
  const [showContactDetailFields, setShowContactDetailFields] = React.useState(
    false
  );

  const handleWantReplyToggle = () => {
    setShowContactDetailFields((value) => !value);
  };

  const initialValues = {
    ...defaultInitialValues,
    ...externalInitialValues,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        onSubmit(values)
          .then(() => {
            actions.setStatus({ isSubmitSuccess: true });
          })
          .catch((e: Error) => {
            // eslint-disable-next-line no-console
            console.error(e);
            actions.setStatus({
              isSubmitError: true,
              errorTechnicalDescription: e ? e.toString() : null,
            });
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {({ status = {} }) => (
        <Theme.Page>
          {status.isSubmitSuccess ? (
            <>
              <Theme.TextH1>{t("form.title.success")}</Theme.TextH1>
              <Theme.TextP>{t("form.description.success")}</Theme.TextP>
            </>
          ) : (
            <Form noValidate>
              <Theme.Container>
                <Theme.Section>
                  <Theme.TextH1>{t("form.title")}</Theme.TextH1>
                  <Theme.TextP>{t("form.description")}</Theme.TextP>
                </Theme.Section>
                <Theme.LabeledSection>
                  <Theme.TextH2>
                    {t("form.section.feedback.title")}
                  </Theme.TextH2>
                  <Theme.FieldGrid>
                    <Input
                      component={Theme.TextInput}
                      name="title"
                      id="title"
                      labelText={t("field.title.label")}
                    />
                    <Input
                      component={Theme.TextArea}
                      name="description"
                      id="description"
                      labelText={`${t("field.description.label")}`}
                      required
                    />
                  </Theme.FieldGrid>
                </Theme.LabeledSection>
                <Theme.LabeledSection>
                  <Theme.TextH2>
                    {t("form.section.attachments.title")}
                  </Theme.TextH2>
                  <Theme.TextP>
                    {t("form.section.attachments.description")}
                  </Theme.TextP>
                  <Theme.ButtonAddFile>
                    {t("form.section.attachments.doAddFile")}
                  </Theme.ButtonAddFile>
                </Theme.LabeledSection>
                <Theme.Section>
                  <Theme.Checkbox
                    name="want-reply"
                    id="want-reply"
                    checked={showContactDetailFields}
                    onChange={handleWantReplyToggle}
                    labelText={t("form.toggle.wantReply")}
                  />
                </Theme.Section>
                {showContactDetailFields && (
                  <Theme.LabeledSection>
                    <Theme.TextH2>
                      {t("form.section.contactDetails.title")}
                    </Theme.TextH2>
                    <Theme.FieldGrid>
                      <Input
                        component={Theme.TextInput}
                        name="firstName"
                        id="firstName"
                        labelText={t("field.firstName.label")}
                      />
                      <Input
                        component={Theme.TextInput}
                        name="lastName"
                        id="lastName"
                        labelText={t("field.lastName.label")}
                      />
                      <Input
                        component={Theme.TextInput}
                        name="email"
                        id="email"
                        labelText={t("field.email.label")}
                      />
                    </Theme.FieldGrid>
                  </Theme.LabeledSection>
                )}
                {status.isSubmitError && (
                  <Theme.ErrorBox label={t("form.doSendFeedback.error")}>
                    {status.errorTechnicalDescription}
                  </Theme.ErrorBox>
                )}
                <Theme.Section>
                  <Theme.ButtonSubmit>
                    {t("form.doSendFeedback")}
                  </Theme.ButtonSubmit>
                </Theme.Section>
                <Theme.Section>
                  {t("form.privacyWarning")
                    .split("\n")
                    .map((paragraph) => (
                      <Theme.TextP key={paragraph.slice(0, 8)}>
                        {paragraph}
                      </Theme.TextP>
                    ))}
                  <Theme.PlainList
                    items={[
                      <Theme.A href={t("form.privacyPolicy.link")}>
                        {t("form.privacyPolicy.label")}
                      </Theme.A>,
                      <Theme.A href={t("form.instruction.link")}>
                        {t("form.instruction.label")}
                      </Theme.A>,
                    ]}
                    // eslint-disable-next-line react/no-children-prop
                    children={undefined}
                  />
                </Theme.Section>
              </Theme.Container>
            </Form>
          )}
        </Theme.Page>
      )}
    </Formik>
  );
}

export default FeedbackForm;
