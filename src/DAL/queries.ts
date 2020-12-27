import { format } from 'date-fns';

export const deleteInvestigationsQuery = (maxLastUpdateTime: Date, countiesBlackList: string[]) => `
      SELECT delete_investigation(epidemiology_number)
      FROM investigation inv 
      JOIN investigation_status stat ON inv.investigation_status = stat.id
      JOIN "user" ON inv.last_updator = "user".id
      JOIN counties cts ON "user".investigation_group = cts.id
      WHERE last_update_time <= '${format(maxLastUpdateTime, 'yyyy-MM-dd HH:mm:ss')}'
            AND stat.display_name = 'הושלמה'
            AND cts.display_name NOT IN (${countiesBlackList.map(county => `'${county}'`).join(', ')});
`;