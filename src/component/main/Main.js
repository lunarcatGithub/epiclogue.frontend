import styled from 'styled-components';

//component
import { Meta } from '@utils/MetaTags';
import Contents from '@component/content/Contents';

// Hooks&&reducer import

const Main = () => {

  // Meta 전용
  const metaData = {
    title: '',
    description: '',
    image: `static/logo192.svg`,
    canonical: `main`, 
  };
  
  return (
    <>
      <Meta meta={metaData} />
      <Layout>
            <Contents type="MAIN" />
        <>
          {/*업로드 버튼*/}
            <UploadButton>
                <UploadSvg />
            </UploadButton>
        </>
      </Layout>
    </>
  );
};


//레이아웃
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
`;

//  이미지 업로드 버튼
const UploadButton = styled.span`
  position: fixed;
  display: block;
  cursor: pointer;
  bottom: 5em;
  right: 5.5em;
  user-select: none;
  width: 70px;
  height: 70px;
  background: #fff;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  @media (max-width: 900px) {
   display:none;
  }
`;
const UploadSvg = styled.svg`
  background: url('/static/edit-On.svg') no-repeat center center / contain;
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 39px;
  height: 35.5px;
  @media (max-width: 900px) {
    width: 30px;
    height: 26px;
  }
`;

export default Main;
