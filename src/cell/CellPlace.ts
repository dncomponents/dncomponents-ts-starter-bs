import {AbstractActivity} from 'dncomponents/lib/appview/AbstractActivity';
import {DefaultActivity} from 'dncomponents/lib/appview/DefaultActivity';
import {Place, PlaceRegister} from 'dncomponents/lib/appview/Place';
import {TreeAppView} from './TreeAppView';
import {TableAppView} from './TableAppView';
import {ListAppView} from './ListAppView';


export class CellPlace extends Place {
    type = CellPlaceType.TABLE;
}

export enum CellPlaceType {
    TABLE = 'TABLE', TREE = 'TREE', LIST = 'LIST'
}

export class CellPlaceRegister extends PlaceRegister<CellPlace> {

    public static instance: CellPlaceRegister = new CellPlaceRegister();

    private constructor() {
        super();
    }

    type = CellPlaceType.TABLE;

    private static TOKEN = 'cell';

    public getHistoryToken(): string {
        return CellPlaceRegister.TOKEN;
    }


    public getPlaceFromToken(token: string): CellPlace {
        let tp = new CellPlace();
        let typeString = token.substring(token.indexOf(PlaceRegister.DIVIDER) + 1);
        // @ts-ignore
        let type = CellPlaceType[typeString];
        if (type != null)
            tp.type = type;
        return tp;
    }

    public getTokenFromPlace(place: CellPlace): string {
        return CellPlaceRegister.TOKEN;
    }

    public getActivity(place: CellPlace): AbstractActivity<any, any> {
        switch (place.type) {
            case CellPlaceType.TABLE:
                return new DefaultActivity(TableAppView.getInstance(), place);
            case CellPlaceType.TREE:
                return new DefaultActivity(TreeAppView.getInstance(), place);
            case CellPlaceType.LIST:
                return new DefaultActivity(ListAppView.getInstance(), place);
            default:
                return new DefaultActivity(TableAppView.getInstance(), place);
        }
    }

    public forPlace(): string {
        return CellPlace.name;
    }
}