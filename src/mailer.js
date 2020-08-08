import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "naver",
  auth: {
    user: "para23@naver.com", // gmail 계정 아이디를 입력
    pass: "xhsvhxm1@", // gmail 계정의 비밀번호를 입력
  },
});

const mailOptions = (email, secret) => ({
  from: "para23@naver.com", // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
  to: email, // 수신 메일 주소
  subject: "login secret for fridge-app", // 제목
  text: `Hello! your login secret is ${secret}. copy paste on the app/web to log in`, // 내용
});

export const sendSecretMail = (email, loginSecret) =>
  transporter.sendMail(mailOptions(email, loginSecret), function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
