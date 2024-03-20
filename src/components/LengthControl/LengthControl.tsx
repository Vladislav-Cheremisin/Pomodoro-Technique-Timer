import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import styles from './styles.module.scss';

type LengthControlProps = {
  title: string
  value: number
  min?: number
  max?: number
  disabled?: boolean,
  onIncrement: () => void
  onDecrement: () => void
};

function LengthControl(props: LengthControlProps) {
  const {
    title,
    value,
    min = 1,
    max = 60,
    disabled = false,
    onIncrement,
    onDecrement,
  } = props;

  const onPlusClick = React.useCallback(() => {
    if (value < max) {
      onIncrement();
    }
  }, [max, onIncrement, value]);

  const onMinusClick = React.useCallback(() => {
    if (value > min) {
      onDecrement();
    }
  }, [min, onDecrement, value]);

  return (
    <Segment padded basic vertical textAlign="center">
      <div className={styles.controls_wrapper}>
        <Button
          basic
          inverted
          circular
          icon="minus"
          disabled={(value <= min) || disabled}
          onClick={onMinusClick}
        />
        <span>{value}</span>
        <Button
          basic
          inverted
          circular
          icon="plus"
          disabled={(value >= max) || disabled}
          onClick={onPlusClick}
        />
      </div>
      <span className={styles.controls_label}>{title}</span>
    </Segment>
  );
}

export default LengthControl;
