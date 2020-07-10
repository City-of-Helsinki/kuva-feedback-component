type EnumLiteralsOf<T extends Record<string, unknown>> = T[keyof T];

export const ServiceRequestTypes = Object.freeze({
  Thank: "THANK" as const,
  Blame: "BLAME" as const,
  Question: "QUESTION" as const,
  Idea: "IDEA" as const,
  Accessibility: "Accessibility" as const,
  Other: "OTHER" as const,
});
export type ServiceRequestTypes = EnumLiteralsOf<typeof ServiceRequestTypes>;
