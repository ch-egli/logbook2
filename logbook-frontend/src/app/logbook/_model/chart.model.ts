export interface ChartMetaType {
    chartData: Map<string, any[]>;
    labels: any[];
    wettkaempfe: Wettkampf[];
}

export interface Wettkampf {
    datum: Date;
    beschreibung: string;
    abkuerzung: string;
    disziplin: string;
    kategorie: string;
    benutzer: string;
}

export interface BarChartData {
    data: number[];
    labels: string[];
}
