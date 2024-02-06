import BorderBox from 'components/@commons/BorderBox';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { DailyWorkersTable } from 'components/DailyWorkersTable';
import useWeekSelector from 'hooks/useWeekSelector';
import { useGetRecommends } from 'pages/admin/ApplicationClosePage/hooks/fetch';
import useClose from 'pages/admin/ApplicationClosePage/hooks/useClose';
import { stringDateMoveKor } from 'utils/dateToString';

const SelectRecommendsSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { recommendsRes } = useGetRecommends(startWeekDate);
  const { submitHandler } = useClose(startWeekDate);
  const { day, WeekBarComponent } = useWeekSelector(0);

  return (
    <>
      <WeekBarComponent />

      <BorderBox width="100%" border>
        <FlexContainer $wFull $padding="16px">
          <Text size="lg" weight="semiBold">
            {stringDateMoveKor(startWeekDate, day)}
          </Text>
        </FlexContainer>
      </BorderBox>

      <DailyWorkersTable dailyData={recommendsRes?.recommends[day]} />
      <SubmitButton onClick={submitHandler}>스케줄 확정하기 (그룹원에게 알림이 가요!)</SubmitButton>
    </>
  );
};

export default SelectRecommendsSection;
