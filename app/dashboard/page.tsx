import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
    return (
        <Tabs defaultValue="employees">
            <TabsList>
                <TabsTrigger value="employees">Employee Stats</TabsTrigger>
                <TabsTrigger value="teams">Team Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="employees">
                employees stats view
            </TabsContent>
            <TabsContent value="teams">
                teams stats view
            </TabsContent>
        </Tabs>
    );
}
