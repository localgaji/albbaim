import { to2Dimension } from 'apis/schedule/getMonthly';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import { useAtomValue } from 'jotai';
import CalendarDayBox from 'pages/SchedulePage/CalendarSection/CalendarDayBox';
import { monthAtom } from 'pages/SchedulePage/states';
import { DailySchedule } from 'types/schedule';

const EmptyCalendar = (): JSX.Element => {
  const selectedMonth = useAtomValue(monthAtom);

  return (
    <MonthBox $wFull data-testid="빈캘린더">
      {to2Dimension({ ...selectedMonth }).schedule.map((weekArray: DailySchedule[], i) => (
        <WeekGrid key={`${i}주`} $aspectRatio="5.6">
          {weekArray.map((e: DailySchedule) => (
            <CalendarDayBox key={e.date} dailyData={emptyData(e.date)} isSelected={false} />
          ))}
        </WeekGrid>
      ))}
    </MonthBox>
  );
};

export default EmptyCalendar;

const emptyData = (date: string) => {
  return { date: date, hasFixed: false, workTimes: [] };
};
