import React from 'react';
import ReactDOM from 'react-dom';

// class TextBox extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {date: new Date()}
//   }
//   componentDidMount(){
//     this.timer = setInterval(
//       ()=>this.getDate(), 1000
//     )
//     console.log('TextBox has mounted and the clocks are running')
//   }
//   getDate(){
//     this.setState({
//       date: new Date()
//     })
//   }
//   render(){
//     return(
//       <div className="testBox">
//         <h1>This is a test {this.props.name}</h1>
//         <h2>now the date is {this.state.date.toString()}</h2>
//       </div>
//     )
//   }
// }

class TestContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {chineseWords : []}
    this.getChineseWords = this.getChineseWords.bind(this)
  }
  componentDidMount(){
    this.getChineseWords()
  }
  getChineseWords(){
  var self = this;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function(data) {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      console.log('xhr response: ' + xhr.responseText)
      self.setState({chineseWords : xhr.responseText})
      console.log('state: ' + self.state.chineseWords)
    }
  }
  var chinese = "要政治势力，中华人民共和国政治进一步混乱，故毛泽东重新起用邓小平出任第一副总理，重掌国务院以起相互牵制作用。1976年，周恩";
  xhr.send(chinese);
  //   var arr = []
  //   for(var i = 0; i < 10; i++){
  //     arr.push(<TextBox/>)
  //   }
  }
  render(){
    return(<div>
            {this.state.textBoxes}
          </div>
    )
  }
}

ReactDOM.render(
  <div>
    <TestContainer/>
  </div>,
  document.getElementById('app'),
)

//
// <TextBox name="trex"/>
// <TextBox name="Jane"/>
// <TextBox name="Joseph"/>
// var DinoBox = React.createClass({
//   render: function(){
//     return(
//         <img src="http://www.enchantedlearning.com/tgifs/Trexskelanim.gif"></img>
//     )
//   }
// })
//
// var TestBox = React.createClass({
//   render: function(props){
//     return(
//       <div className="testBox">
//         <h1>This is a test {props.name}</h1>
//         <DinoBox/>
//       </div>
//     )
//   }
// })
