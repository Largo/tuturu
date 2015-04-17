var images = [
  {image: 'img/1.jpg'},
  {image: 'img/2.jpg'},
  {image: 'img/3.jpg'},
  {image: 'img/4.jpg'},
  {image: 'img/5.jpg'},
  {image: 'img/6.jpg'},
  {image: 'img/7.jpg'}
];

var styles = {
  container: {
    fontSize: '47px',
    minHeight: '100vh',
    backgroundImage: 'img/1.jpg',
    backgroundSize: 'cover'
  },
  preloader: { // http://www.thecssninja.com/css/even-better-image-preloading-with-css2
    display: 'none',
    content: '',
  }
};

var Button = React.createClass({displayName: "Button",
  addKey: function(hotkey) {
    self = this;
    var filename = this.props.filename;
    key(hotkey, function(event, handler){ 
          self.play(filename);
      });
  },
  componentDidMount: function(){
    if(typeof this.props.hotkey !== "undefined") {
        this.addKey(this.props.hotkey);
    }
  },
  play: function(filename) {
    var audio = new Audio(filename);
    audio.play();
  },
  render: function() {
    var className = "btn btn-info soundbutton " + this.props.className;
    return (
      React.createElement("button", {id:  this.props.id, className: "btn btn-info soundbutton btn-lg", onClick: this.play.bind(this, this.props.filename)},  this.props.title)
    );
  }

});


var Slideshow = React.createClass({displayName: "Slideshow",
  componentDidMount: function() {
    styles.container.backgroundImage = 'url(' + images[0].image + ')';
    this.setState({styles: styles});
    this.timer = setInterval(this.tick, this.props.secondsUntilNextSlide * 1000); // 1000ms = 1s
    // caching?

    for (var i=0; i < images.length; i++) {
      styles.preloader.content += 'url(' + images[i].image + ') ';
    }
    
    this.setState({styles: styles});
  },
  getInitialState: function() {
    return {
      index: 0,
      styles: styles
    };
  },
  getDefaultProps: function() {
    return {
      secondsUntilNextSlide : 4
    };
  },
  tick: function() {
     if(this.state.index+1 < images.length) {
       this.setState({index: this.state.index + 1});
     } else {
       this.setState({index: 0});
     }

      styles.container.backgroundImage = 'url(' + images[this.state.index].image + ')';
      this.setState({styles: styles});      
  },


  render: function() {
    var ytStyle = { maxWidth: '100%' };
    return (
      React.createElement("div", {id: "supersized", className: "slideshow", style: this.state.styles.container}, 
       React.createElement("div", {className: "soundboard"}, 
         React.createElement("h1", null, "Tuturu Steins;Gate Soundboard"), 

          React.createElement(Button, {hotkey: "t", title: "Tuturu~ ♫", filename: "tuturu.mp3", className: "btn-lg"}), 

          React.createElement("br", null), 
          React.createElement("p", null, 
          "Hotkeys are enabled :D ", React.createElement("br", null), 
          "Press T", 
          React.createElement("br", null)
          ), 

          React.createElement("iframe", {width: "280", height: "157", src: "https://www.youtube.com/embed/CgouXrkye20", frameBorder: "0", allowFullScreen: true, style: ytStyle}), 

          React.createElement("p", {className: "credits"}, 
          React.createElement("a", {href: "https://twitter.com/intent/tweet", className: "twitter-hashtag-button", "data-size": "large", "data-url": "https://tuturu.me"}, "Tweet "), 
            React.createElement("br", null), 
          React.createElement("br", null), 
          React.createElement("small", null, "Credits: Steins;Gate Producers. I claim no ownership. Images taken from wallhaven.cc. All images remain property of their original owners. ", React.createElement("br", null), 
            "Thx to ", React.createElement("a", {href: "https://www.reddit.com/user/crownIoI"}, "/u/crownIoI"), " ", React.createElement("br", null), 
            "Contact: info at tuturu me", 
          React.createElement("br", null)
          ), 
          "Programming by @Largo ", React.createElement("br", null), 
          React.createElement("a", {href: "https://twitter.com/largo", className: "twitter-follow-button", "data-show-count": "false"}, "Follow @largo"), " ", React.createElement("br", null), 
          React.createElement("a", {href: "https://largo.io"}, "largo.io")
          )
        ), 
        React.createElement("div", {id: "preloader", style: this.state.styles.preloader})
      )
    );
  }
});

React.render(
  React.createElement(Slideshow, {secondsUntilNextSlide: "4"}),
  document.getElementById('container')
);
