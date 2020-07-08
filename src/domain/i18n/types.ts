type MessageSet = {
  "form.title": string;
  "form.description": string;
  "form.section.feedback.title": string;
  "field.title.label": string;
  "field.description.label": string;
  "field.description.error.min": string;
  "field.description.error.max": string;
  "field.description.error.required": string;
  "form.section.attachments.title": string;
  "form.section.attachments.doAddFile": string;
  "form.toggle.wantReply": string;
  "form.section.contactDetails.title": string;
  "field.firstName.label": string;
  "field.lastName.label": string;
  "field.email.label": string;
  "form.doSendFeedback": string;
  "form.privacyWarning": string;
  "form.privacyPolicy.link": string;
  "form.privacyPolicy.label": string;
  "form.instruction.link": string;
  "form.instruction.label": string;
};

export type Messages = Record<string, MessageSet>;
