import React, {useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addAnimaisServer, updateAnimaisServer, selectAnimaisById} from './AnimaisSlice'
import 'mutationobserver-shim'
import FormAnimal from "./FormAnimal"
import { render, screen, fireEvent, userEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { MemoryRouter, Route } from 'react-router-dom'
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect';

jest.mock("react-redux", () =>({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn( () => jest.fn((param) => param) ),
    useSelector: jest.fn()
}));

jest.mock("react-hook-form", () => ({
    ...jest.requireActual("react-hook-form"),
    register: jest.fn(),
    handleSubmit: jest.fn(),
    // ...whatever APIs you use in your component
  }))

const mockAppState = {
    animais: {
        status: 'not_loaded',
        error: null,
        animais: [{id: 1, nome: 'cfc', tipo: 'cavalo'}],
    }
}

jest.mock("./AnimaisSlice", () => ({
    selectAnimaisById: jest.fn((state, id) => (mockAppState.animais.animais.find((e)=> e.id == id))),
    addAnimaisServer: jest.fn(),
    updateAnimaisServer: jest.fn()
}));

describe("Listagemanimais unit", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
    });
    
    afterEach(() => {
        useSelector.mockClear();
        addAnimaisServer.mockClear();
    });

    test('Carregar form novo', async () => {
        const {container} = render(<FormAnimal/>, { wrapper: MemoryRouter });
        expect(screen.getByText(/Novo Animal/i)).toBeInTheDocument()

        const nome = container.querySelector("#name");
        const tipo = container.querySelector("#tipo");
        const nasc = container.querySelector("#nasc");
        const peso = container.querySelector("#peso");
        const submitButton = container.querySelector("#salvar");
        fireEvent.input(nome, {target: {value: 'name'}});
        fireEvent.input(peso, {target: {value: 32}});
        fireEvent.input(tipo, {target: {value: "Gato"}});
        fireEvent.input(nasc, {target: {value: "35/45/45"}});


        await act(async () => {
            fireEvent.submit(submitButton);
        });
        expect(addAnimaisServer).toHaveBeenCalled();

    });
    test('cancelar', async () => {
        const history = createMemoryHistory()
        const {container} = render(
            <Router history={history}><FormAnimal/></Router>
        , { wrapper: MemoryRouter });
        expect(screen.getByText(/Novo Animal/i)).toBeInTheDocument()

        const nome = container.querySelector("#name");
        const tipo = container.querySelector("#tipo");
        const nasc = container.querySelector("#nasc");
        const peso = container.querySelector("#peso");
        const submitButton = container.querySelector("#cancelar");
        fireEvent.input(nome, {target: {value: 'name'}});
        fireEvent.input(peso, {target: {value: 32}});
        fireEvent.input(tipo, {target: {value: "Gato"}});
        fireEvent.input(nasc, {target: {value: "35/45/45"}});


        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(history.location.pathname).toEqual('/');


        

    });
    test('Carregar form update', () => {
        let Id = 1;
        render(
            <MemoryRouter initialEntries={[`/animais/${Id}`]}>
                <Route path="/animais/:id">
                    <FormAnimal/>
                </Route>
            </MemoryRouter>
             );
        expect(screen.getByText(/Alteração de Animal/i)).toBeInTheDocument()
    });

    test('Update válido', async () => {
        let Id = "1";
        let {container} = render(
            <MemoryRouter initialEntries={[`/animais/${Id}`]}>
                <Route path="/animais/:id">
                    <FormAnimal/>
                </Route>
            </MemoryRouter>
        );

        expect(screen.getByText(/Alteração de Animal/i)).toBeInTheDocument();
        const nome = container.querySelector("#name");
        const tipo = container.querySelector("#tipo");
        const nasc = container.querySelector("#nasc");
        const peso = container.querySelector("#peso");
        const submitButton = container.querySelector("#salvar");
        fireEvent.input(nome, {target: {value: 'name'}});
        fireEvent.input(peso, {target: {value: 32}});
        fireEvent.input(tipo, {target: {value: "Gato"}});
        fireEvent.input(nasc, {target: {value: "35/45/45"}});


        await act(async () => {
            fireEvent.submit(submitButton);
        });
        
        expect(updateAnimaisServer).toHaveBeenCalled();
        
        
    });

  

    test('Carregar id que não existe', () => {
        let Id = 2;
        render(
            <MemoryRouter initialEntries={[`/animais/${Id}`]}>
                <Route path="/animais/:id">
                    <FormAnimal/>
                </Route>
            </MemoryRouter>
             );
        expect(screen.getByText(/Novo Animal/i)).toBeInTheDocument();
    });
  

    
});
