import React from "react";
import { Formik, Form } from "formik";

import Input from "../../common/components/formikWrappers/Input";
import FileUploadField from "../../common/components/formikWrappers/FileUploadField";
import Dropdown from "../../common/components/formikWrappers/Dropdown";
import SectionToggle from "../../common/components/sectionToggle/SectionToggle";
import defaultInitialValues from "./defaultInitialValues";
import useTranslation from "../i18n/useTranslation";
import hdsTheme from "../hdsTheme/hdsTheme";
import { FormValues, FormTheme, FormFields } from "./types";
import schema from "./schema";
import { ServiceRequestTypes } from "./constants";

function assertFieldsConfigurations(
  excludedFields: FormFields[],
  initialValues: FormValues
) {
  excludedFields.forEach((field) => {
    const value = initialValues[field];
    const isNotValid = schema.fields[field].isValid(value);

    if (isNotValid) {
      // eslint-disable-next-line no-console
      console.warn(
        `You have toggled off the ${field} field and not provided a valid default value for it. This means the user won't ever be able to submit the form successfully.`
      );
    }
  });
}

export interface Props {
  initialValues?: Partial<FormValues>;
  onSubmit: (values: FormValues) => Promise<unknown>;
  theme?: FormTheme;
  include?: FormFields[];
  exclude?: FormFields[];
}

const allKeys: FormFields[] = Object.keys(defaultInitialValues) as FormFields[];

function FeedbackForm({
  initialValues: externalInitialValues,
  onSubmit,
  theme: Theme = hdsTheme,
  include = allKeys,
  exclude = [],
}: Props) {
  const [t] = useTranslation();

  const initialValues = {
    ...defaultInitialValues,
    ...externalInitialValues,
  };
  const formsFieldsInUse = include.filter(
    (includedField) => !exclude.includes(includedField)
  );

  const getIsFieldUsed = (...fields: FormFields[]): boolean => {
    return fields.reduce(
      (acc, field) => acc || formsFieldsInUse.includes(field),
      false
    );
  };

  React.useEffect(() => {
    assertFieldsConfigurations(exclude, initialValues);
  }, [exclude, initialValues]);

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
      {({ status = {}, values }) => (
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
                {getIsFieldUsed(
                  "serviceRequestType",
                  "title",
                  "description"
                ) && (
                  <Theme.LabeledSection>
                    <Theme.TextH2>
                      {t("form.section.feedback.title")}
                    </Theme.TextH2>
                    <Theme.FieldGrid>
                      {getIsFieldUsed("serviceRequestType") && (
                        <Dropdown
                          component={Theme.Dropdown}
                          id="serviceRequestType"
                          name="serviceRequestType"
                          labelText={t("field.serviceRequestType.label")}
                          required
                          options={[
                            {
                              value: ServiceRequestTypes.Thank,
                              label: t("field.serviceRequestType.option.thank"),
                            },
                            {
                              value: ServiceRequestTypes.Blame,
                              label: t("field.serviceRequestType.option.blame"),
                            },
                            {
                              value: ServiceRequestTypes.Question,
                              label: t(
                                "field.serviceRequestType.option.question"
                              ),
                            },
                            {
                              value: ServiceRequestTypes.Idea,
                              label: t("field.serviceRequestType.option.idea"),
                            },
                            {
                              value: ServiceRequestTypes.Accessibility,
                              label: t(
                                "field.serviceRequestType.option.accessibility"
                              ),
                            },
                            {
                              value: ServiceRequestTypes.Other,
                              label: t("field.serviceRequestType.option.other"),
                            },
                          ]}
                        />
                      )}
                      {getIsFieldUsed("title") && (
                        <Input
                          component={Theme.TextInput}
                          name="title"
                          id="title"
                          labelText={t("field.title.label")}
                        />
                      )}
                      {getIsFieldUsed("description") && (
                        <Input
                          component={Theme.TextArea}
                          name="description"
                          id="description"
                          labelText={`${t("field.description.label")}`}
                          required
                        />
                      )}
                    </Theme.FieldGrid>
                  </Theme.LabeledSection>
                )}
                {getIsFieldUsed("media") && (
                  <Theme.LabeledSection>
                    <Theme.TextH2>
                      {t("form.section.attachments.title")}
                    </Theme.TextH2>
                    <Theme.TextP>
                      {t("form.section.attachments.description")}
                    </Theme.TextP>
                    <FileUploadField
                      name="media"
                      id="media"
                      labelText={t("field.firstName.label")}
                      addFilesButtonLabel={t("field.media.doAddFiles")}
                      removeFileButtonLabel={t("field.media.doRemoveFile")}
                      addFilesButton={Theme.ButtonAddFiles}
                      removeFileButton={Theme.ButtonRemoveFile}
                      component={Theme.FileUploadField}
                    />
                  </Theme.LabeledSection>
                )}
                {getIsFieldUsed("firstName", "lastName", "email") && (
                  <SectionToggle
                    hasContentThatShouldBeVisible={Boolean(
                      values.firstName || values.lastName || values.email
                    )}
                    renderToggle={(props) => (
                      <Theme.Section>
                        <Theme.Checkbox
                          {...props}
                          name="want-reply"
                          id="want-reply"
                          labelText={t("form.toggle.wantReply")}
                        />
                      </Theme.Section>
                    )}
                  >
                    <Theme.LabeledSection>
                      <Theme.TextH2>
                        {t("form.section.contactDetails.title")}
                      </Theme.TextH2>
                      <Theme.FieldGrid>
                        {getIsFieldUsed("firstName") && (
                          <Input
                            component={Theme.TextInput}
                            name="firstName"
                            id="firstName"
                            labelText={t("field.firstName.label")}
                          />
                        )}
                        {getIsFieldUsed("lastName") && (
                          <Input
                            component={Theme.TextInput}
                            name="lastName"
                            id="lastName"
                            labelText={t("field.lastName.label")}
                          />
                        )}
                        {getIsFieldUsed("email") && (
                          <Input
                            component={Theme.TextInput}
                            name="email"
                            id="email"
                            labelText={t("field.email.label")}
                          />
                        )}
                      </Theme.FieldGrid>
                    </Theme.LabeledSection>
                  </SectionToggle>
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
