var fs = require('fs')

var searchString = "的毛泽东发生冲突。在林彪阴谋败露后，四人帮成为新的重要政治势力，中华人民共和国政治进一步混乱，故毛泽东重新起用邓小平出任第一副总理，重掌国务院以起相互牵制作用。1976年，周恩来、朱德、毛泽东先后去世；其后四人帮在怀仁堂事变中被逮捕，国务院总理华国锋接替毛泽东的领导地位，出任中国共产党中央委员会主席，成为最高领导人。尽管华国锋停止文革中的文攻武斗等混乱局势"

// var searchString = "我的名字叫小红，今年五岁了。我有一个爱我的妈妈，和一个爱我的爸爸。我小的时候，妈妈和我们住在一起。妈妈和我一起玩，一起睡，我很高兴。"
var hskFiles = ['level_1.txt', 'level_2.txt', 'level_3.txt', 'level_4.txt', 'level_5.txt', 'level_6.txt']

//search searchString for each Level
level6String = searchLevel(hskFiles[5], 6, searchString)
level5String = searchLevel(hskFiles[4], 5, level6String)
level4String = searchLevel(hskFiles[3], 4, level5String)
level3String = searchLevel(hskFiles[2], 3, level4String)
level2String = searchLevel(hskFiles[1], 2, level3String)
var finalizedString = searchLevel(hskFiles[0], 1, level2String)

fs.writeFile("./index.html", '<html><head><meta charset="utf8"></meta><link rel="stylesheet" href="css.css"></link></head><body><div>' + finalizedString + '</div></body></html>', 'utf8', function(err){
	if(err){
		console.log("big problem")
	}
	console.log("file written")
})

function searchLevel(level, levelNumber, string){
  var iterateString = string;
	var matchedWord = 0;
  var hskDictArray = fs.readFileSync(level).toString().split("\r\n");
	hskDictArray.pop() //get rid of that last empty bit on the array
  var index = 0;

  for(var i = 0; i < hskDictArray.length; i++){
    var stringIndex = iterateString.indexOf(hskDictArray[i])
		if(stringIndex > -1){ console.log(i + ': first string index: ' + stringIndex + ' :' + hskDictArray[i])}
    if (stringIndex > 0){
			matchedWord++;
      var $el = "<span class=level_" + levelNumber + ">" + hskDictArray[i] + "</span>"
			iterateString = iterateString.slice(0, stringIndex) + $el + iterateString.slice(stringIndex + hskDictArray[i].length);
			}

			var stringIndex2 = iterateString.indexOf(hskDictArray[i], stringIndex + 20 + hskDictArray[i].length )
			if(stringIndex2 > -1){
				matchedWord++;
				var $el = "<span class=level_" + levelNumber + ">" + hskDictArray[i] + "</span>"
				iterateString = iterateString.slice(0, stringIndex2) + $el + iterateString.slice(stringIndex2 + hskDictArray[i].length);
				console.log('matched another one')
			}
		}
	console.log("hsk " + levelNumber + " words: " + matchedWord);
  return iterateString;
}
