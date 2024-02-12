import { atom } from 'jotai';
import { WorkTimeHeadCount } from 'types/schedule';

export const weeklyWorkTimeAtom = atom<WorkTimeHeadCount[][]>([]);
export const openStepAtom = atom<'setTime' | 'setAmount'>('setTime');
