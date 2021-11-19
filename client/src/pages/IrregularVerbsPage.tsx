import React from 'react';
import IrregularVerb from 'models/IrregularVerb';
import IrregularVerbResult from 'models/IrregularVerbResult';
import IrregularVerbsRepository from 'repositories/IrregularVerbsRepository';
import IrregularVerbsExamsRepository from 'repositories/IrregularVerbsExamsRepository';
import IrregularVerbForm from 'components/irregular_verbs/IrregularVerbForm';

interface Props {}

interface State {
  irregularVerbs: IrregularVerb[];
  irregularVerbsResults: IrregularVerbResult[];
  submitted: boolean;
}

class IrregularVerbsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      irregularVerbs: [],
      irregularVerbsResults: [],
      submitted: false,
    };
  }

  componentDidMount() {
    this.getIrregularVerbs();
  }

  componentDidUpdate() {
    const {irregularVerbsResults} = this.state;

    if (this.isExamComplete()) {
      const repository = new IrregularVerbsExamsRepository();
      repository.create(irregularVerbsResults);
    }
  }

  isExamComplete(): boolean {
    const {irregularVerbs, irregularVerbsResults} = this.state;

    const totalVerbs = irregularVerbs.length;

    return !!totalVerbs && totalVerbs === irregularVerbsResults.length;
  }

  reset = () => {
    this.setState({submitted: false});
    this.getIrregularVerbs();
  };

  async getIrregularVerbs() {
    const repository = new IrregularVerbsRepository();
    const irregularVerbs = await repository.index();
    this.setState({
      irregularVerbs,
      irregularVerbsResults: [],
    });
  }

  onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    this.setState({submitted: true});
  };

  onCorrection = (verbId: number, result: boolean): void => {
    const irregularVerbResult: IrregularVerbResult = {
      id: verbId,
      result,
    };

    this.setState((state: State) => ({
      irregularVerbsResults: [
        ...state.irregularVerbsResults,
        irregularVerbResult,
      ],
    }));
  };

  render() {
    const {
      state: {irregularVerbs, submitted},
      onSubmit,
      reset,
      onCorrection,
    } = this;

    return (
      <div>
        <h1>Irregular Verbs</h1>

        <form onSubmit={onSubmit}>
          {irregularVerbs.map((verb: IrregularVerb) => (
            <IrregularVerbForm
              key={verb.id}
              irregularVerb={verb}
              toCorrect={submitted}
              onCorrection={(result: boolean) => onCorrection(verb.id, result)}
            />
          ))}

          <button type="submit" onSubmit={onSubmit} disabled={submitted}>
            Send
          </button>
        </form>

        <button onClick={reset}>Reset</button>
      </div>
    );
  }
}

export default IrregularVerbsPage;
