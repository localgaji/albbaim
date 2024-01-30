import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { useGetInvitation } from 'pages/alba/InvitedPage/hooks/fetch';

interface Props {
  invitationKey: string;
}

const InvitationContent = ({ invitationKey }: Props): JSX.Element => {
  const { workplaceData } = useGetInvitation(invitationKey);

  return (
    <>
      <FlexContainer>
        <Text size="xxxl" weight="bold">
          {workplaceData?.workplaceName}
        </Text>
      </FlexContainer>
      <FlexContainer $wFull>
        <Text>그룹에 초대되었습니다.</Text>
      </FlexContainer>
    </>
  );
};

export default InvitationContent;
