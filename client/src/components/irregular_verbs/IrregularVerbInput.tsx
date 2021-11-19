import React from 'react';

interface Props {
  value: string;
  validValue: string;
  showError: boolean;
  onChange: (value: string) => void;
}

interface State {
  showValidValue: boolean;
}

class IrregularVerbInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showValidValue: false,
    };
  }
  onChange = (event: {target: HTMLInputElement}) => {
    this.props.onChange(event.target.value);
  };

  toggleShowValidValue = () => {
    this.setState({showValidValue: !this.state.showValidValue});
  };

  render() {
    const {
      props: {value, validValue, showError},
      state: {showValidValue},
      onChange,
      toggleShowValidValue,
    } = this;

    return (
      <div>
        <input value={value} onChange={onChange} />

        <button type="button" onClick={toggleShowValidValue}>
          Show
        </button>

        {showError && <span>Incorrect</span>}

        {showValidValue && <span>{validValue}</span>}
      </div>
    );
  }
}

export default IrregularVerbInput;
