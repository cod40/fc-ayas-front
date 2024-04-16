"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePickerComponent: React.FC = () => {
  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);
  const [modify, setModify] = useState(true);

  let footer =
    days && days.length > 0 ? (
      <p>You selected {days.length} day(s).</p>
    ) : (
      <p>Please pick one or more days.</p>
    );

  useEffect(() => {
    console.log(days?.length);
  }, [days]);

  return (
    <>
      <DayPicker
        mode="multiple"
        selected={days}
        onSelect={setDays}
        footer={footer}
        disabled={modify}
      />
      <div>
        <button onClick={() => setModify(!modify)}>
          {modify && days?.length === 0 ? "추가" : modify ? "수정" : "완료"}
        </button>
      </div>
    </>
  );
};

export default DatePickerComponent;
