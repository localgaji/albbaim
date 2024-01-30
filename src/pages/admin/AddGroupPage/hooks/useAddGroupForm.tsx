import { useMutation } from '@tanstack/react-query';
import { postAddNewGroup } from 'apis/admin/manageGroup';
import KakaoAddressModal from 'components/modals/KakaoAddressModal';
import useForm from 'hooks/useForm';
import useModal from 'hooks/useModal';
import usePopUpPage from 'hooks/usePopUpPage';
import AddGroupDonePopUp from 'pages/admin/AddGroupPage/AddGroupDonePopUp';
import { nameValidator, workplaceNoValidator } from 'utils/validators';

const useAddGroupForm = () => {
  const { obj: workplaceInfo, formHandler, etcUpdateHandler } = useForm(initialInfo);

  const { modalOnHandler, modalOffHandler } = useModal();
  const selectAddress = () => {
    modalOnHandler(
      <KakaoAddressModal
        onComplete={(data) => {
          etcUpdateHandler(data.address, 'mainAddress');
          modalOffHandler();
        }}
      />,
    );
  };

  const addGroupValidator = () => {
    return (
      nameValidator(workplaceInfo.workplaceName) &&
      workplaceNoValidator(workplaceInfo.workplaceNumber) &&
      workplaceInfo.mainAddress.length > 0
    );
  };

  const { popUpOnHandler } = usePopUpPage();
  const { mutate } = useMutation(['postAddNewGroup'], () => postAddNewGroup(workplaceInfo), {
    onSuccess: () => popUpOnHandler(<AddGroupDonePopUp />),
  });
  const addGroupSubmit = (): void => {
    mutate();
  };

  return { workplaceInfo, formHandler, selectAddress, addGroupValidator, addGroupSubmit };
};

export default useAddGroupForm;

const initialInfo = {
  workplaceName: '',
  workplaceNumber: '',
  mainAddress: '',
  detailAddress: '',
};
