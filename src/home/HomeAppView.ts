import template from './HomeAppView.html';
import {Template, UiField} from 'dncomponents/lib/TemplateParser';
import {IsElement} from 'dncomponents/lib/corecls/IsElement';
import {Button} from 'dncomponents/lib/button/Button';
import {TextArea} from 'dncomponents/lib/textarea/TextArea';
import {ClickHandler, MouseEnterHandler, MouseLeaveHandler, SelectionHandler} from 'dncomponents/lib/corecls/handlers';
import {RadioSelectionGroup} from 'dncomponents/lib/checkbox/Radio';
import {ItemId} from 'dncomponents/lib/corecls/entities';
import {CheckBoxSelectionGroup} from 'dncomponents/lib/checkbox/checkbox_radio';
import {Fruit} from '../helper/Fruit';

@Template(template)
export class HomeAppView implements IsElement<any> {
    private static instance: HomeAppView;

    @UiField
    root: HTMLElement;
    @UiField
    public btnPrimary: Button<any>;
    @UiField
    public btnSecondary: Button<any>;
    @UiField
    public divElement: HTMLDivElement;
    @UiField
    radioGroup: RadioSelectionGroup<ItemId>;
    @UiField
    checkBoxPanel: HTMLElement;
    @UiField
    public eventsTa: TextArea;


    public constructor() {
        this.init();
    }

    private init(): void {
        this.btnPrimary.addClickHandler(ClickHandler.onClick((evt) => this.eventsTa.setValue('button clicked')));
        this.btnPrimary.addHandler(MouseEnterHandler.onMouseEnter(() => this.eventsTa.setValue('mouse enter')));
        this.btnPrimary.addHandler(MouseLeaveHandler.onMouseLeave(() => this.eventsTa.setValue('mouse leave')));
        //div
        ClickHandler.onClick(() => this.eventsTa.setValue('div clicked')).addTo(this.divElement);
        //radio
        this.radioGroup.addSelectionHandler(SelectionHandler.onSelection(evt =>
            this.eventsTa.setValue('Selection: ' + evt.selection.getUserObject().getId())));
        //checkbox
        let checkBoxGroup: CheckBoxSelectionGroup<Fruit> = new CheckBoxSelectionGroup<any>();
        checkBoxGroup.addEntityItems(Fruit.getFruits(4));
        checkBoxGroup.getItems().forEach((e) => this.checkBoxPanel.appendChild(e.asElement()));
        checkBoxGroup.getEntitySelectionModel().addSelectionHandler(SelectionHandler.onSelection(evt => {
            this.eventsTa.setValue('');
            evt.selection.forEach(p => this.eventsTa.append(p + '\n'));
        }));
    }

    public asElement(): HTMLElement {
        return this.root;
    }

    public static getInstance(): HomeAppView {
        if (this.instance == null)
            this.instance = new HomeAppView();
        return this.instance;
    }
}