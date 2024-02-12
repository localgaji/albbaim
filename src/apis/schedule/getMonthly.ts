import instance from 'apis/instance';
import { DailySchedule, TotalWorkedTimeData } from 'types/schedule';
import { timeColors } from 'utils/colors';
import { dateToString } from 'utils/dateToString';
import { loginDatahandlers } from 'utils/loginDatahandlers';

export const getMonthly = ({ year, month, userId }: Param): Promise<Response> => {
  const isAdmin = loginDatahandlers.getLoginData().isAdmin;
  return instance.get(`/fixed/monthly/${year}/${month + 1}${isAdmin ? '/' + userId : ''}`);
};

interface Response {
  monthly: DailySchedule[][];
  totalWorkTime: TotalWorkedTimeData;
}

interface Param {
  year: number;
  month: number;
  userId?: number;
}

export const to2Dimension = ({ year, month }: { year: number; month: number }): { schedule: DailySchedule[][] } => {
  let firstMonday = 1;

  // 1. 첫번째 월요일 찾기
  const dayOf1st = new Date(year, month, 1).getDay();
  if (dayOf1st > 1) {
    firstMonday = 2 - dayOf1st;
  } else if (dayOf1st === 0) {
    firstMonday = -5;
  }

  // 2. 2차원 빈 달력
  const schedule = [];
  const allWorkTimes: Set<string> = new Set();
  for (let i = 0; i < 6; i++) {
    const weekly = [];
    const startWeekDate = i * 7 + firstMonday;

    if (i === 5 && new Date(year, month, startWeekDate).getDate() !== startWeekDate) {
      break;
    }

    for (let j = startWeekDate; j < startWeekDate + 7; j++) {
      const dateString = dateToString(new Date(year, month, j));

      weekly.push({
        date: dateString,
        hasFixed: false,
        workTimes: [],
      });
    }
    schedule.push(weekly);
  }

  const badgeColor: { [index: string]: string } = {};
  const allWorkTimesArr = Array.from(allWorkTimes).sort();
  allWorkTimesArr.map((e, i) => {
    badgeColor[e] = timeColors(i);
  });
  return { schedule };
};
