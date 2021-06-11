import { LoginModalFormProps } from './../../pages/SignIn/components/LoginModal';
import { axios } from '../../core/axios';
// import { TagsState } from './../../store/ducks/tags/contracts/state';


interface ResponseApi {
    status: string;
    data: any;
};



export const AuthApi = {
    async signIn(postData: LoginModalFormProps): Promise<ResponseApi> {
        const { data } = await axios.post<ResponseApi>('/auth/login', { username: postData.email, password: postData.password });
        return data;
      },
    
    // async signIn(): Promise<void> {
    //     const { data } = await axios.get<ResponseApi>('/auth/login');
    //       return data.data;
    //   },

    async getMe(): Promise<ResponseApi> {
        const { data } = await axios.get<ResponseApi>('/users/me');
        return data;
      },
    
  };
  