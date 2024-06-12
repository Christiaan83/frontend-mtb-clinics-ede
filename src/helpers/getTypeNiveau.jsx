export function getTypeNiveau() {

const routeTypes = [
    {value:"ADULT", label: "Volwassene"},
    {value: "CHILD", label: "Kind" }
];
const difficulties = [
    {value: "EASY", label: "Makkelijk"},
    {value: "MODERATE", label: "Gemiddeld"},
    {value: "DIFFICULT", label: "Moeilijk"}
];

return {routeTypes, difficulties};
}

