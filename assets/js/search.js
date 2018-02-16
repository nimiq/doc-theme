let loadData = fetch("/search.json");
let dataFile = null, data = null;

async function search(words) {
    'use strict';
    if (!dataFile) {
        dataFile = await loadData;
        data = await dataFile.json();
    }

    let results = new FuzzySearch(data,['content', 'title'], { sort: true }).search(words);

    console.log(`Found ${results.length} results.`);
    return results;
};
