
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: '170d0f46-c4c7-4469-852d-c46733e1dc69',
    authority: 'https://stancebeamtest.b2clogin.com/stancebeamtest.onmicrosoft.com/B2C_1_SignUp',
    knownAuthorities: ['stancebeamtest.b2clogin.com'],
    redirectUri: "http://localhost:3000/",
    postLogoutRedirectUri: 'http://localhost:3000/',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {	
    loggerOptions: {	
        loggerCallback: (level, message, containsPii) => {	
            if (containsPii) {		
                return;		
            }		
            switch (level) {
                case LogLevel.Error:
                    console.error(message);
                    return;
                case LogLevel.Info:
                    console.info(message);
                    return;
                case LogLevel.Verbose:
                    console.debug(message);
                    return;
                case LogLevel.Warning:
                    console.warn(message);
                    return;
                default:
                    return;
            }	
        }	
    }	
  }
};

export const b2cPolicies = {
  signUp: {
    authority: 'https://stancebeamtest.b2clogin.com/stancebeamtest.onmicrosoft.com/B2C_1_SignUp',
  },
  signIn: {
    authority: 'https://stancebeamtest.b2clogin.com/stancebeamtest.onmicrosoft.com/B2C_1_SignIn',
  },
  editProfile: {
    authority: 'https://stancebeamtest.b2clogin.com/stancebeamtest.onmicrosoft.com/B2C_1_ProfileEdit',
  },
  resetPassword: {
    authority: 'https://stancebeamtest.b2clogin.com/stancebeamtest.onmicrosoft.com/B2C_1_PasswordReset',
  },
};

