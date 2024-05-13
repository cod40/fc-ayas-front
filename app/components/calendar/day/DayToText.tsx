import AttendanceModal from "@/app/components/modal/AttendanceModal";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { attendsState } from "../../../../state/atoms/userState";

type DayTextProps = {
  text: string;
  attendList?: string[];
  day: number;
};

export default function DayToText({ text, attendList, day }: DayTextProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [attends, setAttends] = useRecoilState(attendsState);

  return (
    <>
      {isModalOpen ? (
        <AttendanceModal
          day={day}
          attendList={attendList}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        ""
      )}
      <div className="flex gap-x-12 text-sm">
        <button onClick={() => setIsModalOpen(!isModalOpen)}>
          {text} ({attendList.length})
        </button>
        <button type="button" className="w-[20px] h-[20px]">
          <img src="/images/attendBtn/disabled.png" alt="participate button" />
        </button>
      </div>
    </>
  );
}
