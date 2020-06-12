import {HomeAppView} from './HomeAppView';
import {Place, PlaceRegister} from 'dncomponents/lib/appview/Place';
import {AbstractActivity} from 'dncomponents/lib/appview/AbstractActivity';
import {DefaultActivity} from 'dncomponents/lib/appview/DefaultActivity';

export class HomePlace extends Place {

}

export class HomePlaceRegister extends PlaceRegister<HomePlace> {

    public static instance: HomePlaceRegister = new HomePlaceRegister();

    private constructor() {
        super();
    }

    private static TOKEN = 'home';

    public getHistoryToken(): string {
        return HomePlaceRegister.TOKEN;
    }

    public getPlaceFromToken(token: string): HomePlace {
        return new HomePlace();
    }

    public getTokenFromPlace(place: HomePlace): string {
        return HomePlaceRegister.TOKEN;
    }

    public getActivity(place: HomePlace): AbstractActivity<any, any> {
        return new DefaultActivity(HomeAppView.getInstance(), place);
    }

    public forPlace(): string {
        return HomePlace.name;
    }

}