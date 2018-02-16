class FuzzySearch {
  constructor(haystack = [], keys = [], options = {}) {
    if (haystack.length === 0) {
      throw new Error('We need an array containing the search list');
    }

    this.haystack = haystack;
    this.keys = keys;
    this.options = Object.assign({
      caseSensitive: false,
      sort: false,
    }, options);
  }

  search(query = '') {
    if (query === '') {
      return this.haystack;
    }

    const results = [];

    for (let i = 0; i < this.haystack.length; i++) {
      const item = this.haystack[i];

      if (this.keys.length === 0) {
        const result = FuzzySearch.isMatch(item, query, this.options.caseSensitive);

        if (result.found) {
          results.push({ item, result });
        }
      } else {
        for (let y = 0; y < this.keys.length; y++) {
          const propertyValues = Helper.getDescendantProperty(item, this.keys[y]);

          let found = false;

          for (let z = 0; z < propertyValues.length; z++) {
            const result = FuzzySearch.isMatch(propertyValues[z], query, this.options.caseSensitive);

            if (result.found) {
              found = true;

              results.push({ item, result });

              break;
            }
          }

          if (found) {
            break;
          }
        }
      }
    }

    if (this.options.sort) {
      results.sort((a, b) => a.result.score - b.result.score);
    }

    //return results.map(result => result.item);
    return results;
  }

  static isMatch(item, query, caseSensitive) {
    const GRAM_LENGTH = 3;
    const orgItem = item;
    let result = (found, score = null, location = null, snippet = null) => { return { found, score, location, snippet } }


    if (! caseSensitive) {
      item = item.toLocaleLowerCase();
      query = query.toLocaleLowerCase();
    }

    let ngrams = []
    for (var i = 0; i <= query.length - GRAM_LENGTH; i++) {
        ngrams.push(query.substr(i, GRAM_LENGTH));
    }
    //console.log('ngrams', ngrams);

    const indexes = [];
    let index = 0;

    for (let ngram of ngrams) {
      index = item.indexOf(ngram, index);

      if (index === -1) {
        return result(false);
      }

      indexes.push(index);

      index++;
    }

    let score = 1;
    if (item !== query) {
        //score = indexes.reduce((s, i, ii, a) => s + i - (a[ii] || 0), 2);
        score = indexes.reduce((s, i, ii, a) => s + i - (a[ii-1] || a[0]), -indexes.length+2);
    }

    index = indexes[0];
    const snippetLength = 80;
    let snippet = orgItem.substr(Math.max(0, index-snippetLength/4), snippetLength);
    while (snippet.length > snippetLength-10 && snippet.charAt(snippet.length-1) != ' ') {
        snippet = snippet.substr(0, snippet.length-1);
    }

    console.log(query);
    console.log(score);
    console.log(indexes);
    console.log(snippet);
    //console.log(item);
    console.log();

    return result(true, score,  index, snippet);
  }

  static isMatchDumb(item, query, caseSensitive) {
    if (! caseSensitive) {
      item = item.toLocaleLowerCase();
      query = query.toLocaleLowerCase();
    }

    const letters = query.split('');
    const indexes = [];

    let index = 0;
    let result = (found, score = null, location = null, snippet = null) => { return { found, score, location, snippet } }

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];

      index = item.indexOf(letter, index);

      if (index === -1) {
        return result(false);
      }

      indexes.push(index);

      index++;
    }

    let score = 1;
    if (item !== query) {
        //score = indexes.reduce((s, i, ii, a) => s + i - (a[ii] || 0), 2);
        score = indexes.reduce((s, i, ii, a) => s + i - (a[ii-1] || a[0]), -indexes.length+2);
    }
    index = indexes[0];
    const snippetLength = 40;
    const snippet = item.substr(index-snippetLength/2, snippetLength);


    return result(true, score,  index, snippet);
  }
}
