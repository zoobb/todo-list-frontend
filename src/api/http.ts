import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

export class Http {
  private client: AxiosInstance;

  constructor(options: AxiosRequestConfig) {
    this.client = axios.create({
      'baseURL': options.baseURL,
    });
  }
  async getList() {
    try {
      const res = await this.client.get('/list');
      // console.log(res.data);
      return res.data;
    } catch (err) {
      this.logError(err as Error);
    }
  }
  async deleteList() {
    try {
      await this.client.delete('/list');
    } catch (err) {
      this.logError(err as Error);
    }
  }
  async addListItem(content: string) {
    try {
      await this.client.post('/list', {
        'user_data': content,
      });
      // console.log(todoList.value);
    } catch (err) {
      this.logError(err as Error);
    }
  }
  async updateListItem(id: number, content: string) {
    try {
      await this.client.put(`list/${id}`, {
        'user_data': content,
      });
    } catch (err) {
      this.logError(err as Error);
    }
  }
  async deleteListItem(id: number) {
    try {
      await this.client.delete(`list/${id}`);
    } catch (err) {
      this.logError(err as Error);
    }
  }
  logError(err: Error) {
    console.log(`There was a problem fetching data: ${err}`);
  }
}
