var fs = require('fs');
var util = require('util');
var http = require('http');
var path = require('path');
var url = require('url');
var finalizedString = '';
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css",
		"txt": "text/plain; charset=UTF-8"
	};


var hskFiles = ['level_1.txt', 'level_2.txt', 'level_3.txt', 'level_4.txt', 'level_5.txt', 'level_6.txt']

var server = http.createServer(function(req, res){

	res.on('error', function(err){
		console.log(err)
	})

	req.on('end', function(){

		var uri = url.parse(req.url).pathname;
		console.log(uri)
		var streamOfFiles = fs.createReadStream(__dirname + uri)
		// streamOfFiles.setEncoding('utf8')

		streamOfFiles.on('error', function(err){
			console.log("Error: " + err)
			res.writeHead(404)
			res.write("file doesn't exist yo!")
			res.end()
		})

		streamOfFiles.on('end', function(){
			res.end();
		})
		console.log(__dirname + uri + ' exists, sweet!')
		var mimeType = mimeTypes[path.extname(__dirname + uri).split(".")[1]];
		res.writeHead(200, {'Content-Type':mimeType, 'Accept-Language': 'zh'});
		streamOfFiles.pipe(res);

		// if(req.method === 'GET'){
		// 	fs.stat(filename, function(err, stats){
		// 		console.log(filename)
		// 		if(err){
		// 			console.log(err)
		// 		}else{
		// 			if(!stats){
		// 				console.log("not exists: " + filename);
		// 				res.writeHead(200, {'Content-Type': 'text/plain'});
		// 				// res.write('404 Not Found\n');
		// 				res.end();
		// 				return;
		// 			}else{
		// 				console.log('exists sweet')
		// 				var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
		// 				res.writeHead(200, {'Content-Type':mimeType});
		// 				var fileStream = fs.createReadStream(filename);
		// 				fileStream.pipe(res);
		// 			}
		// 		}
		// 	})
		// }
	})

	//fileStream = fs.createReadStream(__dirname + '/file.txt')
	// fileStream.on('error', function(err){
	// 	console.log(err;)
	// })

		req.on('data', (d)=>{
			if(req.method === 'POST'){
				console.log(d.toString());
				searchString = d.toString();
				finalizedString = searchLevel(__dirname + '/hsklevelfiles/' + hskFiles[0], 1, searchString, finalizedString)
				finalizedString = searchLevel(__dirname + '/hsklevelfiles/' + hskFiles[1], 2, searchString, finalizedString)
				finalizedString = searchLevel(__dirname + '/hsklevelfiles/' + hskFiles[2], 3, searchString, finalizedString)
				finalizedString = searchLevel(__dirname + '/hsklevelfiles/' + hskFiles[3], 4, searchString, finalizedString)
				finalizedString = searchLevel(__dirname + '/hsklevelfiles/' + hskFiles[4], 5, searchString, finalizedString)
				finalizedString = searchLevel(__dirname + '/hsklevelfiles/' + hskFiles[5], 6, searchString, finalizedString)
				console.log(util.inspect(JSON.stringify(finalizedString), {color: true, hidden: false, depth: null}))
				res.writeHead(200, {'Content-Type': 'text/json'});
				res.write(JSON.stringify(finalizedString), 'utf8')
				res.end()
			}else if(req.method === 'GET'){
				console.log('this is worthless')
			}
		})
})

server.listen(8080, function(){
	console.log('listening on 8080')
})

// var searchString = "的毛泽东发生冲突。在林彪阴谋败露后，四人帮成为新的重要政治势力，中华人民共和国政治进一步混乱，故毛泽东重新起用邓小平出任第一副总理，重掌国务院以起相互牵制作用。1976年，周恩来、朱德、毛泽东先后去世；其后四人帮在怀仁堂事变中被逮捕，国务院总理华国锋接替毛泽东的领导地位，出任中国共产党中央委员会主席，成为最高领导人。尽管华国锋停止文革中的文攻武斗等混乱局势"

// var searchString = "我的名字叫小红，今年五岁了。我有一个爱我的妈妈，和一个爱我的爸爸。我小的时候，妈妈和我们住在一起。妈妈和我一起玩，一起睡，我很高兴。"


// fs.writeFile("./index.html", '<html><head><meta charset="utf8"></meta><link rel="stylesheet" href="css.css"></link></head><body><div>' + finalizedString + '</div></body></html>', 'utf8', function(err){
// 	if(err){
// 		console.log("big problem")
// 	}
// 	console.log("file written")
// })
// function createHTML(searchString, finalizedString){
// 	var initialInputArray = searchString.split("")
// }

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
			if(hskDictArray[j].length > 1){
				var testWord = initialInputArray.slice(i, i + hskDictArray[j].length).join('')
				if(testWord === hskDictArray[j]){
					if(!masterArrayConstruct[i]){
						masterArrayConstruct[i] = {
							leadCharacter : initialInputArray[i],
							words : [[hskDictArray[j].length	, levelNumber]]
						}
					}else{
						masterArrayConstruct[i].words.push([hskDictArray[j].length, levelNumber]);
					}
				}
			}else if(initialInputArray[i] === hskDictArray[j]){
				if(!masterArrayConstruct[i]){
						masterArrayConstruct[i] = {
						leadCharacter : initialInputArray[i],
						words : [[initialInputArray[i].length, levelNumber]]
					}
				}else{
					masterArrayConstruct[i].words.push([initialInputArray[i].length, levelNumber]);
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
