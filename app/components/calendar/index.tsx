import { fetcher } from "@/lib/fetcher";
import { getFormattedDate } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useRecoilState } from "recoil";
import Day from "./day";
import useSWR from "swr";
import {
  accessTokenState,
  attendsState,
  userInfoState,
} from "../../../state/atoms/userState";
import LoginModal from "../login";
import SignUpModal from "../signup/signUp";
import { useAppStore } from "@/app/stores/app";

export default function Calendar() {
  const attends = useAppStore((state) => state.attends);
  const setAttends = useAppStore((state) => state.setAttends);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [accesstoken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/attends`,
    fetcher
  );

  useEffect(() => {
    setAttends(data);
  }, [data]);

  useEffect(() => {
    const sessionAccessToken = sessionStorage.getItem("accessToken");
    const userID = sessionStorage.getItem("UserID");
    if (sessionAccessToken && userID) {
      setAccessToken(sessionAccessToken);
      // 세션 스토리지에 사용자 정보가 없는 경우 서버로부터 다시 불러오기
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userID}`, {
          headers: { Authorization: `Bearer ${sessionAccessToken}` },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [setUserInfo, setAccessToken, accesstoken]);

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogoutClick = () => {
    setUserInfo({});
    setAccessToken("");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("UserID");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <DayPicker
        components={{
          Day: (dayProps) => {
            const { date } = dayProps;

            const formattedDate = getFormattedDate(date) as string;
            const todayAttendInfo = attends?.[formattedDate];

            return <Day {...dayProps} data={todayAttendInfo} />;
          },
        }}
        mode="multiple"
      />
      <div>
        {accesstoken ? (
          <div className="flex items-center  p-4 bg-white shadow-md">
            <p className="text-gray-800 text-lg">
              {userInfo?.Nickname
                ? `${userInfo.Nickname}님 아얏스에 오신 것을 환영합니다!`
                : "로딩 중..."}
            </p>
            <button
              type="button"
              onClick={handleLogoutClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleSignUpClick}
              className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
            >
              회원가입
            </button>

            <button
              onClick={handleLoginClick}
              className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
            >
              로그인
            </button>
          </>
        )}
      </div>

      {isSignUpModalOpen && (
        <SignUpModal onClose={() => setIsSignUpModalOpen(false)} />
      )}
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
}
