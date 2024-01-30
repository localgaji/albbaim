import instance from 'apis/instance';
import { TimeData } from 'apis/types';
import { strTimeProcessor } from 'utils/strTimeProcessor';

export const getTimeTemplate = async (params: GetRequest): Promise<GetReturn> => {
  const response: GetResponse = await instance.get(`/workTime`, { params });
  const template = response.template.map((time: TimeData) => ({
    ...time,
    startTime: strTimeProcessor(time.startTime),
    endTime: strTimeProcessor(time.endTime),
  }));
  return { template };
};

interface GetRequest {
  startWeekDate: string;
}

interface GetResponse {
  template: TimeData[];
}

interface GetReturn {
  template: TimeData[];
}

export const postOpenApplication = (params: PostParams) => {
  const newTemplate = params.timeTemplate.map((timeObject) => ({
    ...timeObject,
    startTime: `${timeObject.startTime}:00`,
    endTime: `${timeObject.endTime}:00`,
  }));

  const requestBody: PostRequest = {
    weekStartDate: params.startWeekDate,
    amount: params.weeklyAmount,
    template: newTemplate,
  };

  return instance.post(`/workTime`, requestBody);
};

interface PostParams {
  weeklyAmount: number[][];
  timeTemplate: TimeData[];
  startWeekDate: string;
}

interface PostRequest {
  weekStartDate: string;
  template: TimeData[];
  amount: number[][];
}
