import {useRouter} from 'next/router';

export default function Error({statusCode}) {
    if(statusCode) {
        router.push('/')
    } else {
        router.push('/')
    }
    return (
        <div>
        {
        statusCode ?
        'server error'
        :
        'client error'
        }
        </div>
    )
}
Error.getIntialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return {statusCode};
}