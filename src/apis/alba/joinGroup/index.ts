import instance from 'apis/instance';

// 그룹초대 승인
export const postGroupJoin = (variables: PostRequest) => {
  return instance.post(`/workplace/invitation/${variables.invitationKey}`);
};

interface PostRequest {
  invitationKey: string;
}

// 매장명 확인, (추가: 이미 소속된 그룹인지 여부)
export const getGroupInfo = (variables: GetRequest): Promise<GetResponse> => {
  return instance.get(`/workplace/invitation/information/${variables.invitationKey}`);
};

interface GetRequest {
  invitationKey: string;
}

interface GetResponse {
  workplaceName: string;
}
