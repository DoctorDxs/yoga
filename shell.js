const shell = require('shelljs');

shell.echo('                    ')
shell.echo('******************************************************')
console.log('start   at ' + new Date())
shell.echo('******************************************************')


shell.exec('npm run build')

shell.cd('E:\\Project\\yoyaH5\\public\\dist')

shell.exec('svn cleanup')

shell.exec('svn delete * --force')

shell.exec('svn update --force')

shell.exec('svn commit -m "delete"')

shell.cp ('-r', 'E:\\Project\\yoga\\dist\\*', 'E:\\Project\\yoyaH5\\public\\dist')

shell.exec('svn add * --force')

shell.exec('svn add *.html --force')

shell.cd('E:\\Project\\yoyaH5\\public\\dist\\static\\js')

shell.exec('svn add *.js --force')

shell.cd('E:\\Project\\yoyaH5\\public\\dist')

shell.exec('svn commit -m "updated"')

shell.echo('                    ')
shell.echo('******************************************************')
console.log('fished   at ' + new Date())
shell.echo('******************************************************')


  



