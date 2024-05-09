"use client";

import AttendanceModal from "@/components/Modal/AttendanceModal";
import { fetchAttends } from "@/lib/api/attend";
import { useEffect, useState, useRef } from "react";
import { DayProps, DayPicker } from "react-day-picker";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import DayText from "./Day/dayText";

function CustomDay(props: DayProps) {
  return (
    <div
      className={`pl-2 flex flex-col	justify-around h-[100%] ${
        new Date().getMonth() + 1 !== props.date.getMonth() + 1
          ? "opacity-10 pointer-events-none"
          : ""
      }`}
    >
      <div>{props.date.getDate()}</div>
      <DayText text="(오전) 07 ~ 12" />
      <DayText text="(오후) 12 ~ 18" />
      <DayText text="(오후) 18 ~ 00" />
    </div>
  );
}

const DatePickerComponent: React.FC = () => {
  const [attends, setAttends] = useState([]);

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}`,
    fetcher
  );

  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);

  useEffect(() => {
    setAttends(data);
  }, []);
  console.log(attends);

  return (
    <>
      {/* className={`pl-2 flex flex-col	justify-around h-[100%] ${
        new Date().getMonth() + 1 !== props.date.getMonth() + 1
          ? "text-[#ebebe4] cursor-none"
          : ""
      } `} */}

      <DayPicker
        components={{
          Day: CustomDay,
        }}
        mode="multiple"
        selected={days}
        onSelect={setDays}
      />
    </>
  );
};

export default DatePickerComponent;
