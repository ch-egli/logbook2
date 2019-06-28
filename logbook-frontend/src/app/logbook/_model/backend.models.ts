export class Workout {
    benutzername: string;
    datum: Date;
    ort: string;
    trainingszeit: number;
    lead: number;
    bouldern: number;
    speed: number;
    kraftraum: number;
    dehnen: number;
    campus: number;
    mentaltraining: number;
    belastung: number;
    zuege12: number;
    zuege23: number;
    zuege34: number;
    wettkampf: string;
    sonstiges: string;
    schlaf: number;
    gefuehl: number;
    gefuehlK: number;
    gefuehlM: number;
}

export class WorkoutPageable {
    content: Workout[];
    pageable: any;
    last: boolean;
    totalElements: number;
    totalPages: number;
}

export class Status {
    benutzername: string;
    datum: Date;
    schlaf: number;
    gefuehl: number;
    gefuehlK: number;
    gefuehlM: number;
    bemerkung: string;
}

export class StatusPageable {
    content: Status[];
    pageable: any;
    last: boolean;
    totalElements: number;
    totalPages: number;
}
