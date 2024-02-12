import Text from 'components/@commons/Text';
import { BorderDayBox, DateCircle, OutterDayBox } from 'components/Calendar/CalendarStyle';
import React from 'react';
import { DailySchedule } from 'types/schedule';
import { stringDateIsToday } from 'utils/dateToString';

interface Props {
  dailyData: DailySchedule;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isSelected: boolean;
  children?: React.ReactNode;
}

const CalendarDayBox = ({ dailyData, onClick, isSelected, children }: Props): JSX.Element => {
  return (
    <OutterDayBox onClick={onClick} $disabled={!dailyData.hasFixed}>
      {isSelected && <BorderDayBox />}
      <DateCircle $isToday={stringDateIsToday(dailyData.date)}>
        <Text size="xs" weight="regular">
          {dailyData.date.split('-')[2]}
        </Text>
      </DateCircle>
      {children}
    </OutterDayBox>
  );
};

export default CalendarDayBox;
