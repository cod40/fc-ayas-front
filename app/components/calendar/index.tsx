import { fetcher, userInfoFetcher } from "@/lib/fetcher";
import { getFormattedDate } from "@/lib/utils";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import Day from "./day";
import useSWR from "swr";
import LoginModal from "../login";
import SignUpModal from "../signup/signUp";
import isEqual from "lodash/isEqual";
import Loading from "../loading";
import { useAccessToken, useUserInfo } from "@/app/stores/global";

type AttendsByDate = {
  [key: string]: string[];
};

export default function Calendar() {
  const [userAttendDates, setUserAttendDates] = useState({}); //props로 내리기 때문에 useState로 유지
  const { accessToken, setAccessToken } = useAccessToken(); // zustand 예시
  const { userInfo, userID, setUserID, setUserInfo } = useUserInfo(); // zustand

  const {
    data: participantList,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/attends`, fetcher);

  // useInfo의 데이터가 실제로 바뀌면(깊은복사로) 리로딩
  function useDeepCompareEffect(callback: any, dependencies: any) {
    const currentDependenciesRef = useRef();

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
      currentDependenciesRef.current = dependencies;
    }

    useEffect(callback, [currentDependenciesRef.current]);
  }

  useEffect(() => {
    const userID = sessionStorage.getItem("UserID");
    if (userID) {
      setUserID(userID);

      // 새로고침 시 유저 정보 서버로부터 다시 불러오기
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userID}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [setUserInfo, setAccessToken, participantList, userID]);

  useDeepCompareEffect(() => {
    if (userInfo?.Attends) {
      const attendsByDate = userInfo?.Attends?.reduce<AttendsByDate>(
        (acc, attend) => {
          acc[attend.Date] = acc[attend.Date] || [];
          acc[attend.Date].push(attend.Time);
          return acc;
        },
        {}
      );

      setUserAttendDates(attendsByDate);
    }
  }, [userInfo]);

  if (isLoading) return <Loading />; // 받아오는 동안 띄울 loading창
  // if (error) return <div>Error: {error.message}</div>; // 400 error or 서버가 꺼져있을 때  "Fail to ~~~"

  return (
    <div className="w-[1500px]">
      <DayPicker
        captionLayout="dropdown-buttons"
        fromYear={2023}
        toYear={2024}
        className=" text-gray-800" // gpt
        components={{
          Day: (dayProps) => {
            const { date } = dayProps;
            // console.log(dayProps); date, displayMonth

            const formattedDate = getFormattedDate(date) as string;
            const todayAttendInfo = participantList?.[formattedDate];
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
    </div>
  );
}
