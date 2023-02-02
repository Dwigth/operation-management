import { NotFoundLog } from "../../interfaces";

export function notFoundMessage({
  origin,
  specificId,
  notFoundObjectName,
}: NotFoundLog) {
  return `[${origin}] ${notFoundObjectName} WITH ID ${
    specificId ?? 'NOT SPECIFIED'
  } NOT FOUND`;
}
