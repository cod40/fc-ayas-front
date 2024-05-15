import { fetcher } from "@/lib/fetcher";
import { getFormattedDate } from "@/lib/utils";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useRecoilState } from "recoil";
import Day from "./day";
import useSWR from "swr";
import {
  accessTokenState,
  userInfoState,
} from "../../../state/atoms/userState";
import LoginModal from "../login";
import SignUpModal from "../signup/signUp";
import { useAppStore } from "@/app/stores/app";
import isEqual from "lodash/isEqual";

export default function Calendar() {
  const attends = useAppStore((state) => state.attends);
  const setAttends = useAppStore((state) => state.setAttends);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [accesstoken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [userAttendDates, setUserAttendDates] = useState({});

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/attends`,
    fetcher
  );

  // useInfo의 데이터가 실제로 바뀌면(깊은복사로) 리로딩
  function useDeepCompareEffect(callback, dependencies) {
    const currentDependenciesRef = useRef();

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
      currentDependenciesRef.current = dependencies;
    }

    useEffect(callback, [currentDependenciesRef.current]);
  }

  useDeepCompareEffect(() => {
    if (userInfo?.Attends) {
      const attendsByDate = userInfo.Attends.reduce((acc, attend) => {
        acc[attend.Date] = acc[attend.Date] || [];
        acc[attend.Date].push(attend.Time);
        return acc;
      }, {});

      setUserAttendDates(attendsByDate);
    }
  }, [userInfo]);

  useEffect(() => {
    setAttends(data);

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
  }, [setUserInfo, setAccessToken, accesstoken, data]);

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
    window.location.reload();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <DayPicker
        className="bg-gray-100 text-gray-800" // gpt
        components={{
          Day: (dayProps) => {
            const { date } = dayProps;

            const formattedDate = getFormattedDate(date) as string;
            const todayAttendInfo = attends?.[formattedDate];
            const isActive = new Date().toDateString() === date.toDateString(); // Example for active  date gpt
            const dayClasses = isActive
              ? "bg-blue-100 border-blue-300"
              : "hover:bg-blue-50"; // gpt

            return (
              <Day
                className={`p-2 rounded shadow-sm ${dayClasses}`}
                {...dayProps}
                formattedDate={formattedDate}
                data={todayAttendInfo}
                userAttendDates={userAttendDates}
              />
            );
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
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
