import React from "react";
import { Button, Checkbox, IconUpload } from "hds-react";
import { Formik, Form } from "formik";

import A from "../../common/components/a/A";
import PlainList from "../../common/components/plainList/PlainList";
import Text from "../../common/components/text/Text";
import TextInput from "../../common/components/formikWrappers/Textinput";
import TextArea from "../../common/components/formikWrappers/TextArea";
import defaultInitialValues from "./defaultInitialValues";
import useTranslation from "../i18n/useTranslation";
import { FormValues } from "./types";
import schema from "./schema";
import styles from "./feedbackForm.module.scss";

export interface Props {
  fluid?: boolean;
  initialValues?: FormValues;
}

function FeedbackForm({
  fluid = false,
  initialValues = defaultInitialValues,
}: Props) {
  const [t] = useTranslation();
  const [showContactDetailFields, setShowContactDetailFields] = React.useState(
    false
  );

  const handleWantReplyToggle = () => {
    setShowContactDetailFields((value) => !value);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => {
        // eslint-disable-next-line no-console
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <div
            className={[
              styles.feedbackFormContainer,
              !fluid ? styles.maxWidth : null,
            ]
              .filter((style) => style)
              .join(" ")}
          >
            <div className={styles.feedbackFormSection}>
              <Text variant="h1">{t("form.title")}</Text>
              <Text>{t("form.description")}</Text>
            </div>
            <section className={styles.feedbackFormSection}>
              <Text variant="h2">{t("form.section.feedback.title")}</Text>
              <div className={styles.feedbackFormControlGrid}>
                <TextInput
                  name="title"
                  id="title"
                  labelText={t("field.title.label")}
                />
                <TextArea
                  name="description"
                  id="description"
                  labelText={`${t("field.description.label")}`}
                  required
                />
              </div>
            </section>
            <section className={styles.feedbackFormSection}>
              <Text variant="h2">{t("form.section.attachments.title")}</Text>
              <Text>{t("form.section.attachments.description")}</Text>
              <Button variant="secondary" iconLeft={<IconUpload />}>
                {t("form.section.attachments.doAddFile")}
              </Button>
            </section>
            <div className={styles.feedbackFormSection}>
              <Checkbox
                name="want-reply"
                id="want-reply"
                checked={showContactDetailFields}
                onChange={handleWantReplyToggle}
                labelText={t("form.toggle.wantReply")}
              />
            </div>
            {showContactDetailFields && (
              <section className={styles.feedbackFormSection}>
                <Text variant="h2">
                  {t("form.section.contactDetails.title")}
                </Text>
                <div className={styles.feedbackFormControlGrid}>
                  <TextInput
                    name="firstName"
                    id="firstName"
                    labelText={t("field.firstName.label")}
                  />
                  <TextInput
                    name="lastName"
                    id="lastName"
                    labelText={t("field.lastName.label")}
                  />
                  <TextInput
                    name="email"
                    id="email"
                    labelText={t("field.email.label")}
                  />
                </div>
              </section>
            )}
            <div className={styles.feedbackFormSection}>
              <Button type="submit">{t("form.doSendFeedback")}</Button>
            </div>
            <div className={styles.feedbackFormSection}>
              {t("form.privacyWarning")
                .split("\n")
                .map((paragraph) => (
                  <Text key={paragraph.slice(0, 8)}>{paragraph}</Text>
                ))}
              <PlainList
                items={[
                  <A
                    href={t("form.privacyPolicy.link")}
                    target="tab"
                    variant="camouflaged"
                  >
                    {t("form.privacyPolicy.label")}
                  </A>,
                  <A
                    href={t("form.instruction.link")}
                    target="tab"
                    variant="camouflaged"
                  >
                    {t("form.instruction.label")}
                  </A>,
                ]}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FeedbackForm;
