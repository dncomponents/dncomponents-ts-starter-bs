import {AbstractView} from 'dncomponents/lib/appview/AbstractView';
import {Template, UiField} from 'dncomponents/lib/TemplateParser';
import {Button} from 'dncomponents/lib/button/Button';
import {ClickHandler, OnBlurHandler} from 'dncomponents/lib/corecls/handlers';
import {TextBox} from 'dncomponents/lib/textbox/TextBox';
import {Popover} from 'dncomponents/lib/popover/Popover';
import {ValueChangeHandler} from 'dncomponents/lib/corecls/ValueClasses';
import {GreetingActivity} from './GreetingActivity';
import {GreetingView} from './GreetingView';
import template from './GreetingViewImpl.html';

@Template(template)
export class GreetingViewImpl extends AbstractView<GreetingActivity> implements GreetingView {

    private static instance: GreetingViewImpl;
    @UiField
    root: HTMLElement;
    @UiField
    nameLabel: HTMLHeadingElement;
    @UiField
    button: Button<any>;
    @UiField
    nameField: TextBox;
    @UiField
    errorLabel: HTMLElement;
    @UiField
    popover: Popover<any>;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.button.addClickHandler(ClickHandler.onClick(e => this.onNameEntered()));
        this.nameField.addValueChangeHandler(ValueChangeHandler.onValueChange(() => this.onNameEntered()));
        this.nameField.addHandler(OnBlurHandler.onBlur(() => this.popover.hide()));
    }

    onNameEntered(): void {
        this.presenter.onNameEntered(this.nameField.getValue());
    }

    asElement(): HTMLElement {
        return this.root;
    }


    setName(name: string): void {
        this.nameLabel.textContent = name;
    }


    setError(error: string): void {
        if (error.length != 0) {
            this.popover.setTitle('Error');
            this.popover.setContent(error);
            this.nameField.setFocus(true);
            this.popover.show();
        }
        this.errorLabel.textContent = error;
    }

    static getInstance(): GreetingViewImpl {
        if (this.instance == null) this.instance = new GreetingViewImpl();
        return this.instance;
    }

}
