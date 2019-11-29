import * as React from 'react';

// TODO: typings
export class Rating extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      rating: props.value,
      hoverAt: null
    };
  }

  static getDerivedStateFromProps = (nextProps: any, prevState: any) => {
    if (prevState.rating !== nextProps.value) {
      return {
        rating: nextProps.value,
        hoverAt: prevState.hoverAt
      };
    }
    return null;
  };

  handleMouseOver(idx: number) {
    this.setState({
      hoverAt: idx + 1
    });
  }

  handleMouseOut() {
    this.setState({
      hoverAt: null
    });
  }

  handleClick(idx: number) {
    this.setState({
      rating: idx + 1
    });
  }

  render() {
    const { onClick } = this.props;

    return (
      <div id='#/properties/rating'>
        <p>Rating:</p>
        {[0, 1, 2, 3, 4].map(i => {
          const rating =
            this.state.hoverAt != null ? this.state.hoverAt : this.state.rating;

          return (
            <span
              onMouseOver={() => this.handleMouseOver(i)}
              onMouseOut={() => this.handleMouseOut()}
              onClick={() => {
                this.handleClick(i);
                onClick({ value: i + 1 });
              }}
              key={`${this.props.id}_${i}`}
            >
              {i < rating ? '\u2605' : '\u2606'}
            </span>
          );
        })}
      </div>
    );
  }
}
