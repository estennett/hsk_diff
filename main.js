var fs = require('fs')

var functions = {

getUniqueArray: function(arr) {
	var a = [];
    var l = arr.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (arr[i] === arr[j])
          j = ++i;
      }
      a.push(arr[i]);
    }
    return a;
},

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


var searchString = "的毛泽东发生冲突。在林彪阴谋败露后，四人帮成为新的重要政治势力，中华人民共和国政治进一步混乱，故毛泽东重新起用邓小平出任第一副总理，重掌国务院以起相互牵制作用。1976年，周恩来、朱德、毛泽东先后去世；其后四人帮在怀仁堂事变中被逮捕，国务院总理华国锋接替毛泽东的领导地位，出任中国共产党中央委员会主席，成为最高领导人。尽管华国锋停止文革中的文攻武斗等混乱局势"
var hskFiles = ['level_1.txt', 'level_2.txt', 'level_3.txt', 'level_4.txt', 'level_5.txt', 'level_6.txt']

level5String = searchLevel(hskFiles[5], 6, searchString)
console.log(searchLevel(hskFiles[4],5, level5String))

function searchLevel(level, levelNumber, string){
  var initString = string;
  var resultString = "";

  //read hsk file level
  var hskDictArray = fs.readFileSync(level).toString().split("\r\n");

  //look through
  var index = 0;
  for(var i = 0; i < hskDictArray.length; i++){
		console.log("init string: " + initString);
		console.log("init string: " + resultString);
    var stringIndex = initString.indexOf(hskDictArray[i])
    if (stringIndex > 0){
      var $el = "<span class=level_" + levelNumber + ">" + hskDictArray[i] + "</span>"
      resultString =  resultString + initString.slice(0, stringIndex) + $el;
      initString = initString.slice(stringIndex + hskDictArray[i].length)
    }
  }
  return resultString;
}


// functions.setUpDict()
