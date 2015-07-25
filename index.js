var fs = require('fs');
var byline = require('byline');
var save = require('ngraph.tobinary');

module.exports = convertFile;

function convertFile(fileName, options) {
    var stream = fs.createReadStream(fileName, {
        encoding: 'utf8'
    });
    var graph = require('ngraph.graph')({
        uniqueLinkId: false
    });
    stream = byline.createStream(stream);
    var processed = 0;

    stream.on('data', function(line) {
        if (line[0] === '#') return; // comments

        var parts = line.split('\t');
        if (parts.length === 2) {
            graph.addLink(parts[0], parts[1]);
        } else if (parts.length === 1) {
            graph.addNode(parts[0]);
        }
        processed += 1;
        if (0 === processed % 100000) {
            console.log('Processed ' + processed + ' records');
        }
    }).on('end', function() {
        console.log('Saving ' + graph.getLinksCount() + ' edges; ' +
            graph.getNodesCount() + ' nodes');
        save(graph, options);
        console.log('Done');
    });
}
