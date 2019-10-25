export default function(options) {
    return {
        configFile: 'modular.config.js',
        dir: {
            ...{ modular: 'modular' },
            ...options.dir
        },
        exclude: [],
        extensions: options.extensions,
        supportedExtensions: options.supportedExtensions === undefined ?
            ['vue', 'js', 'ts'] :
            options.supportedExtensions,
        ignore: options.ignore,
        modules: [],
        plugins: [],
        render: {
            static: options.render.static
        },
        router: {
            routeNameSplitter: options.router.routeNameSplitter === undefined ?
                '-' :
                options.router.routeNameSplitter,
            dir: 'router'
        }
    };
}
