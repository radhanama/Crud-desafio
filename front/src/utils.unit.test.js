import axios from "axios";
import { httpGet, httpPost, httpDelete, httpPut, httpGetOne } from "./utils";

import {baseUrl} from './baseUrl'


jest.mock('axios');

test('should fetch users', () => {
  const users = [{
    "nome": "cde",
           
    "id": 1
  }];
  const resp = {data: users};
  //axios.get.mockResolvedValue(resp);

  axios.get.mockImplementation(() => Promise.resolve(resp))

  return httpGetOne().then(data => expect(data).toEqual(users));
});

test('should fetch users', () => {
  const users = [{
    "nome": "cde",
           
    "id": 1
  }];
  const resp = {data: users};
  //axios.get.mockResolvedValue(resp);

  axios.get.mockImplementation(() => Promise.resolve(resp))

  return httpGet().then(data => expect(data).toEqual(users));
});

test('should put users', () => {
  const users = [{
    "nome": "cde",
           
    "id": 1
  }];
  const resp = {data: users};
  //axios.get.mockResolvedValue(resp);

  axios.put.mockImplementation(() => Promise.resolve(resp))

  return httpPut().then(data => expect(data).toEqual(users));
});

test('should post users', () => {
  const users = [{
    "nome": "cde",
           
    "id": 1
  }];
  const resp = {data: users};
  //axios.get.mockResolvedValue(resp);

  axios.post.mockImplementation(() => Promise.resolve(resp))

  return httpPost().then(data => expect(data).toEqual(users));
});

test('should put users', () => {
  const users = [{
    "nome": "cde",
           
    "id": 1
  }];
  const resp = {data: users};
  //axios.get.mockResolvedValue(resp);

  axios.delete.mockImplementation(() => Promise.resolve(resp))

  return httpDelete().then(data => expect(data).toEqual(users));
});