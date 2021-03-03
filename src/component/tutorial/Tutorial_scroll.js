import React, {useContext} from 'react'
import styled from 'styled-components';
import useScrollFadeIn from '@hooks/useScrollFadeIn';
import {LangTutorial} from '@language/Lang.Tutorial';

// hooks&reducer
import { LanguageContext } from '@store/App_Store';
import { useUrlMove } from '@hooks/useUrlMove';

export default function TutorialScroll(){
    const [goURL] = useUrlMove();

  //언어 변수
    const { langState } = useContext(LanguageContext);
    const { selectedLanguage, defaultLanguage } = langState;
    const { 
    title1, desc1,
    title2, desc2,
    title3, desc3,
    title4, desc4,
    } = LangTutorial;

    const _title1 = title1[selectedLanguage] || title1[defaultLanguage],
        _desc1 = desc1[selectedLanguage] || desc1[defaultLanguage],
        _title2 = title2[selectedLanguage] || title2[defaultLanguage],
        _desc2 = desc2[selectedLanguage] || desc2[defaultLanguage],
        _title3 = title3[selectedLanguage] || title3[defaultLanguage],
        _desc3 = desc3[selectedLanguage] || desc3[defaultLanguage],
        _title4 = title4[selectedLanguage] || title4[defaultLanguage],
        _desc4 = desc4[selectedLanguage] || desc4[defaultLanguage];

    const animatedItem = useScrollFadeIn();
    const animatedItem2 = useScrollFadeIn();
    const animatedItem3 = useScrollFadeIn();
    const animatedItem4 = useScrollFadeIn();

    const imageArr = [
        {id:0, img:'/static/vedio/welcome_epic1.mp4', title:_title1, desc:_desc1, animation:{...animatedItem}, color:`#FCF6EB`},
        {id:1, img:'/static/vedio/edited.mp4', title:_title2, desc:_desc2, animation:{...animatedItem2}, color:`#F1FBF5`},
        {id:2, img:'/static/vedio/mobile.mp4', title:_title3, desc:_desc3, animation:{...animatedItem3}, color:`#F2EAE6`, mobile:true},
        {id:3, img:null, title:_title4, desc:_desc4, animation:{...animatedItem4}, color:`#E8F5FE`, last:true}
    ];

    return (
        <Layout>
            <LayoutInner >
            {
                imageArr.map( image => (
                <ContentBox key={image.id} {...image.animation} data-set={image.id}>
                    <ImageBox color={image.color}>
                        { 
                        Number(image.animation.trigger) === image.id &&
                        image.last ?
                            <EpicImg/>
                            :
                            <Image
                            change={image.mobile}
                            src={image.img}
                            value={image.id}
                            onContextMenu={(e)=> e.preventDefault()} 
                            type="video/mp4" 
                            autoPlay={true}
                            loop
                            muted
                        />
                        
                        }
                    
                    </ImageBox>
                    {
                    image.last ?
                    <DescriptBox color={image.color}>
                        <Title>{image.title}</Title>
                        <ButtonWrap>
                            <Button styling={'signup'} onClick={()=>goURL({pathname:'/login', state:{sign:true}})}>{image.desc.join}</Button>
                            <Button styling={'login'}  onClick={()=>goURL({pathname:'/login'})}>{image.desc.Login}</Button>
                        </ButtonWrap>
                        <JustButton onClick={()=>goURL({pathname:'/main'})}>{image.desc.main}</JustButton>
                    </DescriptBox>
                    :
                    <DescriptBox color={image.color}>
                        <Title>{image.title}</Title>
                        <Descript>{image.desc}</Descript>
                    </DescriptBox>
                    }
                </ContentBox>
                ))
            }
            </LayoutInner>
        </Layout>
    )
}

const Layout = styled.div`
width:100%;
height:100%;
`

const LayoutInner = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
overflow-x:hidden;
background:#fff;
`

const ContentBox = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:100%;
height:100vh;
user-select:none;
`
const ImageBox = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
height:100%;
margin-bottom:0.2em;
background:${props => props.color};

`

const DescriptBox = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:100%;
height:auto;
padding-bottom:4em;
background:${props => props.color};
`

// 이미지
const Image = styled.video`
width:${props => props.change ? `calc(100%  - 82%)` : `calc(100%  - 40%)`};
height:100%;
@media (max-width:900px){
    width:${props => props.change ? `calc(100%  - 35%)` : `100%`};
}
@media (max-width:320px){
    width:${props => props.change ? `calc(100%  - 18%)` : `100%`};
    }
`

// 타이틀
const Title = styled.span`
`

const Descript = styled.span`
`

const EpicImg = styled.svg`
    background:url('/static/test.svg') no-repeat center center / contain;
    margin:0;
    width: 100%;
`;
 

const ButtonWrap = styled.div`
    display:flex;
    flex-wrap:nowrap;
    align-items:center;
    justify-content:center;
    width:100%;
    margin:4em 0.5em;
    @media (max-width:320px){
        margin:3em 0;
        justify-content:space-around;
    }
`

const Button = styled.button`
width:16em;
height:3em;
background:${(props) => props.styling === 'signup' ? props.theme.color.darkOrange : props.theme.color.skyColor};
color:${(props) => props.theme.color.whiteColor};
font-weight: ${(props) => props.theme.fontWeight.font700};
font-size: ${(props) => props.theme.fontSize.font18};
margin-right:1em;
border-radius:2em;
cursor:pointer;
@media (max-width:900px){
    width:14em;
    height:3em;
    font-size: ${(props) => props.theme.fontSize.font16};
    margin-right:0.4em;
}
@media (max-width:320px){
    font-size: ${(props) => props.theme.fontSize.font15};
    margin-right:0em;
    width:8.5em;
    height:2.6em;
    }

`

const JustButton = styled.button`
max-width:12em;
margin: 0 0 0 0.6em;
height:auto;
color:${(props) => props.theme.color.blackColor};
font-weight: ${(props) => props.theme.fontWeight.font700};
font-size: ${(props) => props.theme.fontSize.font18};
border:1px solid #999;
padding:0.6em;
border-radius:0.2em;
cursor:pointer;
@media (max-width:900px){
    max-width:8em;
    font-size: ${(props) => props.theme.fontSize.font16};
}

`