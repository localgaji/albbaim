import { useMutation, useQuery } from '@tanstack/react-query';
import { getApplyForm, postApply } from 'apis/alba/apply';
import { useAtomValue, useSetAtom } from 'jotai';
import { weeklySelectAtom } from 'pages/alba/ApplyPage/states';
import React from 'react';

export const useGetApplyForm = (startWeekDate: string) => {
  const setWeeklySelect = useSetAtom(weeklySelectAtom);

  const { data } = useQuery(
    ['getApplyForm', startWeekDate],
    () =>
      getApplyForm({
        startWeekDate: startWeekDate,
      }),
    {
      suspense: true,
      staleTime: 3600 * 1000,
      cacheTime: 3600 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  React.useEffect(() => {
    if (data === undefined) return;
    setWeeklySelect(data.checklist);
  }, [data]);

  return { data };
};

export const usePutApplyForm = (startWeekDate: string, onSuccess: () => void) => {
  const weeklySelect = useAtomValue(weeklySelectAtom);
  const apply = weeklySelect.map((daily) =>
    daily.map((time) => ({ isChecked: time.isChecked, workTimeId: time.workTimeId })),
  );
  const { mutate } = useMutation(() => postApply({ startWeekDate: startWeekDate, apply: apply }), {
    onSuccess: onSuccess,
  });

  return { mutate };
};
