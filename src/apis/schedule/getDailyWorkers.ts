import instance from 'apis/instance';
import { WorkTimeWorkerList } from 'types/schedule';

export const getDailyWorkers = (variables: Request): Promise<Response> => {
  return instance.get(`/fixed/dailyWorkers/${variables.selectedDate}`);
};

interface Request {
  selectedDate: string;
}

interface Response {
  schedule: WorkTimeWorkerList[];
}
