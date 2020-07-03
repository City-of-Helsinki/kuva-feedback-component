import React from "react";
import { TextInput, TextArea, Checkbox, Button, IconUpload } from "hds-react";

import useTranslation from "../../common/hooks/useTranslation";
import A from "../../common/components/a/A";
import PlainList from "../../common/components/plainList/PlainList";
import Text from "../../common/components/text/Text";
import { Messages } from "../i18n/types";
import defaultMessages from "../i18n/defaultMessages";
import styles from "./feedbackForm.module.scss";

interface Props {
  fluid?: boolean;
  messages?: Messages;
  locale: string;
}

function FeedbackForm({
  fluid = false,
  locale,
  messages = defaultMessages,
}: Props) {
  const [t] = useTranslation({ currentLocale: locale, messages });
  const [showContactDetailFields, setShowContactDetailFields] = React.useState(
    false
  );

  const handleWantReplyToggle = () => {
    setShowContactDetailFields((value) => !value);
  };

  const wantReplyValue = showContactDetailFields;

  return (
    <div
      className={[styles.feedbackFormContainer, !fluid ? styles.maxWidth : null]
        .filter((style) => style)
        .join(" ")}
    >
      <div className={styles.feedbackFormSection}>
        <Text variant="h1">{t("formTitle")}</Text>
        <Text>{t("formDescription")}</Text>
      </div>
      <section className={styles.feedbackFormSection}>
        <Text variant="h2">{t("feedbackSectionTitle")}</Text>
        <div className={styles.feedbackFormControlGrid}>
          <TextInput name="title" id="title" labelText={t("titleFieldLabel")} />
          <TextArea
            name="content"
            id="content"
            labelText={`${t("contentFieldLabel")} *`}
          />
        </div>
      </section>
      <section className={styles.feedbackFormSection}>
        <Text variant="h2">{t("attachmentsSectionTitle")}</Text>
        <Text>{t("attachmentsSectionDescription")}</Text>
        <Button variant="secondary" iconLeft={<IconUpload />}>
          {t("doAddFile")}
        </Button>
      </section>
      <div className={styles.feedbackFormSection}>
        <Checkbox
          name="want-reply"
          id="want-reply"
          checked={wantReplyValue}
          onChange={handleWantReplyToggle}
          labelText={t("userWillsReplyLabel")}
        />
      </div>
      {showContactDetailFields && (
        <section className={styles.feedbackFormSection}>
          <Text variant="h2">{t("contactDetailsSectionTitle")}</Text>
          <div className={styles.feedbackFormControlGrid}>
            <TextInput
              name="user-name"
              id="user-name"
              labelText={t("userNameFieldLabel")}
            />
            <TextInput
              name="user-email"
              id="user-email"
              labelText={t("userEmailFieldLabel")}
            />
          </div>
        </section>
      )}
      <div className={styles.feedbackFormSection}>
        <Button type="submit">{t("doSendFeedback")}</Button>
      </div>
      <div className={styles.feedbackFormSection}>
        {t("formPrivacyWarning")
          .split("\n")
          .map((paragraph) => (
            <Text key={paragraph.slice(0, 8)}>{paragraph}</Text>
          ))}
        <PlainList
          items={[
            <A
              href={t("formPrivacyPolicyLink")}
              target="tab"
              variant="camouflaged"
            >
              {t("formPrivacyPolicyLabel")}
            </A>,
            <A
              href={t("formInstructionLink")}
              target="tab"
              variant="camouflaged"
            >
              {t("formInstructionLabel")}
            </A>,
          ]}
        />
      </div>
    </div>
  );
}

export default FeedbackForm;
