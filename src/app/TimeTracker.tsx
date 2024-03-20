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
        <span className={styles.timer}>{timerValue}</span>
      </Container>
      <div className={styles.timer_controls}>
        <LengthControl
          title="Длительность работы"
          value={workLength}
          disabled={isTimerWorking}
          onIncrement={store.incrementWorkLength}
          onDecrement={store.decrementWorkLength}
        />
        <LengthControl
          title="Длительность перерыва"
          value={breakLength}
          disabled={isTimerWorking}
          onIncrement={store.incrementBreakLength}
          onDecrement={store.decrementBreakLength}
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
