import { Dirty, Clean } from "../types";
import Message from "./Message";

type PipeFunction<T> = (arg: T) => T;
export const pipe = <T>(...fns: PipeFunction<T>[]) => (x: T) =>
  fns.reduce((v, f) => f(v), x);

export function removeNull(obj: Dirty): Clean {
  const filteredObject = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null) {
      filteredObject[key] = value;
    }
  });

  return filteredObject as Clean;
}

export function toSnakeCase(obj: Clean): Clean {
  const transformedObject = {};

  Object.entries(obj).forEach(([key, value]) => {
    const transformedKey = key.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`
    );

    transformedObject[transformedKey] = value;
  });

  return transformedObject as Clean;
}

export function clean<T extends Dirty, K extends Clean>(
  message: Message<T>
): Message<K> {
  const cleanMessage = pipe(removeNull, toSnakeCase)(message.content) as K;

  return message.setContent(cleanMessage);
}
