import { natures } from '../data/natures';

interface Nature {
    id: number;
    name: string;
    increase: string | null;
    decrease: string | null;
}

export const getNatures = (): Nature[] => {
    return natures.map(({name, increase, decrease}, i) => ({
        id: i + 1,
        name,
        increase,
        decrease,
    }));
}