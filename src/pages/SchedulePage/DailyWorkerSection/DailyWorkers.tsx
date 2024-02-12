import { DailyWorkersTable, NotFixedDateBox } from 'components/DailyWorkersTable';
import { useAtomValue } from 'jotai';
import { useGetDailyWorkers } from 'pages/SchedulePage/hooks/fetch';
import { dateAtom } from '../states';

const DailyWorkers = (): JSX.Element => {
  const selectedDate = useAtomValue(dateAtom);
  const { scheduleRes, hasFixed } = useGetDailyWorkers(selectedDate.date, selectedDate.hasFixed);

  if (selectedDate.date === '') {
    return <></>;
  }

  if (!selectedDate.hasFixed || !hasFixed) {
    return <NotFixedDateBox />;
  }

  return (
    <>
      <DailyWorkersTable dailyData={scheduleRes?.schedule} />
    </>
  );
};

export default DailyWorkers;
