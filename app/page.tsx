"use client";

import AttendanceModal from "@/components/Modal/AttendanceModal";
import { fetchAttends } from "@/lib/api/attend";
import { useEffect, useState, useRef } from "react";
import { DayProps, DayPicker } from "react-day-picker";

type TagProps = {
  text: string;
  showModalParticipationList: boolean;
  setShowModalParticipationList: boolean;
};

function Tag({
  text,
}: // setShowModalParticipationList,
// showModalParticipationList,
TagProps) {
  // console.log(showModalParticipationList);

  return (
    <div className="flex gap-x-10">
      <button
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
      <Tag
        // showModalParticipationList={showModalParticipationList}
        // setShowModalParticipationList={setShowModalParticipationList}
        text="(오전) 07 ~ 12"
      />
      <Tag
        // showModalParticipationList={showModalParticipationList}
        // setShowModalParticipationList={setShowModalParticipationList}
        text="(오후) 12 ~ 18"
      />
      <Tag
        // showModalParticipationList={showModalParticipationList}
        // setShowModalParticipationList={setShowModalParticipationList}
        text="(오후) 18 ~ 00"
      />
    </div>
  );
}

const DatePickerComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [attends, setAttends] = useState([]);
  const [error, setError] = useState("");

  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);
  const [showModalParticipationList, setShowModalParticipationList] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAttends();
        setAttends(data);
      } catch (err) {
        setError("Failed to fetch attends");
        console.error(err);
      }
    })();
  }, []);
  console.log(attends);

  return (
    <>
      {/* className={`pl-2 flex flex-col	justify-around h-[100%] ${
        new Date().getMonth() + 1 !== props.date.getMonth() + 1
          ? "text-[#ebebe4] cursor-none"
          : ""
      } `} */}

      {isModalOpen ? (
        <AttendanceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        ""
      )}

      <DayPicker
        components={{
          Day: CustomDay,
        }}
        mode="multiple"
        selected={days}
        onSelect={setDays}
      />
      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        버튼!!!!!!!!!!
      </button>
    </>
  );
};

export default DatePickerComponent;
