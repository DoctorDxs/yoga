const shell = require('shelljs');

shell.echo('                    ')
shell.echo('******************************************************')
console.log('start   at ' + new Date())
shell.echo('******************************************************')


shell.exec('npm run build')

shell.cd('C:\\Users\\zhulihulian\\Desktop\\yogaH5\\public\\dist')

shell.exec('svn cleanup')

shell.exec('svn delete * --force')

shell.exec('svn update --force')

shell.exec('svn commit -m "delete"')

shell.cp ('-r', 'C:\\Users\\zhulihulian\\Desktop\\yoga\\dist\\*', 'C:\\Users\\zhulihulian\\Desktop\\yogaH5\\public\\dist')

shell.exec('svn add * --force')

shell.exec('svn add *.html --force')

shell.cd('C:\\Users\\zhulihulian\\Desktop\\yogaH5\\public\\dist\\static\\js')

shell.exec('svn add *.js --force')

shell.cd('C:\\Users\\zhulihulian\\Desktop\\yogaH5\\public\\dist')

shell.exec('svn commit -m "updated"')

shell.echo('                    ')
shell.echo('******************************************************')
console.log('fished   at ' + new Date())
shell.echo('******************************************************')


  



