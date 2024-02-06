import instance from 'apis/instance';
import { WorkTimeApplyCheck, WorkTimeIdAndChecked } from 'types/schedule';

export const getApplyForm = (variables: GetRequest): Promise<GetResponse> => {
  return instance.get(`/application/checklist/${variables.startWeekDate}`);
};

interface GetRequest {
  startWeekDate: string;
}

interface GetResponse {
  checklist: WorkTimeApplyCheck[][];
}

export const postApply = (body: PostRequest) => {
  return instance.post(`/application`, body);
};

interface PostRequest {
  startWeekDate: string;
  apply: WorkTimeIdAndChecked[][];
}
