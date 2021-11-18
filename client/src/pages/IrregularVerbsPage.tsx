import React from 'react';
import IrregularVerb from 'models/IrregularVerb';
import IrregularVerbsRepository from 'repositories/IrregularVerbsRepository';
import IrregularVerbForm from 'components/irregular_verbs/IrregularVerbForm';

interface Props {}

interface State {
  irregularVerbs: IrregularVerb[];
  submitted: boolean;
}

class IrregularVerbsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      irregularVerbs: [],
      submitted: false,
    };
  }

  componentDidMount() {
    this.getIrregularVerbs();
  }

  reset = () => {
    this.setState({submitted: false});
    this.getIrregularVerbs();
  };

  async getIrregularVerbs() {
    const repository = new IrregularVerbsRepository();
    const irregularVerbs = await repository.index();
    this.setState({irregularVerbs});
  }

  onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    this.setState({submitted: true});
  };

  render() {
    const {
      state: {irregularVerbs, submitted},
      onSubmit,
      reset,
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
