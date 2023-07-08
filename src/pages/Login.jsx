import React, { useRef, useState } from 'react'
import '../styles/Login.css'
import ApiConst from '../globle/ApiKeys';
import makeAPIRequest from '../globle/ApiCall';

const Login = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value !== '') {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 4);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
  };


  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();

    // ----------------send otp to the admin----------------
    let data = {
      "mobile_no": mobile
    };

    makeAPIRequest('post', ApiConst.verify_mobile_no, data, null, null)
      .then((response) => {
        JSON.stringify(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // ----------------send otp to the admin----------------
    setShowOtpInput(true);
  };

  const [mobile, setmobile] = useState()
  const GetMobileNo = (e) => {
    setmobile(e.target.value)
  }

  const VerifyOtp = (e) => {
    e.preventDefault();

    //   // ------------------ Verify Otp ---------------------

    const OtpCode = otp.join('')
    let data = {
      "mobile_no": mobile,
      "otp": OtpCode
    };


    makeAPIRequest('post', ApiConst.verify_admin, data, null, null)
      .then((response) => {
        if (response.data.status) {
          localStorage.setItem('AdminToken', response.data.token)
          window.location.href = '/dashboard'
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //   // ------------------ Verify Otp ---------------------
  }

  function handleKeyDown(event) {
    const maxLength = 10;
    const inputValue = event.target.value;
    if (inputValue.length >= maxLength && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }
  function onlyOneOtp(event) {
    const maxLength = 1;
    const inputValue = event.target.value;
    if (inputValue.length >= maxLength && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="container123">
        <div className='logo1234'>
          <img src={require('../assets/logo.png')} alt="" srcSet="" />
        </div>
        <div className='form-width '>
          <form onSubmit={handleSendOtp}>
            <div className='input_txt_mo'>
              <input className='txt-mo' onChange={GetMobileNo} onKeyDown={handleKeyDown} required type="number" placeholder="Enter Mobile Number" />
            </div>
            {showOtpInput ?
              <>
                <div className='input-otp'>
                  <input
                    type="number"
                    maxLength="1"
                    required
                    value={otp[0]}
                    onChange={(e) => handleChange(e, 0)}
                    onPaste={handlePaste}
                    ref={(ref) => (inputRefs.current[0] = ref)}
                    onKeyDown={onlyOneOtp}
                  />
                  <input
                    type="number"
                    maxLength="1"
                    required
                    value={otp[1]}
                    onChange={(e) => handleChange(e, 1)}
                    onPaste={handlePaste}
                    ref={(ref) => (inputRefs.current[1] = ref)}
                    onKeyDown={onlyOneOtp}
                  />
                  <input
                    type="number"
                    maxLength="1"
                    required
                    value={otp[2]}
                    onChange={(e) => handleChange(e, 2)}
                    onPaste={handlePaste}
                    ref={(ref) => (inputRefs.current[2] = ref)}
                    onKeyDown={onlyOneOtp}
                  />
                  <input
                    type="number"
                    maxLength="1"
                    required
                    value={otp[3]}
                    onChange={(e) => handleChange(e, 3)}
                    onPaste={handlePaste}
                    ref={(ref) => (inputRefs.current[3] = ref)}
                    onKeyDown={onlyOneOtp}
                  />
                </div>
                <button onClick={VerifyOtp} className='sentopt-btn'>Verify OTP</button>
              </>
              :
              <div>
                <button type='submit' className='sentopt-btn'>Sent otp</button>
              </div>
            }
          </form>
        </div>
      </div>
    </>
  )
}

export default Login