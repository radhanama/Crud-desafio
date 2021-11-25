import {string, object, setLocale, number} from 'yup';
import { ptForm } from 'yup-locale-pt';

setLocale(ptForm)

export let animalSchema = object().shape(
    {
        id: string(),
        name: string(),
        tipo: string(),
        nascimento: string(),
        peso: number()
    }
)
