let loadData = fetch("assets/js/search.json");
let dataFile = null, data = null;

async function search(words) {
    'use strict';
    if (!dataFile) {
        dataFile = await loadData;
        data = await dataFile.json();
    }

    return new FuzzySearch(data, ['content', 'title'], { sort: true }).search(words);
};
