import FlexContainer from 'components/@commons/FlexContainer';
import LogoPicture from 'components/@commons/LogoPicture';
import LoginOrSignup from 'components/LoginSignUpButton/LoginOrSignup';
import PageContainer from '../components/@commons/PageContainer';

const OnBoardingPage = (): JSX.Element => {
  return (
    <PageContainer withoutBottonBar withoutHeader>
      <FlexContainer $wFull $maxWidth="480px" $align="center" $gap="60px">
        <LogoPicture width="65%" />
        <LoginOrSignup />
      </FlexContainer>
    </PageContainer>
  );
};

export default OnBoardingPage;
