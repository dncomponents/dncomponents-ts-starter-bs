import template from './ListAppView.html';
import {Template, UiField} from 'dncomponents/lib/TemplateParser';
import {IsElement} from 'dncomponents/lib/corecls/IsElement';
import {SelectionHandler} from 'dncomponents/lib/corecls/handlers';
import {TextArea} from 'dncomponents/lib/textarea/TextArea';
import {ItemId} from 'dncomponents/lib/corecls/entities';
import {ListData} from 'dncomponents/lib/list/ListData';
import {Person} from '../helper/Person';
import {Data} from '../helper/Data';
import {RendererContext} from 'dncomponents/lib/BaseCell';
import {HasCellComponents} from 'dncomponents/lib/HasCellComponents';

@Template(template)
export class ListAppView implements IsElement<any>, HasCellComponents {
    @UiField
    root: HTMLElement;
    @UiField
    list: ListData<ItemId, string>;
    @UiField
    @UiField
    listPeople: ListData<Person, string>;
    @UiField
    logTa: TextArea;
    @UiField
    logTa2: TextArea;

    public constructor() {
        this.init();
    }

    private init() {
        this.list.getSelectionModel().addSelectionHandler(SelectionHandler.onSelection(evt => {
            this.logTa.setValue('');
            evt.selection.forEach(p => this.logTa.append(p.id + '\n'));
        }));

        this.listPeople.getRowCellConfig().setFieldGetter(p => p.name);
        this.listPeople.getRowCellConfig().getCellBuilder().setCellRenderer({
            setValue(r: RendererContext<Person, string>) {
                r.valuePanel.innerHTML = '<b>' + r.value + '</b>';
            }
        });
        this.listPeople.getSelectionModel().addSelectionHandler(SelectionHandler.onSelection(evt => {
            this.logTa2.setValue('');
            evt.selection.forEach(p => this.logTa2.append(p.name + ' ' + p.age + '\n'));
        }));
        this.listPeople.setRowsData(Data.people);
        this.listPeople.drawData();
    }

    public asElement(): HTMLElement {
        return this.root;
    }

    static instance: ListAppView = null;

    public static getInstance(): ListAppView {
        if (ListAppView.instance == null) ListAppView.instance = new ListAppView();
        return ListAppView.instance;
    }

    public resetScrollPosition() {
        HasCellComponents.resetAll(<any>this.listPeople, <any>this.list);
    }

}