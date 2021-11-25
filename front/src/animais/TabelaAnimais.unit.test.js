import React from 'react'
import { render, screen } from '@testing-library/react'
import {TabelaAnimais} from './TabelaAnimais'
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'
import LinhaAnimal from './LinhaAnimal'

//Linha mockada, implementação fixa.
jest.mock('./LinhaAnimal', () => ({
    LinhaAnimal: jest.fn(() => (<tr><td>MockedLine</td></tr>))
}
    ));

describe('TabelaAnimal Unit', function () {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('nenhum animal', () => {
        render(<TabelaAnimais />);
        expect(screen.getByText(/Não existem animais a serem exibidos./i)).toBeInTheDocument();
    });
    test('um animal', () => {
        const animal = [{id:"1", name:"tre", tipo:"gato"}];
        render(<TabelaAnimais animais={animal}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/MockedLine/i)).toBeInTheDocument();
        
    });
});