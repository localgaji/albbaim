import { atom } from 'jotai';
import { WorkTimeWorkerListRecommended } from 'types/schedule';

export const recommendScheduleAtom = atom<WorkTimeWorkerListRecommended[][]>([]);
