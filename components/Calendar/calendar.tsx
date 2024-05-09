"use client";

import AttendanceModal from "@/components/Modal/AttendanceModal";
import { fetchAttends } from "@/lib/api/attend";
import { useEffect, useState, useRef } from "react";
import { DayProps, DayPicker } from "react-day-picker";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import DayText from "./Day/dayText";
import { useRecoilState } from "recoil";
import { attendsState } from "../../state/atoms/userState";
import { getFormattedDate } from "@/lib/utils";

function CustomDay(props: DayProps & { attendDates: { [key: string]: any } }) {
  const formattedDate = getFormattedDate(props.date);

  // console.log(dateStr); // 달력에 들어오는 date가 20240509로 형식변환돼서 다 들어옴
  // console.log(props.attendDates); // DB에 들어있는 날짜가 들어옴 `20240514 : {1800: Array(1)}`
  // console.log(props.date) // date: Wed May 08 2024 00:00:00 GMT+0900 (한국 표준시) {}
  const todayAttendInfo = props.attendDates?.[formattedDate];

  console.log(props.date.getDay());
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
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/attends`,
    fetcher
  );

  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);

  useEffect(() => {
    setAttends(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* className={`pl-2 flex flex-col	justify-around h-[100%] ${
        new Date().getMonth() + 1 !== props.date.getMonth() + 1
          ? "text-[#ebebe4] cursor-none"
          : ""
      } `} */}

      <DayPicker
        components={{
          Day: (dayProps) => <CustomDay {...dayProps} attendDates={attends} />,
        }}
        mode="multiple"
      />
    </>
  );
};

export default DatePickerComponent;
