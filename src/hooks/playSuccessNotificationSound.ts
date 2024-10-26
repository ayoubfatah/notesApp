import successSound from "../assets/audios/success-sound.mp3";
export const playSuccessNotificationSound = () => {
  const audio = new Audio(successSound);
  audio
    .play()
    .then(() => {})
    .catch((error) => {
      console.error("Error playing sound:", error);
    });
};
