import AttendanceModal from "@/app/components/modal/AttendanceModal";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { attendsState } from "../../../../state/atoms/userState";
import axios from "axios";
import { mutate } from "swr";

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
  const [attends, setAttends] = useRecoilState(attendsState);
  const userID = sessionStorage.getItem("UserID");

  const isUserAttending = userAttendDates[formattedDate]?.includes(time);

  const toggleAttend = async (e) => {
    e.preventDefault();
    const method = isUserAttending ? "delete" : "post";
    const payload = {
      date: formattedDate,
      time: time,
      userID: Number(userID),
    };

    try {
      const response = await axios({
        method: method,
        url: `${process.env.NEXT_PUBLIC_API_URL}/attends`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/attends`);
      }
    } catch (err) {
      console.error("Error toggling attend:", err);
    }
  };

  const buttonImageSrc = isUserAttending
    ? "/images/attendBtn/ativated.png"
    : "/images/attendBtn/disabled.png";

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
        <button
          type="button"
          className="w-[20px] h-[20px]"
          onClick={(e) => toggleAttend(e)}
        >
          <img
            src={buttonImageSrc}
            alt={
              buttonImageSrc
                ? "participate button activated"
                : "participate button disabled"
            }
          />
        </button>
      </div>
    </>
  );
}
