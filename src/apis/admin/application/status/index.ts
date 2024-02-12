import instance from 'apis/instance';
import { WorkTimeWorkerList } from 'types/schedule';

export const getApplyStatus = (variables: Request): Promise<Response> => {
  return instance.get(`/application/${variables.startWeekDate}`);
};

interface Request {
  startWeekDate: string;
}

interface Response {
  applyStatus: WorkTimeWorkerList[][];
}
