import notificationSound from '../../../assets/audio/notification_sound.mp3';
import Notifier from '../Notifier';

export default class AudioNotifier implements Notifier {
  private notifier: HTMLAudioElement;

  constructor() {
    this.notifier = new Audio(notificationSound);
  }

  public notify = () => {
    if (this.notifier.paused) {
      this.notifier.currentTime = 0;
      this.notifier.play();
    }
  };
}
