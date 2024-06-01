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
  // console.log(text); //Time. 18~00
  // console.log(day); // 6
  // console.log(formattedDate); // 20240706
  // console.log(time); // 1800

  const getButtonColorClass = (length: number) => {
    if (length <= 2) {
      return "bg-gray-700 text-white";
    } else if (length >= 3 && length <= 5) {
      return "bg-yellow-200";
    } else if (length >= 6) {
      return "bg-[#01a553] text-white";
    }
  };

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
          formattedDate={formattedDate}
          time={time}
        />
      ) : (
        ""
      )}
      <div className="flex gap-x-3 text-sm">
        <span className="select-none">{text}</span>
        <span className="pointer-events-auto">
          <button
            className={`w-[50px] rounded-full font-medium  ${getButtonColorClass(
              attendList?.length as number
            )}`}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <p className="hover:underline underline-offset-2">
              {attendList?.length}
            </p>
          </button>
        </span>
        <button type="button" onClick={(e) => handleToggleAttend(e)}>
          {/* <Image
            className="bg-black"
            src="/images/soccerBall/soccer.png"
            alt=""
            width="20"
            height="20"
          /> */}
          {isUserAttending ? "❌" : "⚽"}
        </button>
      </div>
    </>
  );
}
