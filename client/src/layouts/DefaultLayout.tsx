import AppBar from 'components/AppBar';
import AppContentLayout from 'components/AppContentLayout';

interface Props {
  component: JSX.Element;
  title?: string;
}

function DefaultLayout(props: Props) {
  const title = props.title || 'English Platform';

  return (
    <div>
      <AppBar title={title} />

      <AppContentLayout>{props.component}</AppContentLayout>
    </div>
  );
}

export default DefaultLayout;