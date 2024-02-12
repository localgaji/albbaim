import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { CloseCircleButton } from 'components/@commons/icons/buttons';
import useFormOnBlurUpdate from 'hooks/useFormOnBlurUpdate';
import { ButtonContainer, InputTime, InputTitle } from 'pages/admin/ApplicationOpenPage/styles';
import { useEffect } from 'react';
import { WorkTime } from 'types/schedule';

interface Props {
  timeData: WorkTime;
  timeIndex: number;
  updater: (newWorkTime: WorkTime, index: number) => void;
  deleteHandler: (i: number) => void;
}

export const OpenTimeInputs = ({ timeData, timeIndex, updater, deleteHandler }: Props) => {
  const { val, final, onBlurHandler, onChangeHandler } = useFormOnBlurUpdate<WorkTime>(timeData);

  useEffect(() => {
    updater(final, timeIndex);
  }, [final]);

  return (
    <>
      <FlexContainer $position="relative" $direction="row" $wFull>
        <InputTitle
          id="title"
          value={val['title']}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          placeholder="시간대 이름을 입력하세요"
        />
        <ButtonContainer>
          <CloseCircleButton onClick={() => deleteHandler(timeIndex)} />
        </ButtonContainer>
      </FlexContainer>

      <FlexContainer $direction="row">
        <InputTime
          id="startTime"
          value={val['startTime']}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          type="time"
        />
        <Text margin="0">~</Text>
        <InputTime id="endTime" value={val['endTime']} onChange={onChangeHandler} onBlur={onBlurHandler} type="time" />
      </FlexContainer>
    </>
  );
};
