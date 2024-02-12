import { useMutation, useQuery } from '@tanstack/react-query';
import { getTimeTemplate, postOpenApplication } from 'apis/admin/application/open';
import { convertPath } from 'apis/convertURI';
import { useAtomValue, useSetAtom } from 'jotai';
import useTimeTemplate from 'pages/admin/ApplicationOpenPage/hooks/useTimeTemplate';
import { weeklyWorkTimeAtom } from 'pages/admin/ApplicationOpenPage/states';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePostOpenApplication = (startWeekDate: string) => {
  const workTime = useAtomValue(weeklyWorkTimeAtom);

  const { initializeOpenData } = useTimeTemplate();
  const navigate = useNavigate();

  const { mutate: openApplicationMutate } = useMutation(
    ['postOpenApplication', startWeekDate],
    () =>
      postOpenApplication({
        startWeekDate: startWeekDate,
        template: workTime,
      }),
    {
      onSuccess: () => {
        navigate(convertPath('/'));

        // 상태 초기화
        initializeOpenData();
      },
    },
  );
  return { submitOpenhandler: () => openApplicationMutate() };
};

export const useGetOpenTemplate = (startWeekDate: string) => {
  const setWorkTime = useSetAtom(weeklyWorkTimeAtom);

  const { data: timeTemplateRes } = useQuery(['getTimeTemplate', startWeekDate], () => getTimeTemplate(), {
    suspense: true,
    staleTime: 3600 * 1000,
    cacheTime: 3600 * 1000,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (timeTemplateRes === undefined) return;

    setWorkTime(timeTemplateRes.template);
  }, [timeTemplateRes]);

  return { timeTemplateRes };
};
