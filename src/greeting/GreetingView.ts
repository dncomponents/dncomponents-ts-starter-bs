import {IsElement} from 'dncomponents/lib/corecls/IsElement';
import {GreetingActivity} from './GreetingActivity';
import {HasPresenter} from 'dncomponents/lib/appview/HasPresenter';
import {Presenter} from 'dncomponents/lib/appview/Presenter';

export interface GreetingView extends IsElement<any>, HasPresenter<GreetingActivity> {

    setName(name: string): void;

    setError(error: string): void;
}

export interface GreetingPresenter extends Presenter {
    onNameEntered(name: string): void;
}