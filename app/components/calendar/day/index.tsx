import React from "react";
import { DayProps } from "react-day-picker";
import DayText from "./DayToText";
import { AdditionalProps, AttendDateItem } from "@/app/stores/app";

export default function Day(
  props: DayProps & { data: AttendDateItem | null } & AdditionalProps
) {
  const { data, formattedDate, userAttendDates } = props;

  return (
    <div
      className={`flex flex-col justify-around h-full pl-[11px] ${
        new Date().getMonth() + 1 !== props.date.getMonth() + 1
          ? "text-gray-400"
          : "text-gray-800 hover:bg-gray-100 hover:rounded-[5px]"
      }`}
    >
      <div>{props.date.getDate()}</div>
      <DayText
        time={"0712"}
        formattedDate={formattedDate}
        text="Time. 07~12"
        attendList={data?.["0712"] || []}
        day={props.date.getDate()}
        userAttendDates={userAttendDates}
      />
      <DayText
        time={"1218"}
        formattedDate={formattedDate}
        text="Time. 12~18"
        attendList={data?.["1218"] || []}
        day={props.date.getDate()}
        userAttendDates={userAttendDates}
      />
      <DayText
        time={"1800"}
        formattedDate={formattedDate}
        text="Time. 18~00"
        attendList={data?.["1800"] || []}
        day={props.date.getDate()}
        userAttendDates={userAttendDates}
      />
    </div>
  );
}
