import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Team, ProjectTeam } from "@prisma/client"

interface ProjectTeamsProps {
  teams: (ProjectTeam & { team: Team })[]
  projectId: number
}

export function ProjectTeams({ teams, projectId }: ProjectTeamsProps) {
  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">К этому проекту пока не привязаны команды</p>
        <Button asChild className="mt-4">
          <Link href={`/projects/${projectId}/assign-team`}>Привязать команду</Link>
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Название команды</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((projectTeam) => (
          <TableRow key={projectTeam.id}>
            <TableCell>{projectTeam.team.id}</TableCell>
            <TableCell className="font-medium">{projectTeam.team.teamName}</TableCell>
            <TableCell className="text-right">
              <Button asChild size="sm" variant="ghost">
                <Link href={`/teams/${projectTeam.team.id}`}>Детали</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

