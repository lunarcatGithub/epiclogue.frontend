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
