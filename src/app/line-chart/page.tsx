"use client";
import DataEntryDialog from "@/features/line-chart/data-entry-dialog";
import LineChartComponent from "@/features/line-chart/line-chart";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const Page = () => {
  const lineChartsData = useSelector(
    (state: RootState) => state.lineCharts.data
  );
  return (
    <div className="pt-24 px-5">
      <div className="flex items-center justify">
        <DataEntryDialog />
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-4">
        {lineChartsData.map((singleValue, index) => (
          <LineChartComponent data={singleValue} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Page;
