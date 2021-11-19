import React from 'react';
import IrregularVerb from 'models/IrregularVerb';
import IrregularVerbInput from 'components/irregular_verbs/IrregularVerbInput';

const PAST_TENSE = 'past_tense';
const PAST_PARTICIPLE = 'past_participle';

const VERB_TENSES = [PAST_TENSE, PAST_PARTICIPLE] as const;

type VerbTense = typeof VERB_TENSES[number];

interface Props {
  irregularVerb: IrregularVerb;
  toCorrect: boolean;
  onCorrection: (result: boolean) => void;
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

  componentDidUpdate(prevProps: Props) {
    const {toCorrect: prevToCorrect} = prevProps;
    const {toCorrect, onCorrection} = this.props;
    const {isCorrect} = this;

    if (!prevToCorrect && toCorrect) {
      onCorrection(isCorrect());
    }
  }

  onChangeValue = (newValue: string, fieldName: string): void => {
    const {toCorrect} = this.props;
    const {irregularVerb} = this.state;

    if (toCorrect) {
      return;
    }

    this.setState({
      irregularVerb: {
        ...irregularVerb,
        [fieldName]: newValue,
      },
    });
  };

  isValueValid = (currentValue: string, validValue: string) => {
    return currentValue === validValue;
  };

  isCorrect = () => {
    return (
      this.verbTenseIsValid(PAST_TENSE) &&
      this.verbTenseIsValid(PAST_PARTICIPLE)
    );
  };

  showError = (verbTense: VerbTense): boolean => {
    if (!this.props.toCorrect) {
      return false;
    }

    return !this.verbTenseIsValid(verbTense);
  };

  verbTenseIsValid(verbTense: VerbTense): boolean {
    const value = this.props.irregularVerb[verbTense];
    const validValue = this.state.irregularVerb[verbTense];

    return value === validValue;
  }

  render() {
    const {
      props: {
        irregularVerb: {
          base,
          past_tense: validPastTense,
          past_participle: validPastParticiple,
        },
      },
      state: {
        irregularVerb: {past_tense, past_participle},
      },
      showError,
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
          onChange={(value) => onChangeValue(value, PAST_TENSE)}
          showError={showError(PAST_TENSE)}
        />

        <IrregularVerbInput
          value={past_participle}
          validValue={validPastParticiple}
          onChange={(value) => onChangeValue(value, PAST_PARTICIPLE)}
          showError={showError(PAST_PARTICIPLE)}
        />
      </div>
    );
  }
}

export default IrregularVerbForm;
