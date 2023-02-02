import { TeamUsers } from '@operation-management/database';

export function movementLog(from: TeamUsers, to: TeamUsers): string {
    
  return `EL USUARIO ${to?.user?.name} QUE ESTABA EN EL EQUIPO ${
    from?.team?.teamName ?? 'NINGUNO'
  } PASARÁ A SER PARTE DEL EQUIPO ${to?.team?.teamName} DESDE ${
    to?.userDates?.startDate
  } HASTA ${to?.userDates?.finishDate}.`;
}
