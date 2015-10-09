var fs = require('fs')
var csv = require('csv')

var desktopPath = '/Users/souadassaad/Desktop'

var inputConfig = fs.readFileSync(desktopPath + '/input-config-mog-2.csv', 'utf-8')
var outputSimple = fs.readFileSync(desktopPath + '/output-simple-mog-2.csv', 'utf-8')

csv.parse(inputConfig, (err,resp) => {
  if (err) throw err
  var inputConfig = resp.map(x => [x[0], x[0].replace('_config', '')])
  csv.parse(outputSimple, (err,resp) => {
    if (err) throw err
    var outputSimple = resp
    map = inputConfig.map(i => {
      var filter = outputSimple.filter(s => parseInt(s[0]) == parseInt(i[1]))
      return filter.length > 0 ? [i[0], filter[0][1]] : [i[0], null]
    }).map(el => {
      if (el[1]) {
        im = fs.readFileSync(desktopPath + '/bla/MOG' + '/' + el[1])
        var newName = 'config/' + el[0] + '.jpg'
        fs.writeFileSync(desktopPath + '/bla/MOG'+ '/' + newName , im)
        return [el[0], newName]
      } else return [el[0], newName]
    })
    csv.stringify(map, (err, string) => fs.writeFile(desktopPath + '/output-config-mog-2.csv', string, (err, resp) => console.log('DONE.')))
  })
})
