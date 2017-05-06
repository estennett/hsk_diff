
var functions = {



indexSearch: function (book, word) {

  var hit, k, start, end;
  var results = [];
  var indexString;
  var hanzisep = "\u30FB";
  var indexsep = "\uFF1A";

  //find all hits for traditional characters
  hit = book.indexOf( "\n" + word + hanzisep);
  while (hit != -1) {
    start = book.indexOf(indexsep, hit) + 1;
    end = book.indexOf("\n", start);
    indexString = book.substr(start, end - start);
    results.push(parseInt(indexString));

    hit = book.indexOf( "\n" + word + hanzisep, hit+1);
  }

  //find all hits for simplified characters
  hit = book.indexOf(hanzisep + word + indexsep);
  while (hit != -1) {
    start = book.indexOf(indexsep, hit) + 1;
    end = book.indexOf("\n", start);
    indexString = book.substr(start, end - start);
    results.push(parseInt(indexString));

    hit = book.indexOf(hanzisep + word + indexsep, hit+1);
  }

  return this.getUniqueArray(results).sort();
},

wordSearch: function (word) {
  var self = this;

  //set up the dictionaries and index
  var i;

  var entryobj = {};
  entryobj.data = [];

  var rawentries = [];
  while (word.length > 0) {
    //hits = start of the lines in the dict where the entries are
      var hits = this.indexSearch(this.wordIndex, word);

    for (i = 0; i < hits.length; i++) {
      var end = this.wordDict.indexOf("\n", hits[i]) - 1;
      var entryline = this.wordDict.substr(hits[i], end - hits[i]);
      rawentries.push(entryline);
    }
    word = word.substr(0, word.length - 1);
  }

  entryobj.matchLen = 0;
  for (i = 0; i < rawentries.length; i++) {
    //set highlight length to longest match
    var hanziLen = rawentries[i].indexOf(" ");
    if (hanziLen > entryobj.matchLen)
      entryobj.matchLen = hanziLen;

    entryobj.data.push([rawentries[i], null]);
  }
  return entryobj;
},

dino : function(){console.log(this.wordDict)},

setUpDict : function() {
    var self = this;
    fs.readFile('./dict.dat', 'utf-8', function (err, data){
      if (err){
        throw err
      }
      self.wordDict = data;

      fs.readFile('./dict.idx', 'utf-8', function (err, data){
        if (err){
          throw err
        }
        self.wordIndex = data;
        // 搜素一个单词
        console.log(self.wordSearch('你好'))
      })

    });

  }//end setUpDict
}//end functions

function.
