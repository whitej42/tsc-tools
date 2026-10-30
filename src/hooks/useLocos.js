import ap   from '../data/locomotives/ap.json';
import dtg  from '../data/locomotives/dtg.json';
import jt   from '../data/locomotives/jt.json';
import misc from '../data/locomotives/misc.json';

const locos = [
    ...ap.dlcPacks,
    ...dtg.dlcPacks,
    ...jt.dlcPacks,
    ...misc.dlcPacks,
];

export function useLocos() {
    return { locos, loading: false, error: null };
}
