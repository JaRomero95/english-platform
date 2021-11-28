import React from 'react';
import AppPageTitle from 'components/AppPageTitle';
import FlashCard from 'models/FlashCard';
import FlashCardsRepository from 'repositories/FlashCardsRepository';

interface Props {}

interface State {
  flashCards: FlashCard[];
}

class FlashCardCategories extends React.Component<Props, State> {
  private repository: FlashCardsRepository = new FlashCardsRepository();

  constructor(props: Props) {
    super(props);

    this.state = {flashCards: []};
  }

  componentDidMount() {
    this.getFlashCards();
  }

  async getFlashCards() {
    const flashCards = await this.repository.index();
    console.log(flashCards);
    this.setState({flashCards});
  }

  render() {
    const {flashCards} = this.state;

    return (
      <div>
        <AppPageTitle>Flash Cards Administration</AppPageTitle>

        {flashCards.map((flashCard) => (
          <div key={flashCard.id}>{flashCard.question_text}</div>
        ))}
      </div>
    );
  }
}

export default FlashCardCategories;
