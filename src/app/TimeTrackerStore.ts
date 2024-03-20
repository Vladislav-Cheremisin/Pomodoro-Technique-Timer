import { action, makeObservable, observable } from 'mobx';
import Notifier from '../components/Notifiers/Notifier';

type TimeTrackerData = {
  timerValue: number,
  breakLength: number,
  workLength: number,
  onBreak: boolean,
};

type TimeTrackerStoreProps = {
  initialData: TimeTrackerData,
  notifier?: Notifier,
};

class TimeTrackerStore {
  private defaultData: TimeTrackerData;

  private notifier: Notifier | null;

  @observable
  private timerValue: number;

  @observable
  private breakLength: number;

  @observable
  private workLength: number;

  @observable
  private onBreak: boolean;

  @observable
  private isWorking: boolean;

  @observable
  private timerInterval: ReturnType<typeof setInterval> | null;

  constructor(props: TimeTrackerStoreProps) {
    this.defaultData = { ...props.initialData };
    this.notifier = props.notifier || null;
    this.timerValue = this.defaultData.timerValue;
    this.breakLength = this.defaultData.breakLength;
    this.workLength = this.defaultData.workLength;
    this.onBreak = this.defaultData.onBreak;
    this.isWorking = false;
    this.timerInterval = null;

    this.init();
    makeObservable(this);
  }

  /**
   * При инициализации хранилища забираем данные из localStorage (если имеются).
   */
  @action.bound
  private init = () => {
      const existedData = localStorage.getItem('TimeTrackerData');

      if (existedData) {
        const parsedData = JSON.parse(existedData);

        if (typeof parsedData.timerValue === 'number') {
          this.timerValue = parsedData.timerValue;
        }

        if (typeof parsedData.breakLength === 'number') {
          this.breakLength = parsedData.breakLength;
        }

        if (typeof parsedData.workLength === 'number') {
          this.workLength = parsedData.workLength;
        }

        if (typeof parsedData.onBreak === 'boolean') {
          this.onBreak = parsedData.onBreak;
        }
      }
    };

  /**
   * Сохранить данные хранилища в localStorage
   */
  private saveState = () => {
    const trackerData: TimeTrackerData = {
      timerValue: this.timerValue,
      breakLength: this.breakLength,
      workLength: this.workLength,
      onBreak: this.onBreak,
    };

    localStorage.setItem('TimeTrackerData', JSON.stringify(trackerData));
  };

  /**
   * Получить текущее значение таймера.
   */
  public getTimerValue = (): number => this.timerValue;

  /**
   * Получить длительность перерыва
   */
  public getBreakLength = (): number => this.breakLength;

  /**
   * Получить длительность работы
   */
  public getWorkLength = (): number => this.workLength;

  /**
   * Получить данные о том, работает ли таймер в данный момент
   * @returns true если работает, в противном случае false
   */
  public getWorkingStatus = (): boolean => this.isWorking;

  /**
   * Получить данные о том находится ли таймер в режиме перерыва
   * @returns true если находится, в противном случае false
   */
  public getBreakStatus = (): boolean => this.onBreak;

  /**
   * Установить длительность перерыва
   */
  @action.bound
  public setBreakLength = (value: number) => {
      if (!this.isWorking && value > 0 && value <= 60) {
        this.breakLength = value;

        if (this.onBreak) {
          this.timerValue = this.breakLength * 60;
        }

        this.saveState();
      }
    };

  /**
   * Установить длительность работы
   */
  @action.bound
  public setWorkLength = (value: number) => {
      if (!this.isWorking && value > 0 && value <= 60) {
        this.workLength = value;

        if (!this.onBreak) {
          this.timerValue = this.workLength * 60;
        }

        this.saveState();
      }
    };

  /**
   * Запустить таймер
   */
  @action.bound
  public startTimer = () => {
      if (!this.isWorking) {
        this.isWorking = true;

        this.timerInterval = setInterval(() => {
          if (this.timerValue === 0) {
            this.timerValue = this.onBreak
              ? this.workLength * 60
              : this.breakLength * 60;

            this.onBreak = !this.onBreak;

            if (this.notifier) {
              this.notifier.notify();
            }
          } else {
            this.timerValue -= 1;
          }

          this.saveState();
        }, 1000);
      }
    };

  /**
   * Остановить таймер
   */
  @action.bound
  public pauseTimer = () => {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);

        this.timerInterval = null;
        this.isWorking = false;
      }
    };

  /**
   * Сбросить конфигурацию хранилища к начальным настройкам
   */
  @action.bound
  public reset = () => {
      if (this.isWorking) {
        this.pauseTimer();
      }

      this.timerValue = this.defaultData.timerValue;
      this.breakLength = this.defaultData.breakLength;
      this.workLength = this.defaultData.workLength;
      this.onBreak = this.defaultData.onBreak;
      this.isWorking = false;
      this.timerInterval = null;
      this.saveState();
    };
}

export default TimeTrackerStore;
