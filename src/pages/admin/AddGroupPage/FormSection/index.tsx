import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import useAddGroupForm from 'pages/admin/AddGroupPage/hooks/useAddGroupForm';
import { nameValidator, workplaceNoValidator } from 'utils/validators';
import InputBar from './InputBar';

const FormSection = (): JSX.Element => {
  const { workplaceInfo, formHandler, selectAddress, addGroupValidator, addGroupSubmit } = useAddGroupForm();

  return (
    <>
      <Text size="xxl" weight="semiBold">
        매장 등록하기
      </Text>

      <FlexContainer $gap="20px" $wFull>
        <InputBar
          id="workplaceName"
          onChange={formHandler}
          labelName="상호명"
          validation={nameValidator(workplaceInfo.workplaceName)}
        />
        <InputBar
          id="workplaceNumber"
          onChange={formHandler}
          labelName="사업자 번호"
          validation={workplaceNoValidator(workplaceInfo.workplaceNumber)}
          inputType="number"
        />
        <InputBar
          id="mainAddress"
          labelName="주소"
          validation={workplaceInfo.mainAddress.length > 0}
          onClick={selectAddress}
          value={workplaceInfo.mainAddress}
          readOnly
        />

        <InputBar id="detailAddress" onChange={formHandler} labelName="상세 주소" validation={false} />
      </FlexContainer>

      <SubmitButton onClick={addGroupSubmit} disabled={!addGroupValidator()}>
        그룹 생성하기
      </SubmitButton>
    </>
  );
};

export default FormSection;
