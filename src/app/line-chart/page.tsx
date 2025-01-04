import DataEntryDialog from "@/features/line-chart/data-entry-dialog";
import LineChartComponent from "@/features/line-chart/line-chart";

const Page = () => {
  return (
    <div className="pt-24 px-5">
      <div className="flex items-center justify">
        <DataEntryDialog />
      </div>
      <LineChartComponent />
    </div>
  );
};

export default Page;
