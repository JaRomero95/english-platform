import React from 'react';

interface Props {
  value: string;
  validValue: string;
  onChange: (value: string) => void;
}

class IrregularVerbInput extends React.Component<Props> {
  onChange = (event: {target: HTMLInputElement}) => {
    this.props.onChange(event.target.value);
  };

  isValueValid = () => {
    const {value, validValue} = this.props;
    return value === validValue;
  };

  render() {
    const {
      props: {value},
      onChange,
      isValueValid,
    } = this;

    return (
      <div>
        <input value={value} onChange={onChange} />

        {!isValueValid() && <p>Incorrect</p>}
      </div>
    );
  }
}

export default IrregularVerbInput;
