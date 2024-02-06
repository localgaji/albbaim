import useFormOnBlurUpdate from 'hooks/useFormOnBlurUpdate';
import { useAtom } from 'jotai';
import { weeklyWorkTimeAtom } from 'pages/admin/ApplicationOpenPage/states';
import { useEffect } from 'react';
import { isOnlyNumber } from 'utils/validators';

export const usePeopleValidation = (timeIndex: number, day: number) => {
  const [workTime, setWorkTime] = useAtom(weeklyWorkTimeAtom);

  const validator = (prev: string) => {
    // validation : 숫자가 아닌 값
    if (!isOnlyNumber(prev)) {
      return workTime[day][timeIndex].headCount.toString();
    }

    let newValue = prev;
    // validation : 0으로 시작
    while (newValue.length > 1 && newValue.startsWith('0')) {
      newValue = newValue.slice(1);
    }
    return newValue;
  };

  const updateHeadCount = (eventValue: string) => {
    // 인원수 업데이트
    setWorkTime((prev) =>
      prev.map((daily, d) =>
        d !== day
          ? daily
          : daily.map((time, t) =>
              t !== timeIndex ? time : { ...time, headCount: Number.parseInt(validator(eventValue)) },
            ),
      ),
    );
  };

  const { val, final, onBlurHandler, onChangeHandler } = useFormOnBlurUpdate(
    { headCount: workTime[day][timeIndex].headCount.toString() },
    validator,
  );

  useEffect(() => {
    updateHeadCount(final.headCount);
  }, [final]);

  return {
    val,
    onBlurHandler,
    onChangeHandler,
  };
};
