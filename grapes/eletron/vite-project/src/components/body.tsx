import { Component } from 'preact';

export default function Body() {
  return (
    <div>
      test1
      <div>test2</div>
      {(() => {
        if (Math.random() > 0.5) {
          return <div>random div</div>;
        } else {
          return null;
        }
      })()}
      {[1, 2, 3].map((item) => (
        <div key={item}>{item}</div>
      ))}
      <RandomDiv />
      <RandomDiv2 />
    </div>
  );
}

function RandomDiv({ value = Math.random() }: { value?: number } = {}) {
  if (value > 0.5) {
    return <div>random div</div>;
  } else {
    return null;
  }
}

class RandomDiv2 extends Component<{ value?: number }> {

  static defaultProps = {
    value: Math.random(),
  }

  render() {
    const {
      value = RandomDiv2.defaultProps.value,
    } = this.props;
    if (value > 0.5) {
      return <div>random div</div>;
    } else {
      return null;
    }
  }
}

export { Body };
