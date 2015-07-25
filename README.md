# edgelist2binary

Converts edge list graph format into ngraph's binary representation

# usage

Let's say you have a file `edges.txt` written as an [edge list](https://github.com/anvaka/ngraph.toedgelist/blob/master/README.md#edge-list-as-a-string)

``` js
var toBinary = require('edgelist2binary');
toBinary('edges.txt');
```

This command will use streaming approach and transform the entire file into
dense [ngraph binary](https://github.com/anvaka/ngraph.tobinary) format.

You can also pass optional second argument, and it will be forwarded to
`ngraph.tobinary`:

``` js
toBinary('edges.txt', {
  outDir: '/temp' // save to temp folder
});
```

**NOTE:** For large graphs with millions nodes, make sure to increase
max memory for node:

```
node --max-old-space-size=6144 [your serializer file name.js]
```

# install

With [npm](https://npmjs.org) do:


```
npm install edgelist2binary
```

# license

MIT
