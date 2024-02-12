import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import CalenderOutter, { MonthData } from 'components/Calendar/CalenderOutter';
import Loader from 'components/Suspenses/Loader';
import Skeleton from 'components/Suspenses/Skeleton';
import { useAtom } from 'jotai';
import ScheduleCalendar from 'pages/SchedulePage/CalendarSection/ScheduleCalendar';
import DailyWorkers from 'pages/SchedulePage/DailyWorkerSection/DailyWorkers';
import { Suspense } from 'react';
import { monthAtom } from './states';

const SchedulePage = (): JSX.Element => {
  return (
    <PageContainer justify="start" padding="20px" maxWidth="600px">
      <FlexContainer $wFull $gap="8px">
        <MonthSelector />
        <Suspense fallback={<Skeleton aspectRatio="1.12" isDeffered />}>
          <ScheduleCalendar />
        </Suspense>
      </FlexContainer>

      <FlexContainer $wFull>
        <Suspense fallback={<Loader />}>
          <DailyWorkers />
        </Suspense>
      </FlexContainer>
    </PageContainer>
  );
};

export default SchedulePage;

const MonthSelector = () => {
  const [selectedMonth, setter] = useAtom(monthAtom);
  const setMonth = (newMonth: MonthData) => {
    setter(newMonth);
  };
  return <CalenderOutter selectedMonth={selectedMonth} setMonth={setMonth} />;
};
