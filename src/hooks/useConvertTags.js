import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

export const useConvertTags = () => {
  const [converted, setConverted] = useState([]);
  const regURL = new RegExp("([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)","gi");
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const convert = (props) => {
    if(!props) return;
    const arr = [];
    let splitBody;
    
      if(props.match(' ')){
        splitBody = props.split(' ');
      }else if(props.match('\n')){
        splitBody = props.split('\n');
      } else {
        splitBody = [props];
      }
      // arr.push(props.map(i => i.replace('\n', `,<br/>,`)));
      // splitBody.replace('\n', `<br/>`)
      
      splitBody?.map((str, index) => {
        if (str[0] === "#") {
          arr.push(
            <Link
            href={{
              pathname: `/search/latest/${str.split("#").pop()}`,
              query: {
                query: str,
                type:'latest'
              },
            }}
            key={index}
            >
              <LinkStyle >
                {str}
              </LinkStyle>
            </Link>
          );
        } else if (str[0] === "@"){
          // 유저 찾기
          arr.push(
            <Link
            href={{
              pathname: `/search/users/${str}`,
              query: {
                query: str,
                type:'users'
              },
            }}
            key={index}
            >
              <LinkStyle>
                {str}
              </LinkStyle>
            </Link>
          );
        } else if (str.toString().match(regExp)){
          // 사이트 주소
          arr.push(
            <ExternalLink href={`https://${str}`} target="_blank" key={index}>
              {str}
            </ExternalLink>
          );
        } 
        // else if(str.toString().match(regURL)){
        //   // 이메일 주소
        //   arr.push(
        //     <ExternalLink href={`https://${str}`} target="_blank" key={index}>
        //       {str}
        //     </ExternalLink>
        //   );
        // }
        else {
          arr.push(<TextChild key={index}>{str}</TextChild>);
        }
      });
    

    setConverted(arr);

  };

  return [converted, convert];
};

const TextChild = styled.span`
  line-height: 1.3em;
  margin-right: 0.2em;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: inherit;
  word-break: break-all;
`;

// Link style
const LinkStyle = styled.a`
  color: ${(props) => props.theme.color.skyColor};
  margin-right: 0.2em;
  word-break: break-all;
  line-height: 1.3em;

`;
const ExternalLink = styled.a`
  color: ${(props) => props.theme.color.skyColor};
  margin-right: 0.2em;
  word-break: break-all;
  line-height: 1.3em;

`;
