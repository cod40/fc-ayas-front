"use client";

import AttendanceModal from "@/components/Modal/AttendanceModal";
import { fetchAttends } from "@/lib/api/attend";
import { useEffect, useState, useRef } from "react";
import { DayProps, DayPicker } from "react-day-picker";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

type TagProps = {
  text: string;
};

function Tag({
  text,
}: // setShowModalParticipationList,
// showModalParticipationList,
TagProps) {
  // console.log(showModalParticipationList);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen ? (
        <AttendanceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        ""
      )}
      <div className="flex gap-x-10">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          // onClick={() =>
          //   setShowModalParticipationList(!showModalParticipationList)
          // }
        >
          {text} (0)
        </button>
        <button className="w-11 bg-blue-600 text-white font-thin rounded-[50%]">
          참가
        </button>
      </div>
    </>
  );
}

function CustomDay(props: DayProps) {
  return (
    <div
      className={`pl-2 flex flex-col	justify-around h-[100%] ${
        new Date().getMonth() + 1 !== props.date.getMonth() + 1
          ? "text-[#ebebe4] cursor-none"
          : ""
      } `}
    >
      <div>{props.date.getDate()}</div>
      <Tag text="(오전) 07 ~ 12" />
      <Tag text="(오후) 12 ~ 18" />
      <Tag text="(오후) 18 ~ 00" />
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
      <button>버튼!!!!!!!!!!</button>
    </>
  );
};

export default DatePickerComponent;
