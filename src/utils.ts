import { format } from "date-fns";

export function getFormattedDateNowText(): string {
  return format(new Date(), "EEEE, MMMM do 'at' h:mmaaa");
}
