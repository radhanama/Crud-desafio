import {string, object, setLocale, number} from 'yup';
import { ptForm } from 'yup-locale-pt';

setLocale(ptForm)

export let animalSchema = object().shape(
    {
        id: string(),
        name: string().required(),
        tipo: string().required(),
        nascimento: string().required(),
        peso: number()
    }
)
