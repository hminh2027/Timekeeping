import DashboardLayout from "@/layout/DashboardLayout";
import UseTicket from "@/utils/hooks/UseTicket";

const test = () => {
  const { tickets } = UseTicket();

  console.log("Tickets: ", tickets);
  return <div>test</div>;
};
test.layout = DashboardLayout;
export default test;
