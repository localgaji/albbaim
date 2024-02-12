export interface WorkTime {
  [index: string]: any;
  title: string;
  startTime: string;
  endTime: string;
}

export interface WorkTimeWorkerList extends WorkTime {
  workerList: Worker[];
}

export interface WorkTimeHeadCount extends WorkTime {
  headCount: number;
}

export type WorkTimeApplyCheck = WorkTime & WorkTimeIdAndChecked;

export type WorkTimeWorkerListRecommended = WorkTime & WorkTimeWorkerListWannaFix;

export interface WorkTimeIdAndChecked {
  workTimeId: number;
  isChecked: boolean;
}

export interface WorkTimeWorkerListWannaFix {
  workTimeId: number;
  workerList: Worker[];
}

export interface Worker {
  userId: number;
  userName: string;
  // isAdmin: boolean;
}

export interface DailySchedule {
  date: string;
  hasFixed: boolean;
  workTimes: string[] | null;
}

export interface TotalWorkedTimeData {
  monthly: number;
}

export interface WeekStatus {
  weekStatus: WeekStatusTypes;
  dates: string[];
}

export type WeekStatusTypes = 'allocatable' | 'inProgress' | 'closed' | '';
