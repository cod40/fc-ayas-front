"use client";

import DatePickerComponent from "@/components/Calendar/calendar";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const CalendarPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>fc-ayas-calendar</title>
        <meta name="fc-ayas-calendar" content="fc-ayas-schedule" />
      </Head>
      <main className="bg-background">
        <DatePickerComponent />
      </main>
    </>
  );
};

export default CalendarPage;
