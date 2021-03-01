export default function validate({values}, dupli) {
  const errors = {};
  let pattern1 = /[0-9]/; // 숫자
  let pattern2 = /[a-zA-Z]/; // 영문
  let pattern3 = /[~!@#$%^&*()_+|<>?:{}`]/; // 특수문자
  const {email, userPw, userPwRe, userNick} = values;

  if (!email) {
    errors.email = 'errorNoneEmail';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'errorEmail';
  } else if(dupli.message === "중복된 이메일입니다. 다른 이메일로 가입해주세요.") {
    errors.email = 'duplicate';
  }

//   if(email){
//     if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
//       errors.email = 'errorEmail';
//   } else if(!email){
//     errors.email = 'errorNoneEmail';
//   }
// }



  if (!pattern1.test(userPw) || !pattern2.test(userPw) || !pattern3.test(userPw) || userPw.length < 8) {
    errors.userPw = 'errorPW';
  } else {
    if (userPw !== userPwRe) {
      errors.userPwRe = 'errorRePW';
    }
  }

    if(userNick === '' || userNick?.length === 1){
      errors.userNick = 'errorNick'
     }

  return errors;
}
