import {java} from 'j4ts';
import template from './TableAppView.html';
import {Template, UiField} from 'dncomponents/lib/TemplateParser';
import {IsElement} from 'dncomponents/lib/corecls/IsElement';
import {HasCellComponents} from 'dncomponents/lib/HasCellComponents';
import {Table} from 'dncomponents/lib/table/Table';
import {Person} from '../helper/Person';
import {AbstractHeaderCell, ColumnConfig, HeaderTableFilterCell} from 'dncomponents/lib/table/TableUtil';
import {Data} from '../helper/Data';
import {AutoCompleteEditor} from 'dncomponents/lib/autocomplete/AutoCompleteEditor';
import {RendererContext} from 'dncomponents/lib/BaseCell';
import {TestingHelper} from '../helper/TestingHelper';
import {FilterPanelList} from 'dncomponents/lib/table/FilterPanelList';

@Template(template)
export class TableAppView implements IsElement<any>, HasCellComponents {
    @UiField
    root: HTMLElement;
    @UiField
    table: Table<Person>;

    public constructor() {
        this.init();
    }

    private init() {
        let people: java.util.ArrayList<Person> = Data.people;
        Data.setNulls(people);
        this.table.setMultiSorting(true);
        this.table.setEditable(true);
        let nameColumn: ColumnConfig<Person, string> = new ColumnConfig<Person, string>()
            .setFieldGetter((p) => {
                return p.name;
            }).setFieldSetter((p, name) => {
                return p.name = (name);
            }).setColumnName('Name')
            .setHeaderCellFactory({getCell: () => new HeaderTableFilterCell()})
            .setColumnWidth('300px')
            .setEditable(true)
            .setClazz('string');

        let activeColumn: ColumnConfig<Person, boolean> = new ColumnConfig<Person, boolean>()
            .setFieldGetter(p => p.active)
            .setFieldSetter((p, v) => p.active = v)
            .setColumnName('Active')
            .setHeaderCellFactory({getCell: () => new HeaderTableFilterCell()})
            .setColumnWidth('150px')
            .setClazz('boolean');

        let ageColumn: ColumnConfig<Person, number> = new ColumnConfig<Person, number>()
            .setFieldGetter(p => p.age)
            .setFieldSetter((p1, p2) => p1.age = p2)
            .setColumnName('Age')
            .setHeaderCellFactory({getCell: () => new HeaderTableFilterCell()})
            .setColumnWidth('150px')
            .setClazz('integer');

        let colors: java.util.List<string> = java.util.Arrays.asList<any>(TestingHelper.colors);
        let colorColumn: ColumnConfig<Person, string> = new ColumnConfig<Person, string>()
            .setFieldGetter(p => p.currentColor)
            .setColumnName('Color')
            .setColumnWidth('250px')
            .setHeaderCellFactory({
                getCell(): AbstractHeaderCell {
                    return new HeaderTableFilterCell()
                        .setFilterPanel(new FilterPanelList(colors));
                }
            })
            .setClazz('string');
        let acEditor: AutoCompleteEditor<string> = new AutoCompleteEditor<string>(TestingHelper.getColors());
        colorColumn.setCellFactory({
            getCell(c): any {
                return c.createDefaultCell().setCellEditor(acEditor).setRenderer({
                    setValue(r: RendererContext<any, any>): void {
                        r.valuePanel.style.background = '' + r.value;
                        r.valuePanel.innerHTML = r.value + '';
                    }
                });
            }
        });
        this.table.addColumn(nameColumn, activeColumn, ageColumn, colorColumn);
        this.table.setRowsData(people);
        this.table.drawData();
    }

    public asElement(): HTMLElement {
        return this.root;
    }

    static instance: TableAppView = null;

    public static getInstance(): TableAppView {
        if (TableAppView.instance == null) TableAppView.instance = new TableAppView();
        return TableAppView.instance;
    }

    public resetScrollPosition() {
        HasCellComponents.resetAll(<any>this.table);
    }
}