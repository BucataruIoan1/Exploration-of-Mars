export interface Character {
    name: string,
    type: string,
    avatar: string,
    canExplore: boolean;
    canHeal: boolean;
    canRepairArmour: boolean;
    hp: number;
    armour: number;
    position?: { row: number; col: number };
}