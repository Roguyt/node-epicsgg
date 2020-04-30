// eslint-disable-next-line import/no-extraneous-dependencies
import resolve from 'resolve';
import path from 'path';

module.exports.interfaceVersion = 2;

module.exports.resolve = function (source, file, config) {
    if (resolve.isCore(source)) {
        return { found: true, path: null };
    }

    try {
        return { found: true, path: resolve.sync(source, opts(file, config)) };
    } catch (err) {
        return { found: false };
    }
};

function opts(file, config) {
    return Object.assign(
        {
            extensions: ['.ts', '.tsx'],
        },
        config,
        {
            // path.resolve will handle paths relative to CWD
            basedir: path.dirname(path.resolve(file)),
        }
    );
}
