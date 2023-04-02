import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

export const LoadingWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.3);
  z-index: 6;
`

export const LoadingSpinner = styled(LoadingOutlined)`
font-size: 50px;
color: #049240;
`