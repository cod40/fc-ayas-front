"use client";

import Calendar from "@/app/components/calendar";
import DatePickerComponent from "@/app/components/calendar";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";

const CalendarPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>fc-ayas-calendar</title>
        <meta name="fc-ayas-calendar" content="fc-ayas-schedule" />
      </Head>
      <main className="bg-[#ececec] flex justify-center items-center">
        <Calendar />
      </main>
    </>
  );
};

export default CalendarPage;
