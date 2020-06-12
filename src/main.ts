import {BootstrapUi} from 'dncomponents-ui-bs/lib/BootstrapUi';
import {Ui} from 'dncomponents/lib/views/Ui';
Ui.implementation = new BootstrapUi();
import {MainApp} from './MainApp';
import {History} from 'dncomponents/lib/appview/History';

History.init();
let mainApp: MainApp = new MainApp();
document.body.append(mainApp.asElement());
History.fireCurrentHistoryState();