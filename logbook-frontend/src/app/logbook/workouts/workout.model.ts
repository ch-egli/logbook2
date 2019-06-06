export class Workout {
    datum: string;
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