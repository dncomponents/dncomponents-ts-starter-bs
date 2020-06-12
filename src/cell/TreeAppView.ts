import template from './TreeAppView.html';
import {Template, UiField} from 'dncomponents/lib/TemplateParser';
import {IsElement} from 'dncomponents/lib/corecls/IsElement';
import {Tree} from 'dncomponents/lib/tree/Tree';
import {Fruit} from '../helper/Fruit';
import {SelectionHandler} from 'dncomponents/lib/corecls/handlers';
import {TextArea} from 'dncomponents/lib/textarea/TextArea';

@Template(template)
export class TreeAppView implements IsElement<any> {
    @UiField
    root: HTMLElement;
    @UiField
    tree: Tree<any>;
    @UiField
    logTa: TextArea;

    public constructor() {
        this.init();
    }


    private init() {
        this.tree.setRoot(Fruit.getFruitsTree());
        this.tree.drawData();
        this.tree.getSelectionModel().addSelectionHandler(SelectionHandler.onSelection(evt => {
            this.logTa.setValue('');
            evt.selection.forEach(p => this.logTa.append(p.getUserObject() + '\n'));
        }));
    }

    public asElement(): HTMLElement {
        return this.root;
    }

    static instance: TreeAppView = null;

    public static getInstance(): TreeAppView {
        if (TreeAppView.instance == null) TreeAppView.instance = new TreeAppView();
        return TreeAppView.instance;
    }

}