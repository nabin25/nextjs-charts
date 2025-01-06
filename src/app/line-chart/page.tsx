"use client";
import DataEntryDialog from "@/features/line-chart/data-entry-dialog";
import LineChartComponent from "@/features/line-chart/line-chart";
import { useState } from "react";

const Page = () => {
  const [dataArray, setDataArray] = useState<any[]>([]);
  return (
    <div className="pt-24 px-5">
      <div className="flex items-center justify">
        <DataEntryDialog setDataArray={setDataArray} />
      </div>
      {dataArray.map((singleValue, index) => (
        <LineChartComponent data={singleValue} key={index} />
      ))}
    </div>
  );
};

export default Page;
