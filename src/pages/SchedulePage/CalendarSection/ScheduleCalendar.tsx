import { Badge, BadgeCont, BadgeText, MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import { useAtomValue, useSetAtom } from 'jotai';
import { useGetMonthly } from 'pages/SchedulePage/hooks/fetch';
import { DailySchedule } from 'types/schedule';
import { dateAtom, monthAtom } from '../states';
import CalendarDayBox from './CalendarDayBox';

const ScheduleCalendar = (): JSX.Element => {
  const selectedMonth = useAtomValue(monthAtom);
  const { scheduleData } = useGetMonthly(selectedMonth);

  const selectedDate = useAtomValue(dateAtom);
  const setSelectedDate = useSetAtom(dateAtom);

  return (
    <MonthBox $wFull data-testid="월간스케줄">
      {scheduleData?.monthly.map((weekArray: DailySchedule[], i) => (
        <WeekGrid key={`${i}주`} $aspectRatio="5.6">
          {weekArray.map((dailyData: DailySchedule) => (
            <CalendarDayBox
              key={dailyData.date}
              dailyData={dailyData}
              onClick={() => setSelectedDate({ hasFixed: dailyData.hasFixed, date: dailyData.date })}
              isSelected={selectedDate.date === dailyData.date}
            >
              <BadgeCont>
                {dailyData.workTimes?.map((title) => (
                  <Badge key={title} $color="#DEFFE1">
                    <BadgeText>{title}</BadgeText>
                  </Badge>
                ))}
              </BadgeCont>
            </CalendarDayBox>
          ))}
        </WeekGrid>
      ))}
    </MonthBox>
  );
};

export default ScheduleCalendar;
