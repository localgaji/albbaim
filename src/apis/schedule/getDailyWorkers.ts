import instance from 'apis/instance';
import { TimeWorkerListData } from 'apis/types';
import { strTimeProcessor } from 'utils/strTimeProcessor';

export const getDailyWorkers = async (variables: Variables): Promise<Response> => {
  const response: Response = await instance.get(`/fixed/dailyWorkers/${variables.selectedDate}`);
  const schedule = response.schedule.map((time: TimeWorkerListData) => ({
    ...time,
    startTime: strTimeProcessor(time.startTime),
    endTime: strTimeProcessor(time.endTime),
  }));

  return { schedule };
};

interface Variables {
  selectedDate: string;
}

interface Response {
  schedule: TimeWorkerListData[];
}
