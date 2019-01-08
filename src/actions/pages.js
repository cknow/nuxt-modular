import { createRoutes } from '@nuxt/common';

export default class Pages {
    static run(modular) {
        const options = modular.options;

        if (!modular.isDirectory(options.dir.pages)) {
            modular.logger.debug(`Modular \`${modular.name}\` no pages directory`);

            return;
        }

        const files = {};

        modular.getFiles(options.dir.pages, options.supportedExtensions).forEach(file => {
            const key = file.replace(new RegExp(`\\.(${options.supportedExtensions.join('|')})$`, 'u'), '');

            if (/\.vue$/u.test(file) || !files[key]) {
                files[key] = file.replace(/(['"])/gu, '\\$1');
            }
        });

        if (files.length < 1) {
            modular.logger.debug(`Modular \`${modular.name}\` no pages`);

            return;
        }

        const parseRoutes = routes => {
            routes = routes.filter(route => !route.path.includes('@'));

            if (!options.namespace && !options.prefix) {
                return routes;
            }

            routes.forEach(r => {
                if (options.namespace && r.name) {
                    r.name = `${options.namespace}${options.router.routeNameSplitter}${r.name}`;
                }

                if (options.prefix && r.path) {
                    r.path = `/${options.prefix}${(r.path === '/' ? '' : r.path)}`;
                }

                if (options.prefix && r.chunkName) {
                    r.chunkName = `${options.prefix}/${r.chunkName}`;
                }

                if (r.children) {
                    r.children = parseRoutes(r.children);
                }
            });

            return routes;
        };

        modular.moduleContainer.extendRoutes(routes => {
            const r = createRoutes(
                Object.values(files),
                modular.modularPath,
                options.dir.pages,
                options.router.routeNameSplitter
            );

            routes.unshift(...parseRoutes(r));
        });
    }
}
