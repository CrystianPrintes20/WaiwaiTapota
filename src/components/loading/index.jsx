import { LoadingOutlined } from '@ant-design/icons';

import * as Styled from './styles';

export const SpinLoader = () => {
  return (
    <Styled.LoadingWrapper>
      <Styled.LoadingSpinner spin />
    </Styled.LoadingWrapper>
  );
};