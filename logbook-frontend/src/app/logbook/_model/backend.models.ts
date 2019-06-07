export class Workout {
    datum: Date;
    benutzername: string;
    ort: string;
    trainingszeit: number;
}

export class WorkoutPageable {
    content: Workout[];
    pageable: any;
    last: boolean;
    totalElements: number;
    totalPages: number;
}