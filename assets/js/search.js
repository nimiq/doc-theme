let loadData, dataFile, data;

async function searchInit(url) {
    loadData = fetch(url);
}

async function search(words) {
    'use strict';
    if (!dataFile) {
        dataFile = await loadData;
        data = await dataFile.json();
    }

    return new FuzzySearch(data, ['content', 'title'], { sort: true }).search(words);
};
