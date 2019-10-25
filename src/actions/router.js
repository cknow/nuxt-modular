export default class Router {
    static run(modular) {
        const options = modular.options;

        if (!modular.isDirectory(options.router.dir)) {
            modular.logger.debug(
                `Modular \`${modular.name}\` no routes directory`
            );

            return;
        }

        const files = {};
        const routeList = [];

        modular
            .getFiles(options.router.dir, options.supportedExtensions)
            .forEach(file => {
                const key = file.replace(
                    new RegExp(
                        `\\.(${options.supportedExtensions.join('|')})$`,
                        'u'
                    ),
                    ''
                );

                if (/\.vue$/u.test(file) || !routeList[key]) {
                    const routes = require(`${modular.modularPath}/${key}`)
                        .default;
                    routeList.push(...routes);

                    files[key] = file.replace(/(['"])/gu, '\\$1');
                }
            });

        if (routeList.length < 1) {
            modular.logger.debug(`Modular \`${modular.name}\` no routes`);

            return;
        }

        modular.moduleContainer.extendRoutes((routes, resolve) => {
            routeList.map(route =>
                routes.push({
                    ...route,
                    component: resolve(modular.modularPath, route.component)
                })
            );
        });
    }
}
