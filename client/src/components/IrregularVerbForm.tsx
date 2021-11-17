import React from 'react';
import IrregularVerb from 'models/IrregularVerb';

interface Props {
  irregularVerb: IrregularVerb;
}

interface State {
  irregularVerb: IrregularVerb;
}

class IrregularVerbsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const irregularVerb = {...props.irregularVerb};
    this.state = {irregularVerb};
  }

  onChangeValue = (
    event: {target: HTMLInputElement},
    fieldName: string
  ): void => {
    const {irregularVerb} = this.state;

    console.log(event.target.value);

    console.log({
      irregularVerb: {
        ...irregularVerb,
        [fieldName]: event.target.value,
      },
    });

    this.setState({
      irregularVerb: {
        ...irregularVerb,
        [fieldName]: event.target.value,
      },
    });
  };

  render() {
    const {
      irregularVerb: {base, past_tense, past_participle},
    } = this.state;

    const {onChangeValue} = this;

    return (
      <div>
        <span>{base}</span>

        <input
          value={past_tense}
          onChange={(ev) => onChangeValue(ev, 'past_tense')}
        />
        <input
          value={past_participle}
          onChange={(ev) => onChangeValue(ev, 'past_participle')}
        />
      </div>
    );
  }
}

export default IrregularVerbsPage;
