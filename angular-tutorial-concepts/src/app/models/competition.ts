export interface Competition {
    competitionId: number;
    title: string;
    description: string;
    startDate: string;   // ISO string from API
    endDate: string;     // ISO string from API
    status: string;
}


// IF you export class then we need to inititilize the values with empty but use interface its no need to initilize
