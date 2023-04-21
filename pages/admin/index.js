import SidebarAdmin from "../../src/components/sidebar";
import WelcomePage from "./dashboard";

export default function AdminHome(props) {
  return (
    <SidebarAdmin>
      <WelcomePage/>
    </SidebarAdmin>
  );
}