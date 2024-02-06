import { atom } from 'jotai';
import { WorkTimeApplyCheck } from 'types/schedule';
import weekdayArray from 'utils/weekdayArray';

export const weeklySelectAtom = atom<WorkTimeApplyCheck[][]>(weekdayArray.map(() => []));
