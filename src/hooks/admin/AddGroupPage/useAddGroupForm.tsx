import { useMutation } from '@tanstack/react-query';
import { postAddNewGroup } from 'apis/admin/manageGroup';
import KakaoAddress from 'components/modals/KakaoAddress';
import useForm from 'hooks/useForm';
import useModal from 'hooks/useModal';
import usePopUpPage from 'hooks/usePopUpPage';
import AddGroupDonePopUp from 'pages/admin/AddGroupPage/AddGroupDonePopUp';
import React from 'react';
import { marketNoValidator, nameValidator } from 'utils/validators';

const useAddGroupForm = () => {
  const { obj: marketInfo, formHandler, etcUpdateHandler } = useForm(initialInfo);

  const { modalOnHandler, modalOffHandler } = useModal();
  const selectAddress = () => {
    modalOnHandler(
      <KakaoAddress
        onComplete={(data) => {
          etcUpdateHandler(data.address, 'mainAddress');
          modalOffHandler();
        }}
      />,
    );
  };

  const addGroupValidator = () => {
    return (
      nameValidator(marketInfo.marketName) &&
      marketNoValidator(marketInfo.marketNumber) &&
      marketInfo.mainAddress.length > 0
    );
  };

  const { popUpOnHandler } = usePopUpPage();
  const { mutate } = useMutation(['postAddNewGroup'], () => postAddNewGroup(marketInfo), {
    onSuccess: () => popUpOnHandler(<AddGroupDonePopUp />),
  });
  const addGroupSubmit = (): void => {
    mutate();
  };

  return { marketInfo, formHandler, selectAddress, addGroupValidator, addGroupSubmit };
};

export default useAddGroupForm;

const initialInfo = {
  marketName: '',
  marketNumber: '',
  mainAddress: '',
  detailAddress: '',
};
