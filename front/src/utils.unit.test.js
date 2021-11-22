import axios from "axios";
import { httpGet, httpPost, httpDelete, httpPut } from "./utils";

import {baseUrl} from './baseUrl'


jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  //axios.get.mockResolvedValue(resp);

  axios.get.mockImplementation(() => Promise.resolve(resp))

  return httpGet().then(data => expect(data).toEqual(users));
});


