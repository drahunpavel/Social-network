import axios from "axios";
import { Tweet } from "../../store/ducks/tweets/contracts/state";


export interface Response<T> {
  status: string;
  data: T;
};

export const TweetsApi = {
  async fetchTweets(): Promise<Tweet[]> {
    const { data } = await axios.get<Response<Tweet[]>>('/tweets');
    return data.data;
  },
  async fetchTweetData(id: string): Promise<Tweet> {
    const { data } = await axios.get<Response<Tweet>>('/tweets/' + id);
    return data.data;
  },
  async addTweet(payload: string): Promise<Tweet> {
    const { data } = await axios.post<Response<Tweet>>('/tweets', { text: payload });
    return data.data;
  },
};


/*
<Response<Tweet>>('/tweets/

дает понимание для axios, что в ответе ожидатается типа Response
который содрежит status: string  и data: T, где data: T; может быть или массив с типом Tweet[], или просто тип Tweet

*/