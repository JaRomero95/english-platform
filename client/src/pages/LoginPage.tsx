import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import AppInput from 'components/AppInput';
import AppPaper from 'components/AppPaper';
import AppButton from 'components/AppButton';
import SessionsRepository from 'repositories/SessionsRepository';
import UserStoreContext from 'providers/UserStoreContext';

const repository = new SessionsRepository();

function LoginPage() {
  const userStoreContext = useContext(UserStoreContext);

  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setError(false);

    try {
      const session = await repository.create({email, password});
      userStoreContext!.setToken(session.token!);
    } catch {
      setError(true);
    }
  };

  return (
    <Container>
      <SubContainer>
        <Title>English Platform</Title>

        <AppPaper>
          <form onSubmit={onSubmit}>
            <ContainerInput>
              <AppInput placeholder="Email" value={email} onChange={setEmail} />
            </ContainerInput>

            <ContainerInput>
              <AppInput
                placeholder="Password"
                value={password}
                type={'password'}
                onChange={setPassword}
              />
            </ContainerInput>

            <ErrorMessage>{error && 'Invalid credentials'}</ErrorMessage>

            <AppButton type="submit" onClick={onSubmit}>
              LOGIN
            </AppButton>
          </form>
        </AppPaper>
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  min-width: 90%;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const SubContainer = styled.div`
  flex: 1;
  padding: 0 5%;
  margin: 0 auto;
  max-width: 600px;
`;

const ContainerInput = styled.div`
  margin-bottom: 1rem !important;
`;

const Title = styled.h1`
  text-align: center;
`;

const ErrorMessage = styled.p`
  line-height: 1rem;
  height: 1rem;
  color: red;
`;

export default LoginPage;
