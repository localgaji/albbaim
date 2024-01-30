import instance from 'apis/instance';
import { ApplyData, SelectedTimeData, TimeData, TimeWithIdData } from 'apis/types';
import { strTimeProcessor } from 'utils/strTimeProcessor';

export const getApplyForm = async (variables: GetRequest): Promise<GetReturn> => {
  const response: GetResponse = await instance.get(`/application/checklist/${variables.startWeekDate}`);

  const templates: { [index: number]: TimeData } = {};
  for (let timeObj of response.template) {
    templates[timeObj.workTimeId] = {
      title: timeObj.title,
      startTime: strTimeProcessor(timeObj.startTime),
      endTime: strTimeProcessor(timeObj.endTime),
    };
  }

  const selected = response.selected.map((dailyArray) => {
    return dailyArray.map((workersObj) => {
      return { ...templates[workersObj.workTimeId], ...workersObj };
    });
  });

  return { selected };
};

interface GetRequest {
  startWeekDate: string;
}

interface GetResponse {
  template: TimeWithIdData[];
  selected: ApplyData[][];
}

interface GetReturn {
  selected: SelectedTimeData[][];
}

export const postApply = (body: PutRequest) => {
  return instance.post(`/application`, body);
};

interface PutRequest {
  weekStartDate: string;
  apply: ApplyData[][];
}
