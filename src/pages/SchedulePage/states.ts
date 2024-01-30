import { TotalWorkedTimeData, UserData } from 'apis/types';
import { atom } from 'jotai';

const workTimeDefault = { monthly: 0, weekly: 0 };
const dateDefault = { date: '', isFixed: false };
const monthDefault = { year: new Date().getFullYear(), month: new Date().getMonth() };
const memberDefault = { userId: 0, userName: '', isAdmin: false };

export const workTimeAtom = atom<TotalWorkedTimeData>(workTimeDefault);
export const memberAtom = atom<UserData>(memberDefault); // 선택된 멤버 정보
export const dateAtom = atom(dateDefault); // 선택된 날짜 정보
export const monthAtom = atom(monthDefault, (get, set, update: SelectedMonthData) => {
  set(monthAtom, update);
  set(dateAtom, dateDefault);
});

export interface SelectedMonthData {
  year: number;
  month: number;
}

export interface SelectedDateData {
  date: string;
  isFixed: boolean;
}
