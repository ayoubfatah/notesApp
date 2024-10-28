import { toast } from "sonner";
import { playSuccessNotificationSound } from "../hooks/playSuccessNotificationSound";
import { getFormattedDateNowText } from "../utils";

export const notify = {
  success: (message: string, sound: boolean = true) => {
    toast.success(message, {
      description: getFormattedDateNowText(),
    });
    if (sound) playSuccessNotificationSound();
  },
};
