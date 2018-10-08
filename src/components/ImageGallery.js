import React, { Component } from 'react';
import { connect } from 'react-redux';

class Image extends Component {
  constructor(props) {
        super(props);
        this.state = {
          active : 0,
          length: 0,
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

  shouldComponentUpdate(nextProps, nextState){
    console.log('gallery', this.props.items, nextProps.items)
    return this.props.items !== nextProps.items || this.state.widthImg !== nextState.widthImg || this.state.active !== nextState.active ;
  }

  componentDidUpdate(){
    var length =this.props.items.length-1;
    this.setState({length:length});
    if (this.state.active>length){
      this.setState({active:0});
    }
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

  switchImg(){
    let ind = +this.state.active;
    let index = ind + 1;
    if (index>this.state.length){
      this.setState({active:0});
    } else {
      this.setState({active: index});
    }
  }

  render() {

  const images = this.props.items;
  console.log('from gallery', images);

  return (
    <div id="slider" >
      <div className="text-center">
      {images.length > 0 &&
        <img id='load' src={(images[this.state.active])?images[this.state.active].graphic : images[0].graphic} alt="" style={{width:this.state.widthImg}} onLoad={e=>this.getSize(e)} onChange={e=>this.getSize(e)} onClick={e=>this.switchImg(true)}/>
      }
      {images.length === 0 &&
        <img id='load' src="http://community.village.virginia.edu/cultural_landscapes/media/images/FLS_Slide_Collection/medium/7000025.jpg" alt="" style={{width:this.state.widthImg}} onLoad={e=>this.getSize(e)} onChange={e=>this.getSize(e)}/>
      }
      </div>
      {images.length > 0 &&
      <div style={{position: 'absolute', top: this.state.height, paddingLeft: '10px', width:'100%', backgroundColor: '#ffffff', opacity: .75}}>
         {this.props.img.figActive === true &&
          <p>{(images[this.state.active])? images[this.state.active].subject[0] : images[0].subject[0] }, click to advance series</p>
         }
         {this.props.img.siteActive === true &&
          this.props.nav.siteName
         }
      </div>
      }
      {images.length === 0 &&
        <div style={{position: 'absolute', top: this.state.height-10, paddingLeft: '10px', width:'100%', backgroundColor: '#ffffff', opacity: .75}}>
        <p>{'Détail des nouveaux jardins a la mode' }</p></div>
      }
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    img: state.img,
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
