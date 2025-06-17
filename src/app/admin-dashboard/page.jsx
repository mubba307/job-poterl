import AddJob from "@/components/admin-dashboard/addjob/addjob";
import AdminSignup from "@/components/admin-dashboard/adminsignup/adminsignup";
import JobList from "@/components/admin-dashboard/joblist/joblist";
import NotificationSender from "@/components/admin-dashboard/notificationsender/notificationsender";
import ScheduleInterview from "@/components/admin-dashboard/scheduleinterview/scheduleinterview";

export default function Admin() {
  return (
    <div>
        <AdminLogin/>
        <AdminSignup/>
        <AddJob/>
        <JobList/>
        <NotificationSender/>
        <ScheduleInterview/>
    </div>
  )
}

export function AdminLogin() {
  // ...component code...
}