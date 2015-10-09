var fs = require('fs')
exports.load = path => {
    return fs.readdirSync(path).map(p => {
        var newPath = [path, p].join('/');
        return (fs.statSync(newPath).isDirectory()) ? web(newPath) : newPath
    }).reduce((a,b) => a.concat(b), [])
}