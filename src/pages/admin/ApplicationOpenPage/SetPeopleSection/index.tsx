import BorderBox from 'components/@commons/BorderBox';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import useWeekSelector from 'hooks/useWeekSelector';
import { useAtomValue, useSetAtom } from 'jotai';
import { usePostOpenApplication } from 'pages/admin/ApplicationOpenPage/hooks/fetch';
import { openStepAtom, weeklyWorkTimeAtom } from '../states';
import EditAmountForm from './EditAmountForm';

const SetPeopleSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);
  const { submitOpenhandler } = usePostOpenApplication(startWeekDate);
  const workTime = useAtomValue(weeklyWorkTimeAtom);
  const setStep = useSetAtom(openStepAtom);

  return (
    <FlexContainer $wFull $gap="48px">
      <button onClick={() => setStep('setTime')}>시간대 수정하기</button>
      <WeekBarComponent />
      <FlexContainer as="ol" $wFull>
        {workTime[day].map((timeData, timeIndex) => (
          <BorderBox as="li" gradation key={`${day}${timeIndex}`}>
            <FlexContainer $wFull $direction="row" $padding="32px 60px" $align="center">
              <Text size="xl" margin="0">
                {timeData.title}
              </Text>
              <Text margin="0 auto 0 0">
                {timeData.startTime} ~ {timeData.endTime}
              </Text>
              <EditAmountForm timeIndex={timeIndex} day={day} key={`${day}${timeIndex}`} />
              <Text size="xl" margin="0">
                명
              </Text>
            </FlexContainer>
          </BorderBox>
        ))}
      </FlexContainer>
      <SubmitButton onClick={submitOpenhandler}>스케줄 모집 시작하기 (그룹원에게 알림이 가요!)</SubmitButton>
    </FlexContainer>
  );
};

export default SetPeopleSection;
