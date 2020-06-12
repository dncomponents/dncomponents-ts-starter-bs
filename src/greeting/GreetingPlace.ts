import {Place, PlaceRegister} from 'dncomponents/lib/appview/Place';
import {AbstractActivity} from 'dncomponents/lib/appview/AbstractActivity';
import {GreetingViewImpl} from './GreetingViewImpl';
import {GreetingActivity} from './GreetingActivity';

export class GreetingPlace extends Place {

}

export class GreetingPlaceRegister extends PlaceRegister<GreetingPlace> {

    public static instance: GreetingPlaceRegister = new GreetingPlaceRegister();

    private constructor() {
        super();
    }

    private static TOKEN = 'greeting';

    public getHistoryToken(): string {
        return GreetingPlaceRegister.TOKEN;
    }

    public getPlaceFromToken(token: string): GreetingPlace {
        return new GreetingPlace();
    }

    public getTokenFromPlace(place: GreetingPlace): string {
        return GreetingPlaceRegister.TOKEN;
    }

    public getActivity(place: GreetingPlace): AbstractActivity<any, any> {
        return new GreetingActivity(GreetingViewImpl.getInstance(), place);
    }

    public forPlace(): string {
        return GreetingPlace.name;
    }

}