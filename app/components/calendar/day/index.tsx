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
      className={`flex flex-col justify-around h-full ${
        new Date().getMonth() + 1 !== props.date.getMonth() + 1
          ? "text-gray-400"
          : "text-gray-800 hover:bg-gray-100"
      }`}
    >
      <div>{props.date.getDate()}</div>
      <DayText
        time={"0712"}
        formattedDate={formattedDate}
        text="(오전) 07 ~ 12"
        attendList={data?.["0712"] || []}
        day={props.date.getDay()}
        userAttendDates={userAttendDates}
      />
      <DayText
        time={"1218"}
        formattedDate={formattedDate}
        text="(오후) 12 ~ 18"
        attendList={data?.["1218"] || []}
        day={props.date.getDay()}
        userAttendDates={userAttendDates}
      />
      <DayText
        time={"1800"}
        formattedDate={formattedDate}
        text="(오후) 18 ~ 00"
        attendList={data?.["1800"] || []}
        day={props.date.getDay()}
        userAttendDates={userAttendDates}
      />
    </div>
  );
}
