type MessageSet = {
  formTitle: string;
  formDescription: string;
  feedbackSectionTitle: string;
  titleFieldLabel: string;
  contentFieldLabel: string;
  attachmentsSectionTitle: string;
  attachmentsSectionDescription: string;
  doAddFile: string;
  userWillsReplyLabel: string;
  contactDetailsSectionTitle: string;
  userNameFieldLabel: string;
  userEmailFieldLabel: string;
  doSendFeedback: string;
  formPrivacyWarning: string;
  formPrivacyPolicyLink: string;
  formPrivacyPolicyLabel: string;
  formInstructionLink: string;
  formInstructionLabel: string;
};

export type Messages = Record<string, MessageSet>;
