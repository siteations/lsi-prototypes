import React, { Component } from 'react';
import { connect } from 'react-redux';

class Image extends Component {
  constructor(props) {
        super(props);
        this.state = {
          active : 0,
          height: 0,
          width: 0,
          widthImg: 400,
        }
  }

  componentDidMount() {
    var wW = document.getElementById('images').clientWidth;
    if (this.props.loc==="side"){
      this.setState({width:wW, height: wW*.75 - 32});
    } else {
      this.setState({width:wW, height: wW*.725 - 32});
    }
    this.getSize();
  }


  getSize(){
    var relH = document.getElementById('load').naturalHeight, relW = document.getElementById('load').naturalWidth;
    var wH = this.state.height, wW = this.state.width;

    //console.log('checking sizes', relH, relW, wH, wW);

    if (relH/relW>wH/wW) { //in case too tall
      this.setState({widthImg: relW * wH/relH });
    } else {
      this.setState({widthImg: wW});
    }

    //console.log(relH * wW/wH, relW * wH/wW);

  }

  switchImg(e){
    e.preventDefault();
    //let ind = +this.state.active;
    let index = +e.target.id.split(' ')[1];

      this.setState({active: index});
  }

  render() {

  const images = this.props.items;
  //console.log(this.props.hi)

  return (
    <div id="slider" >
      <div className="text-center">
        <img id='load' src={images[this.state.active].original} alt="" style={{width:this.state.widthImg}} onLoad={e=>this.getSize(e)} onChange={e=>this.getSize(e)}/>
      </div>
      <div className="row centerblock" style={{position: 'absolute', top: this.state.height-40}} >
          {images.length > 1 &&
            images.map((image, i)=>{
              if(i===this.state.active){
                return <span id={`sliders ${i}`} className="fa fa-circle p10" value="i" onTouchTap={e=>this.switchImg(e)} onClick={e=>this.switchImg(e)}></span>
              } else {
                return <span id={`sliders ${i}`} className="fa fa-circle-o p10" value="i" onTouchTap={e=>this.switchImg(e)} onClick={e=>this.switchImg(e)}></span>
              }
            })
          }
      </div>
      <div style={{position: 'absolute', top: this.state.height-10, paddingLeft: '10px', width:'100%', backgroundColor: '#ffffff', opacity: .5}}>
            {this.props.nav.siteName} <br/>
      {images[this.state.active].caption}
      </div>
      <div style={{position: 'absolute', top: this.state.height-10, paddingLeft: '10px', width:'100%'}} >
      {this.props.nav.siteName} <br/>
      {images[this.state.active].caption}
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // setSideTop: (type, tab) => {
    //     dispatch(setSideTop(type, tab));
    // },
  }
}

const ImageGallery = connect(mapStateToProps, mapDispatchToProps)(Image);

export default ImageGallery;
