import { useAtom, useSetAtom } from 'jotai';
import { openStepAtom, weeklyWorkTimeAtom } from 'pages/admin/ApplicationOpenPage/states';
import { WorkTime } from 'types/schedule';

const useTimeTemplate = () => {
  /* 1. 초기 선언 */
  const [workTime, setWorkTime] = useAtom(weeklyWorkTimeAtom);

  /* 2. 업데이트 */

  // 시간대 이름/시간 변경 (입력 값 반영)
  const updateWorkTimeHandler = (newWorkTime: WorkTime, timeIndex: number): void => {
    setWorkTime((weekly) =>
      weekly.map((daily, d) =>
        daily.map((time, t) => (timeIndex !== t ? time : { ...newWorkTime, headCount: time.headCount })),
      ),
    );
  };

  // 시간대 삭제
  const deleteHandler = (timeIndex: number) => {
    setWorkTime((weekly) => weekly.map((daily, d) => daily.filter((time, t) => timeIndex !== t)));
  };

  // 시간대 추가
  const addHandler = () => {
    setWorkTime((weekly) =>
      weekly.map((daily, d) => [...daily, { title: '', startTime: '00:00', endTime: '00:00', headCount: 0 }]),
    );
  };

  /* 3. 다음 단계로 넘어가기 : 데이터 저장 */

  const setStep = useSetAtom(openStepAtom);
  const goNextHandler = () => {
    console.log(workTime);
    if (
      workTime.some((d) => d.some((t) => t.title.length === 0)) ||
      workTime.some((d) => d.some((t) => t.startTime === t.endTime))
    ) {
      alert('시간을 올바르게 입력하세요');
      return;
    }

    setStep('setAmount');
  };

  /* 4. 데이터 초기화 */
  const initializeOpenData = () => {
    setWorkTime([]);
    setStep('setTime');
  };

  return {
    workTime,
    updateWorkTimeHandler,
    deleteHandler,
    addHandler,
    goNextHandler,
    initializeOpenData,
  };
};

export default useTimeTemplate;
