import React from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Icon,
  Popup,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import LengthControl from '../components/LengthControl/LengthControl';
import TIME_TRACKER_INFO from '../utils/constants';
import styles from './styles.module.scss';
import TimeTrackerStore from './TimeTrackerStore';
import AudioNotifier from '../components/Notifiers/AudioNotifier/AudioNotifier';
import convertToTimerFmt from '../utils/helpers';

const TimeTracker = observer(() => {
  const store = React.useMemo(() => new TimeTrackerStore({
    initialData: {
      timerValue: 1500,
      breakLength: 5,
      workLength: 25,
      onBreak: false,
    },
    notifier: new AudioNotifier(),
  }), []);

  const timerValue = store.getTimerValue();
  const workLength = store.getWorkLength();
  const breakLength = store.getBreakLength();
  const isTimerWorking = store.getWorkingStatus();
  const isTimerOnBreak = store.getBreakStatus();

  const formattedValue = React.useMemo(() => (
    convertToTimerFmt(timerValue)
  ), [timerValue]);

  const onWorkIncrement = React.useCallback(() => {
    store.setWorkLength(workLength + 1);
  }, [store, workLength]);

  const onWorkDecrement = React.useCallback(() => {
    store.setWorkLength(workLength - 1);
  }, [store, workLength]);

  const onBreakIncrement = React.useCallback(() => {
    store.setBreakLength(breakLength + 1);
  }, [breakLength, store]);

  const onBreakDecrement = React.useCallback(() => {
    store.setBreakLength(breakLength - 1);
  }, [breakLength, store]);

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.additional_settings}>
        <Popup
          content={TIME_TRACKER_INFO}
          trigger={(
            <Icon
              inverted
              size="big"
              name="info"
            />
          )}
        />
      </div>
      <Container text textAlign="center">
        <span className={styles.timer_label}>
          {
            isTimerOnBreak
              ? 'Идёт перерыв'
              : 'Идёт рабочее время'
          }
        </span>
      </Container>
      <Container text textAlign="center">
        <span className={`${styles.timer} ${timerValue < 60 ? styles.color_red : ''}`}>
          {formattedValue}
        </span>
      </Container>
      <div className={styles.timer_controls}>
        <LengthControl
          title="Длительность работы"
          value={workLength}
          disabled={isTimerWorking}
          onIncrement={onWorkIncrement}
          onDecrement={onWorkDecrement}
        />
        <LengthControl
          title="Длительность перерыва"
          value={breakLength}
          disabled={isTimerWorking}
          onIncrement={onBreakIncrement}
          onDecrement={onBreakDecrement}
        />
      </div>
      <ButtonGroup
        basic
        inverted
        compact
        size="huge"
      >
        <Button
          icon="play"
          disabled={isTimerWorking}
          onClick={store.startTimer}
        />
        <Button
          icon="pause"
          disabled={!isTimerWorking}
          onClick={store.pauseTimer}
        />
        <Button icon="refresh" onClick={store.reset} />
      </ButtonGroup>
    </div>
  );
});

export default TimeTracker;
