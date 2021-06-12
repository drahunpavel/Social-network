import { LoginModalFormProps } from './../../pages/SignIn/components/LoginModal';
import { axios } from '../../core/axios';
import { RegisterModalFormProps } from '../../pages/SignIn/components/RegisterModal';



interface ResponseApi {
    status: string;
    data: any;
};



export const AuthApi = {
    async signIn(postData: LoginModalFormProps): Promise<ResponseApi> {
        const { data } = await axios.post<ResponseApi>('/auth/login', { username: postData.email, password: postData.password });
        return data;
      },
    
      async signUp(postData: RegisterModalFormProps): Promise<ResponseApi> {
        const { data } = await axios.post<ResponseApi>('/auth/create', { email: postData.email, username: postData.username, fullname: postData.fullname, password: postData.password, password2: postData.password2 });
        return data;
      },
    async getMe(): Promise<ResponseApi> {
        const { data } = await axios.get<ResponseApi>('/users/me');
        return data;
      },
    
  };
  