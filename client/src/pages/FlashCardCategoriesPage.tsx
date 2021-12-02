import React from 'react';
import styled from 'styled-components';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardCategoriesRepository from 'repositories/FlashCardCategoriesRepository';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AppInput from 'components/AppInput';
import AppButton from 'components/AppButton';
import AppDialog from 'components/AppDialog';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

interface Props {}

interface State {
  flashCardCategories: FlashCardCategory[];
  newCategory: FlashCardCategory;
  editCategory: FlashCardCategory | null;
  toDeleteCategory: FlashCardCategory | null;
  showDeleteDialog: boolean;
}

class FlashCardCategories extends React.Component<Props, State> {
  private repository = new FlashCardCategoriesRepository();

  constructor(props: Props) {
    super(props);

    this.state = {
      flashCardCategories: [],
      newCategory: {name: ''},
      editCategory: null,
      toDeleteCategory: null,
      showDeleteDialog: false,
    };
  }

  componentDidMount() {
    this.getFlashCardCategories();
  }

  async getFlashCardCategories() {
    const {data} = await this.repository.index({per_page: 0});
    this.setState({flashCardCategories: data});
  }

  onCreateCategoryNameChange = (name: string) => {
    this.setState((state) => ({
      newCategory: {
        ...state.newCategory,
        name,
      },
    }));
  };

  onEditCategoryNameChange = (name: string) => {
    this.setState((state) => ({
      editCategory: {
        ...state.editCategory,
        name,
      },
    }));
  };

  onCreateCategory = async (event: React.FormEvent) => {
    event.preventDefault();

    const createdCategory = await this.repository.create(
      this.state.newCategory
    );

    this.setState((state) => ({
      flashCardCategories: [...state.flashCardCategories, createdCategory],
      newCategory: {name: ''},
    }));
  };

  onUpdate = async (event: React.FormEvent) => {
    const {editCategory} = this.state;

    event.preventDefault();

    const updatedCategory = await this.repository.update(
      editCategory!.id!,
      editCategory!
    );

    this.setState((state) => ({
      editCategory: null,
      flashCardCategories: state.flashCardCategories.map((category) => {
        return category.id === editCategory!.id ? updatedCategory : category;
      }),
    }));
  };

  onDeleteCategory = async () => {
    const {toDeleteCategory} = this.state;

    const id = toDeleteCategory!.id!;

    this.repository.delete(id);

    this.setState((state) => ({
      flashCardCategories: state.flashCardCategories.filter(
        (category) => category.id !== id
      ),
    }));

    this.closeDeleteDialog();
  };

  onCancelEdit = () => {
    this.setState({
      editCategory: null,
    });
  };

  sortedCategories(): FlashCardCategory[] {
    return this.state.flashCardCategories.sort(
      ({name: nameA}, {name: nameB}) => {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
    );
  }

  onEdit(flashCardCategory: FlashCardCategory) {
    this.setState({editCategory: {...flashCardCategory}});
  }

  showEditForm(flashCardCategory: FlashCardCategory) {
    const {editCategory} = this.state;
    return editCategory && editCategory.id === flashCardCategory.id;
  }

  createFormMarkup() {
    const {newCategory} = this.state;

    return (
      <FormContainer>
        <form onSubmit={this.onCreateCategory}>
          <Typography variant="h6">Create Category</Typography>

          <AppInput
            placeholder="Category name"
            onChange={this.onCreateCategoryNameChange}
            value={newCategory.name}
          />

          <AppButton onClick={this.onCreateCategory}>Create</AppButton>
        </form>
      </FormContainer>
    );
  }

  itemMarkup(flashCardCategory: FlashCardCategory) {
    return (
      <div>
        <span>{flashCardCategory.name}</span>

        <div>
          <IconButton onClick={() => this.onEdit(flashCardCategory)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => this.openDeleteDialog(flashCardCategory)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    );
  }

  editFormMarkup() {
    const {editCategory} = this.state;

    return (
      <form onSubmit={this.onUpdate}>
        <AppInput
          placeholder="Category name"
          onChange={this.onEditCategoryNameChange}
          value={editCategory!.name}
        />

        <div>
          <IconButton onClick={this.onUpdate}>
            <SaveIcon />
          </IconButton>

          <IconButton onClick={this.onCancelEdit}>
            <CancelIcon />
          </IconButton>
        </div>
      </form>
    );
  }

  closeDeleteDialog = () => {
    this.setState({showDeleteDialog: false});
  };

  openDeleteDialog = (flashCardCategory: FlashCardCategory) => {
    this.setState({
      toDeleteCategory: flashCardCategory,
      showDeleteDialog: true,
    });
  };

  deleteDialogMarkup() {
    const {toDeleteCategory, showDeleteDialog} = this.state;

    return (
      <AppDialog
        open={showDeleteDialog}
        onClose={this.closeDeleteDialog}
        title="Delete Category"
        actions={[
          {text: 'Delete', onClick: this.onDeleteCategory},
          {text: 'Cancel', onClick: this.closeDeleteDialog},
        ]}
      >
        <span>
          Are you sure that want to delete "{toDeleteCategory?.name}" category?
        </span>
      </AppDialog>
    );
  }

  render() {
    const flashCardCategories = this.sortedCategories();
    return (
      <div>
        {this.createFormMarkup()}
        <Paper>
          {flashCardCategories.map((flashCardCategory) => (
            <CategoryItem key={flashCardCategory.id}>
              {(this.showEditForm(flashCardCategory) &&
                this.editFormMarkup()) ||
                this.itemMarkup(flashCardCategory)}
            </CategoryItem>
          ))}

          {!flashCardCategories.length && (
            <CategoryItem>
              <span>There are no categories yet</span>
            </CategoryItem>
          )}
        </Paper>
        {this.deleteDialogMarkup()}
      </div>
    );
  }
}

const FormContainer = styled(Paper)`
  margin-bottom: 1.5rem;
  padding: 1rem;

  > form > div {
    width: 100%;
    margin: 1rem 0;
  }
`;

const CategoryItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 1rem;
  height: 5em;
  font-size: 1.2em;

  > * {
    display: flex;
    justify-content: space-between;
    line-height: 3em;
  }
`;

export default FlashCardCategories;
