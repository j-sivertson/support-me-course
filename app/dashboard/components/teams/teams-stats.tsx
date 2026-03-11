import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecksIcon, PieChartIcon, StarIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import cm from "@/public/images/cm.jpg";
import tf from "@/public/images/tf.jpg";
import rl from "@/public/images/rl.jpg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TeamDistributionChart from "./team-distribution-chart";
import SupportTicketResolved from "./support-ticket-resolved";

const teamLeaders = [
    {
      firstName: "Colin",
      lastName: "Murray",
      avatar: cm,
    },
    {
      firstName: "Tom",
      lastName: "Phillips",
    },
    {
      firstName: "Liam",
      lastName: "Fuentes",
    },
    {
      firstName: "Tina",
      lastName: "Fey",
      avatar: tf,
    },
    {
      firstName: "Katie",
      lastName: "Johnson",
    },
    {
      firstName: "Tina",
      lastName: "Jones",
    },
    {
      firstName: "Amy",
      lastName: "Adams",
    },
    {
      firstName: "Ryan",
      lastName: "Lopez",
      avatar: rl,
    },
    {
      firstName: "Jenny",
      lastName: "Jones",
    },
  ];
  

export default function TeamsStats() {

    return (
        <>
            <div className ="grid lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Total Teams</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <UsersIcon />
                            <div className="text-5xl font-bold">8</div>
                        </div>
                        <div>
                            <Button size="sm" asChild>
                                <Link href="/dashboard/teams">
                                    View All
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                <CardHeader className="pb-2">
                        <CardTitle className="text-base flex justify-between items-center">
                            <span>Team Leaders</span>
                            <StarIcon className="text-yellow-500" />
                        </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {teamLeaders.map((teamLeader) => {
                        return (
                            <TooltipProvider key={`${teamLeader.firstName}-${teamLeader.lastName}`}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Avatar>
                                            {teamLeader.avatar && (
                                                <AvatarImage src={teamLeader.avatar.src} alt={`${teamLeader.firstName} ${teamLeader.lastName} avatar`} />
                                            )}
                                            <AvatarFallback>{teamLeader.firstName[0]}{teamLeader.lastName[0]}</AvatarFallback>
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {teamLeader.firstName[0]}
                                        {teamLeader.lastName[0]}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}

                </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-base flex justify-between items-center">
                            <span>Team Distribution</span>
                            <PieChartIcon />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-0">
                        <TeamDistributionChart />
                    </CardContent>
                </Card>
            </div>
            <Card className="my-4">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <ListChecksIcon />
                        <span>Support tickets resolved</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pl-0">
                    <SupportTicketResolved />
                </CardContent>
            </Card>
        </>
    )
}