import useSWR from "swr";
import { userInfoFetcher } from "../fetcher";
import { useUserInfo } from "@/app/stores/global";
import { useEffect } from "react";

export interface UserInfoRefresh {
  userInfoData: any;
  isLoadingUserInfoData: boolean;
  isErrorUserInfoData: boolean;
  refreshUserInfoData: () => void;
}

// 사용자 정보를 수동으로 새로고침할 수 있게 하는 함수
export const useUserInfoRefresh = (accessToken: string) => {
  const { setUserInfo } = useUserInfo();
  const userID = sessionStorage.getItem("UserID");
  const { data, error, mutate } = useSWR(
    userID
      ? [`${process.env.NEXT_PUBLIC_API_URL}/users/${userID}`, accessToken]
      : null,
    userInfoFetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);
  return {
    userInfoRefresh: data,
    isLoadingUserInfoRefresh: !error && !data,
    isErrorUserInfoRefresh: error,
    refreshUserInfoData: mutate, // 수동으로 데이터 새로고침
  };
};
