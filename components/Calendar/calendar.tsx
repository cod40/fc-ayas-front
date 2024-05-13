import AttendanceModal from "@/components/Modal/AttendanceModal";
import { useEffect, useState, useRef } from "react";
import { DayProps, DayPicker } from "react-day-picker";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import DayText from "./Day/dayText";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  attendsState,
  userInfoState,
} from "../../state/atoms/userState";
import { getFormattedDate } from "@/lib/utils";
import SignUpModal from "../\bSignUp/signUp";
import LoginModal from "../Login/login";
import axios from "axios";

function CustomDay(props: DayProps & { attendDates: { [key: string]: any } }) {
  const formattedDate = getFormattedDate(props.date);

  // console.log(dateStr); // 달력에 들어오는 date가 20240509로 형식변환돼서 다 들어옴
  // console.log(props.attendDates); // DB에 들어있는 날짜가 들어옴 `20240514 : {1800: Array(1)}`
  // console.log(props.date) // date: Wed May 08 2024 00:00:00 GMT+0900 (한국 표준시) {}
  const todayAttendInfo = props.attendDates?.[formattedDate];

  return (
    <div
      className={`pl-2 flex flex-col	justify-around h-[100%] ${
        new Date().getMonth() + 1 !== props.date.getMonth() + 1
          ? "opacity-10 pointer-events-none"
          : ""
      }`}
    >
      <div>{props.date.getDate()}</div>
      <DayText
        text="(오전) 07 ~ 12"
        attendList={todayAttendInfo?.["0712"] || []}
        day={props.date.getDay()}
      />
      <DayText
        text="(오후) 12 ~ 18"
        attendList={todayAttendInfo?.["1218"] || []}
        day={props.date.getDay()}
      />
      <DayText
        text="(오후) 18 ~ 00"
        attendList={todayAttendInfo?.["1800"] || []}
        day={props.date.getDay()}
      />
    </div>
  );
}

const DatePickerComponent: React.FC = () => {
  const [attends, setAttends] = useRecoilState(attendsState);
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
          Day: (dayProps) => <CustomDay {...dayProps} attendDates={attends} />,
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
};

export default DatePickerComponent;
