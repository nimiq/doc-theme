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

    return results;
  }

  // ngram based search
  static isMatch(item, query, caseSensitive = false) {
    const GRAM_LENGTH = 3,
          SNIPPET_LENGTH = 80,
          orgItem = item;
    let result = (found, score, location, snippet) => { return { found, score, location, snippet } }

    if (!caseSensitive) {
      item = item.toLocaleLowerCase();
      query = query.toLocaleLowerCase();
    }

    // ngrams
    let ngrams = []
    for (var i = 0; i <= query.length - GRAM_LENGTH; i++) {
        ngrams.push(query.substr(i, GRAM_LENGTH));
    }

    // search
    const indexes = [];
    let index = 0;
    for (let ngram of ngrams) {
      index = item.indexOf(ngram, index);
      if (index === -1) return result(false);
      indexes.push(index++);
    }

    // scoring
    let score = 1;
    if (item !== query) {
        score = indexes.reduce((s, i, ii, a) => s + i - (a[ii-1] || a[0]), -indexes.length+2);
    }

    // snippet
    index = indexes[0];
    let snippet = orgItem.substr(Math.max(0, index-SNIPPET_LENGTH/4), SNIPPET_LENGTH);
    while (snippet.length > SNIPPET_LENGTH-10 && snippet.charAt(snippet.length-1) != ' ') {
        snippet = snippet.substr(0, snippet.length-1);
    }

    return result(true, score, index, snippet);
  }
}
