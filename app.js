var fs = require('fs')
var csv = require('csv')

var desktopPath = '/Users/souadassaad/Desktop'
var path = desktopPath + '/bla/MOG'

var web = path => {
  return fs.readdirSync(path).map(x => {
    var newPath = [path, x].join('/')
    if (fs.statSync(newPath).isDirectory()) return web(newPath)
    else return newPath
  }).reduce((a,b) => a.concat(b), [])
}
w = web(path).map(x => x.replace(path + '/', ''))

var file = fs.readFileSync(desktopPath + '/input-simple-mog-2.csv', 'utf-8')

csv.parse(file, (err, input) => {
  map = input.map(i => {
    return [i[0], w.filter(f => {
        big = f.toLowerCase().replace(/\.jpg/gi, '')
        small = i[1].toLowerCase().replace(/\.jpg/gi, '')
        return big.indexOf(small) != -1
    })]
  }).map(x => {
    return [x[0], x[1].sort((a,b) => /\-2\.jpg/gi.test(b) ? 1 : -1)]
  }).map(x => {
    return x[1].map(y => [x[0], y])
  }).reduce((a,b) => a.concat(b), [])
  csv.stringify(map, (err, string) => fs.writeFile(desktopPath + '/output-simple-mog-2.csv', string, (err, resp) => console.log('DONE.')))
})
