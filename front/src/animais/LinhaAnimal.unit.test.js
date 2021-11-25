import React from 'react';
import { render, screen } from '@testing-library/react';
import { LinhaAnimal } from './LinhaAnimal';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('LinhaAnimal unit', function () {

    test('props vazio', () => {
        render(<table><tbody><LinhaAnimal /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir o animal./i)).toBeInTheDocument()
    });

    test('animal sem id', () => {
        render(<table><tbody><LinhaAnimal animal={{}} /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir o animal./i)).toBeInTheDocument()
    });

    test('animal sem nome e sem sigla', () => {
        render(<table><tbody><LinhaAnimal animal={{id: 1}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('animal com nome e com sigla', () => {
        render(<table><tbody><LinhaAnimal animal={{id: 1, name: 'Animal 1', tipo: 'P1'}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/Animal 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/P1/i)).toBeInTheDocument();
    });

    test('animal click editar', () => {
        const history = createMemoryHistory();
        let animal = {id: 1, nome: 'Animal 1'};
        render(<Router history={history}><table><tbody><LinhaAnimal animal={animal} /></tbody></table></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Alterar/i), leftClick);
        expect(history.location.pathname).toBe('/animais/1');
    });

    test('animal click excluir', () => {
        const mockExcluirHandler = jest.fn();
        let animal = {id: 1, name: 'Animal 1'};
        const {container} = render(<table><tbody><LinhaAnimal animal={animal} onClickExcluirAnimal={mockExcluirHandler} /></tbody></table>, { wrapper: MemoryRouter });
        const leftClick = { button: 0 };
        const ex = container.querySelector("#delete");
        userEvent.click(ex, leftClick);
        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(1);
    });
});