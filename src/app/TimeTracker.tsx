import React from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Icon,
  Popup,
} from 'semantic-ui-react';
import LengthControl from '../components/LengthControl/LengthControl';
import TIME_TRACKER_INFO from '../utils/constants';
import styles from './styles.module.scss';

function TimeTracker() {
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
          Идёт рабочий сеанс
        </span>
      </Container>
      <Container text textAlign="center">
        <span className={styles.timer}>
          25:00
        </span>
      </Container>
      <div className={styles.timer_controls}>
        <LengthControl
          title="Длительность работы"
          value={25}
          min={0}
          max={60}
          onIncrement={() => console.log('work session increment')}
          onDecrement={() => console.log('work session decrement')}
        />
        <LengthControl
          title="Длительность паузы"
          value={5}
          min={0}
          max={60}
          onIncrement={() => console.log('pause session increment')}
          onDecrement={() => console.log('pause session decrement')}
        />
      </div>
      <ButtonGroup
        basic
        inverted
        compact
        size="huge"
      >
        <Button icon="play" />
        <Button icon="pause" />
        <Button icon="refresh" />
      </ButtonGroup>
    </div>
  );
}

export default TimeTracker;
