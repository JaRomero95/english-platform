import React from 'react';
import AppPageTitle from 'components/AppPageTitle';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardCategoriesRepository from 'repositories/FlashCardCategoriesRepository';

interface Props {}

interface State {
  flashCardCategories: FlashCardCategory[];
}

class FlashCardCategories extends React.Component<Props, State> {
  private repository: FlashCardCategoriesRepository =
    new FlashCardCategoriesRepository();

  constructor(props: Props) {
    super(props);

    this.state = {flashCardCategories: []};
  }

  componentDidMount() {
    this.getFlashCardCategories();
  }

  async getFlashCardCategories() {
    const flashCardCategories = await this.repository.index({per_page: 0});
    console.log(flashCardCategories);
    // this.setState({flashCardCategories});
  }

  render() {
    const {flashCardCategories} = this.state;

    return (
      <div>
        <AppPageTitle>Flash Card Categories</AppPageTitle>

        {flashCardCategories.map((flashCardCategory) => (
          <div key={flashCardCategory.id}>{flashCardCategory.name}</div>
        ))}
      </div>
    );
  }
}

export default FlashCardCategories;
