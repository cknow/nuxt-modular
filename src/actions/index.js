import Alias from './alias';
import Layouts from './layouts';
import Middleware from './middleware';
import Modules from './modules';
import Pages from './pages';
import Plugins from './plugins';
import Router from './router';
import Static from './static';
import Store from './store';

export default class Actions {
    static run(modular) {
        Alias.run(modular);
        Layouts.run(modular);
        Middleware.run(modular);
        Modules.run(modular);
        Pages.run(modular);
        Plugins.run(modular);
        Router.run(modular);
        Static.run(modular);
        Store.run(modular);
    }
}
