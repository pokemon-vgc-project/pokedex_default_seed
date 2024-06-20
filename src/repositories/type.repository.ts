import { pkmTypes, typeChart, DamageTaken } from '../data/typechart';

export interface Type {
    id: number;
    name: string;
}


export const getTypes = ():Type[] => {
    const types: Type[] = [];
    let index = 1;
    for (const type in typeChart) {
        types.push({
            id: index,
            name: type,
        });
        index++;
    }
    return types;
}


export const getTypeMap = ():Map<pkmTypes, number> => {
    const types = getTypes();
    const typeMap = new Map();
    types.forEach((type) => typeMap.set(type.name.toLocaleLowerCase(), type.id));
    return typeMap;
}

export const getDamageTakenByType = (type: Type):Partial<DamageTaken> => {
    const typeKey = type.name.toLocaleLowerCase() as pkmTypes;
    return typeChart[typeKey]?.damageTaken ?? {};
}