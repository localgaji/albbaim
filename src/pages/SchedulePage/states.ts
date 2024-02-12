import { atom } from 'jotai';
import { TotalWorkedTimeData, Worker } from 'types/schedule';

const workTimeDefault = { monthly: 0, weekly: 0 };
const dateDefault = { date: '', hasFixed: false };
const monthDefault = { year: new Date().getFullYear(), month: new Date().getMonth() };
const memberDefault = { userId: 0, userName: '', isAdmin: false };

export const workTimeAtom = atom<TotalWorkedTimeData>(workTimeDefault);
export const memberAtom = atom<Worker>(memberDefault); // 선택된 멤버 정보
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
  hasFixed: boolean;
}
