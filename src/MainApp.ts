import template from './MainApp.html';
import {Template, TemplateParser, UiField} from 'dncomponents/lib/TemplateParser';
import {AcceptsOneElement} from 'dncomponents/lib/appview/AcceptsOneElement';
import {IsElement} from 'dncomponents/lib/corecls/IsElement';
import {PlaceManager} from 'dncomponents/lib/appview/PlaceManager';
import {SideMenu} from 'dncomponents/lib/sidemenu/SideMenu';
import {ItemId} from 'dncomponents/lib/corecls/entities';
import {HomePlace, HomePlaceRegister} from './home/HomePlace';
import {GreetingPlaceRegister} from './greeting/GreetingPlace';
import {CellPlaceRegister} from './cell/CellPlace';
import {HasCellComponents} from 'dncomponents/lib/HasCellComponents';

@Template(template, MainApp.parser)
export class MainApp implements AcceptsOneElement, IsElement<any> {

    @UiField
    sideHolder: HTMLElement;
    @UiField
    contentWrapper: HTMLElement;
    private placeManager = new PlaceManager(this);
    @UiField
    private side: SideMenu<ItemId>;
    private static parser: TemplateParser;

    public constructor() {
        this.side.setPlaceManager(this.placeManager);
        this.side.expandAll(false);
        this.placeManager.register(CellPlaceRegister.instance);
        this.placeManager.register(GreetingPlaceRegister.instance);
        this.placeManager.register(HomePlaceRegister.instance);
        this.placeManager.setHomePlace(HomePlace.name);
    }

    private static isHasCellComponents(el: any) {
        return (el && 'resetScrollPosition' in el);
    }

    public setElement(element: IsElement<any>): void {
        this.contentWrapper.innerHTML = '';
        this.contentWrapper.appendChild(element.asElement());
        if (MainApp.isHasCellComponents(element)) {
            (<HasCellComponents><unknown>element).resetScrollPosition();
        }
    }

    asElement(): Node {
        return MainApp.parser.getCloned();
    }
}