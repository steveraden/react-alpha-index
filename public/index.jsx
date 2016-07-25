var AlphabeticIndex = React.createClass({
  commandForLetter: function(letter) {
     var queryURL = "//quiet-shore-35969.herokuapp.com/"  + letter;
     $.ajax({
      url: queryURL,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        //this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }, 
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return (
      <div className="alphabeticIndex">
        <LetterList letters={alphabet} letterSelected={this.commandForLetter}/>
        <SearchResults data={this.state.data}/>
      </div>    
    );
  }
});

var SearchResultsHeaders = React.createClass({
  
  render: function(){
    var headers = "signature, maker_info, instrument, comments, location, reference".split(',');
    var headerNodes = headers.map( function(header, index) {
      return(
       <th key={index}>{header}</th>
      );
    });
    return(
      <thead>
        <tr>
          {headerNodes}
        </tr>
      </thead>
    );
  }
});

var SearchResults = React.createClass({

  render: function() {
   
    var row = function(object,index){
      
      var cells = [];
      var keyIndex = 0;
      for (var key in object) {
        if ( object.hasOwnProperty(key) ) {
          cells.push(<td key={keyIndex}>{object[key]}</td>);
          keyIndex += 1;
        }
      }
      return cells;
    };

    var tableRows =  this.props.data.map( function(object, index) {
      return(
         <tr key={index}>
            {row(object, index)}
         </tr>
      );
    }); 

  
    if( this.props.data && this.props.data.length > 0 ) {
      return(
        <div>
          <table id="results" className="table table-striped"> 
            <SearchResultsHeaders />
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      );
    } else {
      return(
        <h1>Click a letter to search</h1>
      );
    }
  }
});



var LetterList = React.createClass({
  handleLetterSelected: function(letter) {
    this.props.letterSelected(letter);
  },
  render: function() {
    var that = this;
    var letterNodes =  this.props.letters.map( function(letter){
      return (
        <Letter letterSelected={this.handleLetterSelected} letter={letter} key={letter}></Letter>
      );
    },  that);
     
    return (
      <div className="letterList">
        <ul className="nav nav-pills">
          {letterNodes}
        </ul>
      </div>
    );
  }
 
});

var Letter = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.letterSelected(  this.props.letter);
  }, 
  render: function() {
    return (
      <li>
        <a className="letter nav-item" href={this.props.letter} onClick={this.handleClick}>
          {this.props.letter}
        </a>
      </li>
    );
  }
});

ReactDOM.render(
  <AlphabeticIndex />,
  document.getElementById('content')
);
