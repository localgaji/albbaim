import instance from 'apis/instance';
import { WorkTimeWorkerListRecommended, WorkTimeWorkerListWannaFix } from 'types/schedule';

export const postRecommends = (variables: PostRequest) => {
  return instance.post(`/fixed/${variables.startWeekDate}`, {
    weeklyWorkerListWannaFix: variables.weeklyWorkerListWannaFix,
  });
};

interface PostRequest {
  startWeekDate: string;
  weeklyWorkerListWannaFix: WorkTimeWorkerListWannaFix[][];
}

export const getRecommends = (variables: GetRequest): Promise<GetResponse> => {
  return instance.get(`/application/recommend/${variables.startWeekDate}`);
};

interface GetRequest {
  startWeekDate: string;
}

interface GetResponse {
  recommends: WorkTimeWorkerListRecommended[][];
}
