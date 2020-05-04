import React from 'react';
import './Rect.scss';

interface RectProps {
  data: any[]
}

interface RectState {
  data: any[],
  width: number,
  height: number
}

class Rect extends React.Component<RectProps, RectState> {
  static defaultProps = {
    data: [],
  };
  private bar: React.RefObject<any>;

  constructor(props: Readonly<RectProps>) {
    super(props);
    this.state = {
      data: [],
      width: 0,
      height: 0
    };
    this.bar = React.createRef();
  }

  componentDidMount() {
    //获取svg的height和width
    const bar = this.bar.current;
    const {width, height} = bar.getBoundingClientRect();
    this.setState({
      width,
      height
    });
  }

  get rectDataSource () {
    const { width, height} = this.state;
    let arr = [];
    const rectWidth = width / 3 * 2 / 7;
    const rectGap = width / 3 / 8;
    let rectHeight = 1;
    let rectY = height - rectHeight;
    let x;
    if (this.props.data.length === 0) {
      for (let i = 1; i < 8;i++) {
        x = rectGap * i + rectWidth * (i - 1);
        arr.push({
          x,
          y: rectY,
          width: rectWidth,
          height: rectHeight
        });
      }
    } else {
      let data = this.props.data;
      arr = data.map( (item,index) => {
        return {
          x: rectGap * (index + 1) + rectWidth * index,
          y: height - (item.count || 1),
          width: rectWidth,
          height: item.count || 1
        }
      });
    }
    return arr;
  }

  render() {
    return (
      <svg className='bar' height='60' ref={this.bar}>
        {
          this.rectDataSource.map((item: any) => {
            return <rect width={item.width} x={item.x} y={item.y} fill='rgba(215,78,78,0.5)' height={item.height}/>;
          })
        }
      </svg>
    );
  }
}

export default Rect;
