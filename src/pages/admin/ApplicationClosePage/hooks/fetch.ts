import { useQuery } from '@tanstack/react-query';
import { getRecommends } from 'apis/admin/application/close';
import { useSetAtom } from 'jotai';
import { recommendScheduleAtom } from 'pages/admin/ApplicationClosePage/state';
import { useEffect } from 'react';

export const useGetRecommends = (startWeekDate: string) => {
  const { data: recommendsRes } = useQuery(
    ['getRecommends', startWeekDate],
    () => getRecommends({ startWeekDate: startWeekDate }),
    { suspense: true },
  );

  const setRecommend = useSetAtom(recommendScheduleAtom);

  useEffect(() => {
    if (recommendsRes == undefined) return;
    setRecommend(() => recommendsRes?.recommends);
  }, [recommendsRes]);

  return { recommendsRes };
};
