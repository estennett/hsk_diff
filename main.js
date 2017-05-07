var fs = require('fs');
var util = require('util');

var searchString = "的毛泽东发生冲突。在林彪阴谋败露后，四人帮成为新的重要政治势力，中华人民共和国政治进一步混乱，故毛泽东重新起用邓小平出任第一副总理，重掌国务院以起相互牵制作用。1976年，周恩来、朱德、毛泽东先后去世；其后四人帮在怀仁堂事变中被逮捕，国务院总理华国锋接替毛泽东的领导地位，出任中国共产党中央委员会主席，成为最高领导人。尽管华国锋停止文革中的文攻武斗等混乱局势"

// var searchString = "我的名字叫小红，今年五岁了。我有一个爱我的妈妈，和一个爱我的爸爸。我小的时候，妈妈和我们住在一起。妈妈和我一起玩，一起睡，我很高兴。"
var hskFiles = ['level_1.txt', 'level_2.txt', 'level_3.txt', 'level_4.txt', 'level_5.txt', 'level_6.txt']

var finalizedString;
finalizedString = searchLevel(hskFiles[0], 1, searchString, finalizedString)
finalizedString = searchLevel(hskFiles[1], 2, searchString, finalizedString)
finalizedString = searchLevel(hskFiles[2], 3, searchString, finalizedString)
finalizedString = searchLevel(hskFiles[3], 4, searchString, finalizedString)
finalizedString = searchLevel(hskFiles[4], 5, searchString, finalizedString)
finalizedString = searchLevel(hskFiles[5], 6, searchString, finalizedString)
console.log(util.inspect(finalizedString, {color: true, hidden: false, depth: null}))


fs.writeFile("./index.html", '<html><head><meta charset="utf8"></meta><link rel="stylesheet" href="css.css"></link></head><body><div>' + finalizedString + '</div></body></html>', 'utf8', function(err){
	if(err){
		console.log("big problem")
	}
	console.log("file written")
})

function searchLevel(level, levelNumber, searchString, masterArrayConstruct){
  var initialInputArray = searchString.split("");
  var hskDictArray = fs.readFileSync(level).toString().split("\n");
	hskDictArray.pop() //get rid of that last empty bit on the array
	if(!masterArrayConstruct){
		var masterArrayConstruct = []
	}else{
		var masterArrayConstruct = masterArrayConstruct
	}

  for(var i = 0; i < initialInputArray.length; i++){
		for(var j = 0; j < hskDictArray.length; j++){
			if(initialInputArray[i] === hskDictArray[j]){
				if(!masterArrayConstruct[i]){
						masterArrayConstruct[i] = {
						leadCharacter : initialInputArray[i],
						words : [[initialInputArray[i].length, levelNumber]],
					}
				}else{
					masterArrayConstruct[i].words.push([initialInputArray[i].length, levelNumber]	);
				}
			}// end conditional
		}// end inner for loop
		if(!masterArrayConstruct[i] ){
			masterArrayConstruct[i] = {
				leadCharacter : initialInputArray[i],
				words : []
			}
		}//end conditional
	}//end outer for loop
	return masterArrayConstruct;
}//end searchLevel function
