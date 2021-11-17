import React from 'react';
import IrregularVerb from 'models/IrregularVerb';
import IrregularVerbsRepository from 'repositories/IrregularVerbsRepository';
import IrregularVerbForm from 'components/IrregularVerbForm';

interface Props {}

interface State {
  irregularVerbs: IrregularVerb[];
}

class IrregularVerbsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      irregularVerbs: [],
    };
  }

  async componentDidMount() {
    const repository = new IrregularVerbsRepository();
    const irregularVerbs = await repository.index();
    this.setState({irregularVerbs});
  }

  render() {
    const {irregularVerbs} = this.state;

    return (
      <div>
        <h1>Irregular Verbs</h1>

        {irregularVerbs.map((verb: IrregularVerb) => (
          <IrregularVerbForm key={verb.id} irregularVerb={verb} />
        ))}
      </div>
    );
  }
}

export default IrregularVerbsPage;
