"use client";

import DatePickerComponent from "@/components/Calendar/calendar";
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
      <RecoilRoot>
        <main className="bg-background">
          <DatePickerComponent />
        </main>
      </RecoilRoot>
    </>
  );
};

export default CalendarPage;
