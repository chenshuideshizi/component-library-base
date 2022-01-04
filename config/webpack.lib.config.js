module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    entry: Path2D.resolve(__dirname,  '../packages/index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname,  '../lib'),
        libraryExport: 'default',
        libraryTarget: 'umd'
    }
})

function getEntries(path) {
    let files =  fs.readdirSync(resolve(path));
    const entries = files.reduce( (ret, item) => {
          const itemPath =`${path}/${item}`;
          const isDir =  fs.statSync(resolve(itemPath)).isDirectory();
          console.log(isDir,itemPath)
          if (isDir) {
              ret[item] = resolve(join(itemPath, 'index.js'));
          } else {
              const [name] = item.split('.');
              ret[name] = resolve(itemPath);
          }
          return ret;
    }, {})
    return entries;
  }