import Viewer from '@component/viewer/Viewer';
import axios from 'axios';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ViewerPage(props) {
  const { boardItem, id, error } = props;
  return <Viewer boardItem={boardItem} userId={id} nonError={error} />;
}

export async function getServerSideProps(context) {
  const { query, req, params, locale } = context;
  const id = params?.id || query?.id;

  let error = null;
  let res = null;
  const url = `${process.env.API_URL}/boards/${id}`;
  res = await axios({
    url,
    method: 'get',
    headers: req?.headers?.cookie ? { Cookie: req.headers.cookie } : undefined,
    withCredentials: true,
  }).catch((res) => {
    if (res.response?.status === 404) error = 404;
  });

  return {
    props: {
      boardItem: res?.data || null,
      id: id,
      error,
      ...await serverSideTranslations(locale, ["common"])
    },
  };
}
