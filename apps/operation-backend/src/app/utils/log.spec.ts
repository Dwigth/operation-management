import { Teams, TeamUsers, User, UserTeamDates } from '@operation-management/database';
import { movementLog } from './log';

describe('Log', () => {
  let fromTeam: TeamUsers;
  let toTeam: TeamUsers;
  

  it('should mark string properties as undefined', () => {
    expect(movementLog(fromTeam, toTeam)).toStrictEqual(
      'EL USUARIO undefined QUE ESTABA EN EL EQUIPO NINGUNO PASARÁ A SER PARTE DEL EQUIPO undefined DESDE undefined HASTA undefined.'
    );
  });

  it('should return log message', () => {
        toTeam = new TeamUsers();
        toTeam.team = new Teams();
        toTeam.user = new User();
        toTeam.userDates = new UserTeamDates();
        toTeam.team.teamName = 'TEAM TO';
        toTeam.user.name = 'TEST_USER';
        toTeam.userDates.finishDate = new Date().toISOString();
        toTeam.userDates.startDate = new Date().toISOString();


        fromTeam = new TeamUsers();
        fromTeam.team = new Teams();
        fromTeam.user = new User();
        fromTeam.team.teamName = 'TEAM FROM'
        fromTeam.user.name = 'TEST_USER';
        
        expect(movementLog(fromTeam,toTeam))
  })

});
