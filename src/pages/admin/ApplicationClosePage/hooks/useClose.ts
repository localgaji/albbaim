import { useMutation } from '@tanstack/react-query';
import { postRecommends } from 'apis/admin/application/close';
import { convertPath } from 'apis/convertURI';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedWeekAtom } from 'pages/SelectWeekPage/states';
import { recommendScheduleAtom } from 'pages/admin/ApplicationClosePage/state';
import { useNavigate } from 'react-router-dom';

const useClose = (startWeekDate: string) => {
  const setSelectedWeek = useSetAtom(selectedWeekAtom);
  const recommend = useAtomValue(recommendScheduleAtom);

  // 제출 클릭시 post 요청
  const navigate = useNavigate();
  const { mutate } = useMutation(
    ['postRecommends', startWeekDate],
    () =>
      postRecommends({
        startWeekDate: startWeekDate,
        weeklyWorkerListWannaFix: recommend.map((daily) =>
          daily.map((time) => ({ workTimeId: time.workTimeId, workerList: time.workerList })),
        ),
      }),
    {
      onSuccess: () => {
        navigate(convertPath('/'));
        setSelectedWeek({ startWeekDate: '', weekStatus: '' });
      },
    },
  );

  const submitHandler = () => {
    mutate();
  };

  return { submitHandler };
};

export default useClose;
