import React from 'react';

import classNames from 'classnames';
import { DatePicker } from 'zmp-ui';
import './index.scss';
import { DatePickerProps } from 'zmp-ui/date-picker';

const CustomDatePicker: React.FC<DatePickerProps> = (props) => {
  const { inputClass, disabled, placeholder, ...restProps } = props;
  return (
    <DatePicker
      {...restProps}
      placeholder={placeholder || ' '}
      inputClass={classNames(
        'text_limit icon icon_calendar',
        disabled && 'disabled',
        inputClass
      )}
    />
  );
};

export default CustomDatePicker;
