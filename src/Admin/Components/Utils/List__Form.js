import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

import Dropdown from '../Utils/Dropdown';

export default function ListForm({type, contentsData}) {
    const {categorySelec, hideOrNot, searchFilter, headerArr, userContentsData, tableRef, setToggleSelect, dataHadler} = contentsData

    const [dropDown1, setDropDown1] = useState([]);
    const [dropDown2, setDropDown2] = useState([]);
    const [dropDown3, setDropDown3] = useState([]);
    const [headerArray, setHeaderArray] = useState();
    const [bodyData, setBodyData] = useState();

    const typeHandler = () => {
        
        switch (type) {
            case 'CONTENTS':
                setDropDown1(categorySelec);
                setDropDown2(hideOrNot);
                setDropDown3(searchFilter);
                setHeaderArray(headerArr);
                setBodyData(userContentsData);
                break;
            case 'USERS':
                setDropDown1(categorySelec);
                setDropDown2(hideOrNot);
                setDropDown3(searchFilter);
                setHeaderArray(headerArr);
                setBodyData(userContentsData);

                break;
            default:
                break;
        }
    }

    useEffect(() => {
        contentsData && typeHandler();
    }, [type]);

    const viewNum = [
        {title:'10개', value:10}, 
        {title:'30개', value:30}, 
        {title:'50개', value:50}];

    return (
        <>
            <TopLayout>
                {/* 상단 좌측 레이아웃 */}
                <TopLeftLayout>
                    <AllButton>삭제</AllButton>
                    <AllButton>숨기기</AllButton>
                </TopLeftLayout>
                {/* 상단 중앙 레이아웃 */}
                <TopCenterLayout>
                    <Dropdown data={viewNum}/>
                    <Dummy2/>
                    <Dropdown data={dropDown1} type={type}/>
                    <Dummy/>
                    <Dropdown data={dropDown2} type={type}/>
                </TopCenterLayout>
                <TopRightLayout>
                    <Dropdown data={dropDown3} type={type}/>
                    <Dummy/>
                    <SearchInput/>
                    <AllButton>검색</AllButton>
                </TopRightLayout>
            </TopLayout>
            <MainLayout>
                {/* 본문 테이블 */}
                <TableBox ref={tableRef}>
                <TableHead>
                    <TableRowBox>
                        {/*  테이블 헤더 */}
                        <TableHeadLine>
                            <CheckBox/>
                        </TableHeadLine>
                        {
                            headerArray?.map((item, key) => (
                            <TableHeadLine key={key}>{item}</TableHeadLine>
                            ))
                        }
                    </TableRowBox>
                </TableHead>
                {/*  테이블 본문 시작 */}
                <TableBody >
                {
                    bodyData?.map((content, i)=>(
                    <TableRowBox key={i} >
                        <TableDataBox>
                            <CheckBox name='contents' value={content.id} />
                        </TableDataBox>
                        <TableDataBox>{content.id}</TableDataBox>
                        <TableDataBox>{content.email}</TableDataBox>
                        <TableDataBox>{content._id}</TableDataBox>
                        <TableDataBox>{type === 'CONTENTS' ? content.title : content.type}</TableDataBox>
                        <TableDataBox>{type === 'CONTENTS' ? content.category : content.join}</TableDataBox>
                        <TableDataBox>{type === 'CONTENTS' ? (content.hide === true ? '숨김' : '표시') : null}</TableDataBox>
                            <TableDataBox>
                                <AllButton
                                id={content.id}
                                onClick={(e)=> {
                                    setToggleSelect(e.currentTarget.id)
                                    dataHadler(e, 'hide')
                                }}
                                >{content.hide === true ? '표시' : '블라인드'}
                                </AllButton>
                            </TableDataBox>
                            <TableDataBox>
                                <AllButton
                                id={content.id}
                                onClick={(e)=> {
                                    setToggleSelect(e.currentTarget.id)
                                    dataHadler(e, 'remove')
                                }}
                                >
                                삭제
                                </AllButton>
                            </TableDataBox>
                    </TableRowBox> ))
                }
                    </TableBody>
                </TableBox>
            </MainLayout>
            <BottomLayout>asd</BottomLayout>
        </>
    )
}


//레이아웃
const Dummy = styled.div`
display:flex;
width:1em;

`
const Dummy2 = styled(Dummy)`
display:flex;
width:2em;

`

const Layout = styled.div`
width:100%;
height:100%;
margin-top:2em;
`

const LayoutInner = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
`

// 상단 레이아웃
const TableHead = styled.thead`
`

const TopLayout = styled.div`
display:flex;
justify-content:space-around;
/* width:100%; */
height:100%;
padding:0.5em 1em;
background:${props => props.theme.adminColor.whiteColor};
margin-bottom:0.2em;
`
// 상단 좌측 레이아웃
const TopLeftLayout = styled.div`
display:flex;
/* justify-content:center; */
align-items:center;
width:100%;
height:100%;
`

const AllButton = styled.button.attrs({
    type:'submit'
})`
padding:0.4em 0.6em;
border-radius:0.3em;
background:${props => props.theme.adminColor.replyOrange};
color:${props => props.theme.adminColor.whiteColor};
margin-right:0.5em;
cursor:pointer;
`

// 상단 중앙 레이아웃
const TopCenterLayout = styled(TopLeftLayout)`
`

// 상단 우측 레이아웃
const TopRightLayout = styled(TopLeftLayout)`
`
const SearchInput = styled.input.attrs({
    type:'text'
})`
border:1px solid ${props => props.theme.adminColor.replyOrange};
padding: 0.4em 0;
border-radius:0.4em;
margin-right:0.2em;
`

// 본문 레이아웃
const TableBody = styled.tbody`
`

const MainLayout = styled.div`
width:100%;
height:100%;
`

const TableBox = styled.table`
width:100%;
`
const TableHeadLine = styled.th`
font-size:${props => props.theme.fontSize.font16};
font-weight:${props => props.theme.fontWeight.font500};
padding:0.8em 1em;
border-bottom:2px solid ${props => props.theme.adminColor.hoverColor};
`
const TableRowBox = styled.tr`
background:${props => props.theme.adminColor.whiteColor};

`
const TableDataBox = styled.td`
text-align:center;
padding:0.8em 1em;
`
// 본문 레이아웃 - 헤더 UI
const CheckBox = styled.input.attrs({
    type:'checkbox'
})`
width:1em;
height:1em;
`

// 하단 레이아웃
const BottomLayout = styled.div`

`