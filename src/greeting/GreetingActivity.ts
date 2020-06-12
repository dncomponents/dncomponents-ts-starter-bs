import {AbstractActivity} from 'dncomponents/lib/appview/AbstractActivity';
import {GreetingPlace} from './GreetingPlace';
import {GreetingPresenter, GreetingView} from './GreetingView';

export class GreetingActivity extends AbstractActivity<GreetingView, GreetingPlace> implements GreetingPresenter {

    public constructor(view: GreetingView, place: GreetingPlace) {
        super(view, place);
    }

    public onNameEntered(name: string): void {
        if (name == null || name.length == 0 || name.length < 4)
            this.view.setError('Name must be at least 4 characters long!');
        else {
            this.view.setError('');
            this.view.setName('Hello ' + name + '!');
        }
    }
}