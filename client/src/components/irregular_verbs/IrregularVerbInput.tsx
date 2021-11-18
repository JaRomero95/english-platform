import React from 'react';

interface Props {
  value: string;
  validValue: string;
  toCorrect: boolean;
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
    const {toCorrect, onChange} = this.props;

    if (toCorrect) {
      return;
    }

    onChange(event.target.value);
  };

  isValueValid = () => {
    const {value, validValue} = this.props;
    return value === validValue;
  };

  toggleShowValidValue = () => {
    this.setState({showValidValue: !this.state.showValidValue});
  };

  showError = () => {
    const {
      props: {toCorrect},
      isValueValid,
    } = this;

    return toCorrect && !isValueValid();
  };

  render() {
    const {
      props: {value, validValue},
      state: {showValidValue},
      onChange,
      toggleShowValidValue,
      showError,
    } = this;

    return (
      <div>
        <input value={value} onChange={onChange} />

        <button type="button" onClick={toggleShowValidValue}>
          Show
        </button>

        {showError() && <span>Incorrect</span>}

        {showValidValue && <span>{validValue}</span>}
      </div>
    );
  }
}

export default IrregularVerbInput;
