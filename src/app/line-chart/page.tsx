"use client";
import DataEntryDialog from "@/features/line-chart/data-entry-dialog";
import LineChartComponent from "@/features/line-chart/line-chart";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const Page = () => {
  const persistantData = useSelector(
    (state: RootState) => state?.lineCharts?.data
  );
  const nonPersistantData = useSelector(
    (state: RootState) => state?.lineCharts?.nonPersistentData
  );

  return (
    <div className="pt-24 px-5">
      <div className="flex items-center justify">
        <DataEntryDialog />
      </div>
      <div className="flex flex-wrap gap-x-6 justify-center gap-y-5 py-4">
        {persistantData?.map((singleValue, index) => (
          <LineChartComponent
            data={singleValue}
            key={singleValue.id}
            dataOn="persistant"
          />
        ))}
        {nonPersistantData?.map((singleValue, index) => (
          <LineChartComponent
            data={singleValue}
            key={singleValue.id}
            dataOn="non-persistant"
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
