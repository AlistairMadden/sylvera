export type Status = "Registration requested" | "Under development" | "Under validation";
export type Country = "China" | "India" | "Italy" | "Malawi" | "Myanmar" | "Nigeria" | "Rwanda" | "South Africa" | "Tanzania";
export type Project = {
    id: string;
    url: string;
    status: Status;
    country: Country;
};