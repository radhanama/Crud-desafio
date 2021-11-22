//import {store} from '../store';
import animaisReducer, {deleteAnimaisServer, fetchAnimais, addAnimaisServer, updateAnimaisServer, selectAllAnimais} from './AnimaisSlice'
import {httpDelete, httpGet, httpPut, httpPost} from '../utils'
import { configureStore } from '@reduxjs/toolkit'

jest.mock("../utils", () => ({
    httpDelete: jest.fn(),
    httpGet: jest.fn(),
    httpPut: jest.fn(), 
    httpPost: jest.fn()
}));


jest.useFakeTimers();

let store;

describe('slice', () => {
    beforeEach(() => {
         store = configureStore({
                reducer: {
                  animais: animaisReducer
                }
            })
    });
    afterEach(() => {
        httpGet.mockClear();
        httpPut.mockClear();
    })
    test('dispatch fetch fullfiled', async () => {
        httpGet.mockImplementation(() => Promise.resolve([
            {
              "nome": "asdasdasd",
             
              "id": 3
            }
        ]));
        await store.dispatch(fetchAnimais());
        expect(store.getState().animais.status).toBe('loaded');
        expect(store.getState().animais.entities['3']).toEqual(
            {
                "nome": "asdasdasd",
                "id": 3
              }
        );
    })
    test('dispatch fetch pending', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

        httpGet.mockImplementation(() => {
            return wait(1000);
        });
        store.dispatch(fetchAnimais());
        jest.advanceTimersByTime(500);
        expect(store.getState().animais.status).toBe('loading');
    })
    test('dispatch fetch fullfiled', async () => {
        httpGet.mockImplementation(() => Promise.reject("erro"));
        
        await store.dispatch(fetchAnimais());
        expect(store.getState().animais.status).toBe('failed');
        expect(store.getState().animais.error).toEqual("erro"
        );
    })
    test('dispatch fetch fullfiled', async () => {

        let AnimalUpdated = {
            "nome": "cde",
           
            "id": 1
        };
        httpPut.mockImplementation(() =>  Promise.resolve(AnimalUpdated));
        await store.dispatch(updateAnimaisServer(AnimalUpdated));
        expect(store.getState().animais.status).toBe('saved');
        expect(store.getState().animais.entities['1']).toEqual(AnimalUpdated);
    })
    test('dispatch fetch fullfiled', async () => {
        httpPut.mockImplementation(() => Promise.reject("erro"));
        
        await store.dispatch(fetchAnimais());
        expect(store.getState().animais.status).toBe('failed');
        expect(store.getState().animais.error).toEqual("erro"
        );
    })
    test('dispatch fetch fullfiled', async () => {

        let AnimalAdd = {
            "nome": "cde",
            
            "id": 1
        };
        httpPost.mockImplementation(() =>  Promise.resolve(AnimalAdd));
        await store.dispatch(addAnimaisServer(AnimalAdd));
        expect(store.getState().animais.status).toBe('saved');
        expect(store.getState().animais.entities['1']).toEqual(AnimalAdd);
    })
    test('dispatch fetch fullfiled', async () => {

        let AnimalAdd = {
            "nome": "cde",
           
            "id": 1
        };
        httpPost.mockImplementation(() =>  Promise.resolve(AnimalAdd));
        await store.dispatch(addAnimaisServer(AnimalAdd));
        await store.dispatch(deleteAnimaisServer(AnimalAdd.id));
        expect(store.getState().animais.status).toBe('deleted');
        expect(store.getState().animais.ids.length).toBe(0);
    })
});
