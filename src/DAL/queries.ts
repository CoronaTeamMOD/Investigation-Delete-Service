import { format } from 'date-fns';

const COMPLETED_INVESTIGATION = 100000001;

export const deleteInvestigationsQuery = (maxLastUpdateTime: Date, countiesBlackList: number[]) => `
      SELECT delete_investigation(epidemiology_number)
      FROM investigation inv 
      JOIN investigation_status stat ON inv.investigation_status = stat.id
      JOIN "user" ON inv.creator = "user".id
      WHERE last_update_time <= '${format(maxLastUpdateTime, 'yyyy-MM-dd HH:mm:ss')}'
            AND inv.investigation_status = ${COMPLETED_INVESTIGATION}
            AND "user".investigation_group NOT IN (${countiesBlackList.join(', ')});
`;