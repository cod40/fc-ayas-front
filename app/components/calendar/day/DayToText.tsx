import AttendanceModal from "@/app/components/modal/AttendanceModal";
import { useEffect, useState } from "react";
import { useToggleAttend } from "@/lib/api/useToggleAttend";
import { useUserInfo } from "@/app/stores/global";
import Image from "next/image";

type DayTextProps = {
  text: string;
  attendList?: string[];
  day: number;
  formattedDate: string;
  time: string;
  userAttendDates: { [key: string]: string[] };
};

export default function DayToText({
  text,
  attendList,
  day,
  formattedDate,
  time,
  userAttendDates,
}: DayTextProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { userID } = useUserInfo();
  const isUserAttending = userAttendDates[formattedDate]?.includes(time);
  const toggleAttend = useToggleAttend(); // 커스텀 훅으로 변경

  const handleToggleAttend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleAttend(e, isUserAttending, formattedDate, time, userID); // 커스텀 훅으로 변경
  };

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
          {text} ({attendList?.length})
        </button>
        <button type="button" onClick={(e) => handleToggleAttend(e)}>
          <Image
            src={
              isUserAttending
                ? "/images/attendBtn/ativated.png"
                : "/images/attendBtn/disabled.png"
            }
            alt={
              isUserAttending
                ? "participate button activated"
                : "participate button disabled"
            }
            width={20}
            height={20}
          />
        </button>
      </div>
    </>
  );
}
