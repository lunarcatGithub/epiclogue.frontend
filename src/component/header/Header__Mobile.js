import React from 'react'
import styled from 'styled-components';

export default function MobileHeader() {

    return (
        <MobileHeaderLayout>
            <MobileHdInner>
               {/* DM */}
            <MbOptionWrap >
                <MbOptionDm />
            </MbOptionWrap>
              {/* Notification */}
            <MbOptionWrap>
                <MbOptionInfo />
                {/* {read > 0 && <InformIconRing/> } */}
            </MbOptionWrap>
              {/* Upload */}
                {
                // loginOn ?
                //     <NavItem exact to="/upload">
                //     <MbOptionWrap>
                //     <MbOptionUpload />
                //     </MbOptionWrap>
                // </NavItem>
                // :
                // <MbOptionWrap onClick={()=>setUnAuth(true)}>
                //     <MbOptionUpload />
                // </MbOptionWrap>
                }

               {/* category select */}
                <MbOptionWrap>
                <MbCategory/>
                </MbOptionWrap>

                {/* feedback */}
                <MbOptionWrap>
                    <MbFeedback/>
                </MbOptionWrap>
            </MobileHdInner>
        </MobileHeaderLayout>
    )
}


// 모바일 전용 헤더
const MobileHeaderLayout = styled.div`
  display: none;
  position: fixed;
  /* bottom: 15px; */
  left: 50%;
  border-radius: 25px;
  transform: translate(-50%, 0);
  width: 300px;
  height: auto;
  background: ${(props) => props.theme.color.whiteColor};
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  transition: all 0.2s 0.3s ease-in-out;
  z-index: 999;
  @media (max-width: 900px) {
    display:block;
    bottom: ${(props) => (props.show ? 15 : -60)}px;
  }

`;

const MobileHdInner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.2em 1em;
`;

const MbOptionWrap = styled.div`
  position: relative;
  display: flex;
  justify-content:center;
  align-items:center;
`;

const MbOptionDm = styled.button`
  display: flex;
  justify-content:center;
  align-items:center;
  padding: 0.3em;
  &::before {
    content: '';
    background: url() no-repeat center / contain;
    width: 2em;
    height: 2em;
  }
`;

const MbOptionInfo = styled(MbOptionDm)`
  &::before {
    background: url() no-repeat center center / contain;
  }
`;

const MbOptionUpload = styled(MbOptionDm)`
  &::before {
    background: url() no-repeat center center / contain;
    width: 2.2em;
    height: 2.2em;

  }
`;

const MbFollows = styled(MbOptionDm)`
  &::before {
    background: url() no-repeat center center / contain;
  }
`;
const MbFeedback = styled(MbOptionDm)`
  &::before {
    background: url() no-repeat center center / contain;
    width: 2.2em;
    height: 2.2em;

  }
`;
const MbCategory = styled(MbOptionDm)`
padding: 0.3em 0.3em 0.1em 0.3em ;
  &::before {
    background: url() no-repeat center center / contain;
    width: 1.8em;
  height: 1.8em;

  }
`;

// // NavLink 스타일 ****
// const activeClassName = 'nav-item-active';
// const NavItem = styled.span.attrs({
//   activeClassName,
// })`
//   &.${activeClassName} {
//     ${MbOptionUpload} {
//       &::before {
//         background-image: url();
//       }
//     }
//     ${MbFollows} {
//       &::before {
//         background-image: url();
//       }
//     }
//     ${ProfileFollow} {
//       background-image: url();
//       &:before {
//         color: ${(props) => props.theme.color.orangeColor};
//       }
//     }
//     ${OptionSetting} {
//       background-image: url();
//     }
//     ${FollowTxt} {
//       color: ${(props) => props.theme.color.orangeColor};
//     }
//   }
// `;

// 카테고리 영역
const CategoryBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top:3.8em;
  right: 20em;
  width: 28em;
  border-radius:0.4em;
  overflow: hidden;
  z-index: 99999;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow:${(props) => props.theme.boxshadow.popup3};
@media(max-width:900px){
  top:initial;
  bottom: 0;
  left: 0;
  right:initial;
  width: 100%;
  border-radius: 0.4em 0.4em 0 0;
} 
`;
const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 1em 0.3em;
  margin-bottom: 0.2em;
  background: ${(props) => props.theme.color.whiteColor};
`;
const CategoryInner = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.whiteColor};
  padding: 1.1em 2.5em;
`;
const HeaderTxt = styled.span`
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  @media (max-width:900px){
    font-size: ${(props) => props.theme.fontSize.font15};
  }
`;


const MbCategoryComic = styled.button`
  display: flex;
  justify-content: center;
  line-height: 38px;
  padding: 0 5px;
  width: 100%;
  min-width: 128px;
  height: 42px;
  border-radius: 25px;
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.color.orangeColor};
  color: ${(props) => (props.styling ? props.theme.color.whiteColor : props.theme.color.orangeColor)};
  background: ${(props) => (props.styling ? props.theme.color.orangeColor : props.theme.color.whiteColor)};
  margin-right: 4px;
`;

const MbCategoryIllust = styled(MbCategoryComic)`
  border: 2px solid ${(props) => props.theme.color.darkGray};
  color: ${(props) => (props.styling ? props.theme.color.whiteColor : props.theme.color.darkGray)};
  background: ${(props) => (props.styling ? props.theme.color.darkGray : props.theme.color.whiteColor)};
  margin-top: 6px;
`;
const ClosedBtn = styled.button.attrs({ type: 'button' })`
    position: absolute;
    top: 0.5em;
    right: 1.1em;
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    &::before {
    content: '';
    background: url() no-repeat center / cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 22px;
    height: 22px;
}
    &:hover {
        background: ${(props) => props.theme.color.hoverColor};
    }
`;
