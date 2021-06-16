import { LoginModalFormProps } from "../../../pages/SignIn/components/LoginModal";
import { RegisterModalFormProps } from "../../../pages/SignIn/components/RegisterModal";
import { FetchSignInActionInterface, FetchSignUpActionInterface, SetUserDataActionInterface, SetUserLoadingStatusActionInterface, UserActionsType, FetchUserDataActionInterface, SignOutActionInterface } from "./contracts/actionTypes";
import { UserState } from "./contracts/state";


export const setUserData = (payload: UserState['data']): SetUserDataActionInterface => ({
  type: UserActionsType.SET_USER_DATA,
  payload,
});

export const signOut = (): SignOutActionInterface => ({
  type: UserActionsType.SIGN_OUT,
});


export const fetchSignIn = (payload: LoginModalFormProps): FetchSignInActionInterface => ({
  type: UserActionsType.FETCH_SIGN_IN,
  payload,
});

export const fetchUserData = (): FetchUserDataActionInterface => ({
  type: UserActionsType.FETCH_USER_DATA,
});

export const fetchSignUp = (payload: RegisterModalFormProps): FetchSignUpActionInterface => ({
  type: UserActionsType.FETCH_SIGN_UP,
  payload,
});

export const setUserLoadingStatus = (payload: UserState['status']): SetUserLoadingStatusActionInterface => ({
  type: UserActionsType.SET_LOADING_STATE,
  payload,
});


export type UserActions =
  | SetUserDataActionInterface
  | SetUserLoadingStatusActionInterface
  | FetchUserDataActionInterface
  | SignOutActionInterface;
