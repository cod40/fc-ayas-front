import AttendanceModal from "@/components/Modal/AttendanceModal";
import { useState } from "react";

type DayTextProps = {
  text: string;
};

function DayText({ text }: DayTextProps) {
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
      <div className="flex gap-x-12 text-sm">
        <button onClick={() => setIsModalOpen(!isModalOpen)}>{text} (0)</button>
        <button type="button" className="w-[20px] h-[20px]">
          <img src="/images/attendBtn/disabled.png" alt="participate button" />
        </button>
      </div>
    </>
  );
}

export default DayText;
