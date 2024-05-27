import { Container, ValidationText, StyledInput, StyledError, StyledButton } from "./LoginPage.style"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

function LoginPage() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        id:'',
        password: '',
    })
    const [errors, setErrors] = useState({
        id:'',
        password: '',
    });

    const handleChange = (data, value) => {
      setLoginData(prev => ({ ...prev, [data]: value }));
        validateField(data, value);
    };

    const validateField = (data, value) => {
        let errorMessage = '';
        switch (data) {
          case 'id':
              errorMessage = value ? '' : '아이디를 입력해주세요!';
              break;
          case 'password':
            if(!value){errorMessage = '비밀번호를 입력해주세요!'}
            else if(value.length < 4){errorMessage ='비밀번호는 최소 4자리 이상이어야 합니다.'}
            else if(value.length > 12){errorMessage ='비밀번호는 최대 12자리까지 가능합니다.'}
            else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/.test(value)){errorMessage ='영어 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.'}
            else{errorMessage = ''}
            break;
        }
        setErrors(prev => ({ ...prev, [data]: errorMessage }));
      };
    
      const canSubmit = () => {
        return Object.values(loginData).every(x => x) && Object.values(errors).every(error => !error);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (canSubmit()) {
          console.log('로그인 정보:', loginData);
          alert('로그인을 성공했습니다!');
          navigate('/');
        } else {
          alert('모든 필드를 올바르게 입력했는지 확인해주세요.');
        }
      };

    return (
      <>
        <Container>
            <ValidationText>로그인 페이지</ValidationText>
            <StyledInput
                placeholder="아이디를 입력해주세요"
                value={loginData.id}
                onChange={(e) => handleChange('id', e.target.value)}
                type="text"
            />
            {errors.id ? <StyledError $errMsg={errors.id}>{errors.id}</StyledError> : <StyledError>-</StyledError>}
            <StyledInput
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={loginData.password}
                onChange={(e) => handleChange('password', e.target.value)}
            />
            {errors.password ? <StyledError $errMsg={errors.password}>{errors.password}</StyledError> : <StyledError>-</StyledError>}
            <StyledButton onClick={handleSubmit} disabled={!canSubmit()} $canSubmit={canSubmit()}>로그인</StyledButton>
        </Container>
      </>
    )
  }
  
  export default LoginPage
  