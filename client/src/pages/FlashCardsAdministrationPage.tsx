import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Link, Outlet} from 'react-router-dom';
import styled from 'styled-components';
import stylesConfig from 'config/styles';

const tabs = [
  {
    label: 'Flash Cards',
    to: '/administration/flash-cards',
  },
  {
    label: 'Categories',
    to: '/administration/flash-cards/categories',
  },
];

interface Props {}

interface State {
  value: string;
}

class FlashCardsAdministration extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {value: window.location.pathname};
  }

  onChange = (event: React.SyntheticEvent, value: string): void => {
    this.setState({value});
  };

  render() {
    const {
      state: {value},
      onChange,
    } = this;

    return (
      <div>
        <TabsContainer variant="fullWidth" value={value} onChange={onChange}>
          {tabs.map(({label, to}) => (
            <Tab key={to} component={Link} value={to} to={to} label={label} />
          ))}
        </TabsContainer>

        <Outlet />
      </div>
    );
  }
}

const TabsContainer = styled(Tabs)`
  background-color: #fff;
  box-shadow: 0 2px 5px #ccc;
  margin-top: -${stylesConfig.LAYOUT_SM_VERTICAL_PADDING};
  margin-left: -${stylesConfig.LAYOUT_SM_SIDE_PADDING};
  margin-right: -${stylesConfig.LAYOUT_SM_SIDE_PADDING};
  margin-bottom: ${stylesConfig.LAYOUT_SM_VERTICAL_PADDING};
`;

export default FlashCardsAdministration;
