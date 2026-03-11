import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeesStats from "./components/employees/employees-stats";
import TeamsStats from "./components/teams/teams-stats";

export default function Dashboard() {
    return (
        <Tabs defaultValue="employees">
            <TabsList className="mb-4">
                <TabsTrigger value="employees">Employee Stats</TabsTrigger>
                <TabsTrigger value="teams">Team Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="employees">
                <EmployeesStats />
            </TabsContent>
            <TabsContent value="teams">
                <TeamsStats />
            </TabsContent>
        </Tabs>
    );
}
