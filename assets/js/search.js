async function search(words) {
    'use strict';
    console.log(`searching "${words}"...`);
    let dataFile = await fetch("/search.json");
    let data = await dataFile.json();

    let results = new FuzzySearch(data,['content', 'title'], { sort: true }).search(words);

    console.log('Results', results);
    return results;
};

console.log("xxx");
