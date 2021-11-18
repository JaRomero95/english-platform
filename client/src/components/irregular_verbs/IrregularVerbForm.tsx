import React from 'react';
import IrregularVerb from 'models/IrregularVerb';
import IrregularVerbInput from 'components/irregular_verbs/IrregularVerbInput';

interface Props {
  irregularVerb: IrregularVerb;
  toCorrect: boolean;
}

interface State {
  irregularVerb: IrregularVerb;
}

class IrregularVerbForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      irregularVerb: {
        ...props.irregularVerb,
        past_tense: '',
        past_participle: '',
      },
    };
  }

  onChangeValue = (newValue: string, fieldName: string): void => {
    const {irregularVerb} = this.state;

    this.setState({
      irregularVerb: {
        ...irregularVerb,
        [fieldName]: newValue,
      },
    });
  };

  render() {
    const {
      props: {
        toCorrect,
        irregularVerb: {
          base,
          past_tense: validPastTense,
          past_participle: validPastParticiple,
        },
      },
      state: {
        irregularVerb: {past_tense, past_participle},
      },
      onChangeValue,
    } = this;

    return (
      <div>
        <div>
          <span>{base}</span>
        </div>

        <IrregularVerbInput
          value={past_tense}
          validValue={validPastTense}
          toCorrect={toCorrect}
          onChange={(value) => onChangeValue(value, 'past_tense')}
        />

        <IrregularVerbInput
          value={past_participle}
          validValue={validPastParticiple}
          toCorrect={toCorrect}
          onChange={(value) => onChangeValue(value, 'past_participle')}
        />
      </div>
    );
  }
}

export default IrregularVerbForm;
