import React, {useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addAnimaisServer, updateAnimaisServer, selectAnimaisById} from './AnimaisSlice'
import {animalSchema} from './AnimalSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";



export default function FormAnimal(props){

    const history = useHistory();
    const dispatch = useDispatch()
    let { id } = useParams();
    const animalFound = useSelector(state => selectAnimaisById(state, id))
    const { register, handleSubmit, errors } = useForm({
            resolver: yupResolver(animalSchema)
        });
        

    const [animalOnLoad] = useState(
        id ? animalFound ?? animalSchema.cast({}): animalSchema.cast({}));

    const [actionType, ] = useState(
        id ? animalFound 
                ? 'animais/updateAnimal'
                : 'animais/addAnimal'
                : 'animais/addAnimal');


    function onSubmit(animal){
        if(actionType === 'animais/addAnimal'){
            dispatch(addAnimaisServer(animal));
        }else{
            dispatch(updateAnimaisServer({...animal, id: animalFound.id}));
        }
        
        history.push('/animais');
    }
    
    return(<>
            <h1>Novo Animal</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Nome:
                <input type="text" name="name"  defaultValue={animalOnLoad.name} ref={register} />
                &nbsp;<span>{errors.name?.message}</span>
            </label>
            <br/>
            <label>
            Categoia:
                <select

                    className="form-select"
                    form="form-cadastro"
                    name="categoria"
                    defaultValue={animalOnLoad.categoria}
                    ref={register}

                >
                    
                    <option defaultValue hidden>
                        Escolha uma categoria

                    </option>
                    <option value="cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                    <option value="Bode">Bode</option>
                    <option value="Piriquito">Piriquito</option>
                </select>
                &nbsp;<span>{errors.categoria?.message}</span>
            </label>
            <br/>
            <label>
                peso:
                <input type="text" name="peso"  defaultValue={animalOnLoad.peso} ref={register} />
                &nbsp;<span>{errors.peso?.message}</span>
            </label>
            <br/>
            <label>
                nascimento:
                <input id="date" type="date" name="nascimento"  defaultValue={animalOnLoad.nascimento} ref={register} />
                &nbsp;<span>{errors.nascimento?.message}</span>
            </label>
            
            <br/>
            <input type="submit" value="Salvar" />
            
        <input type="button" value="Cancelar" onClick={() => history.goBack()} />
            </form>
          </>
    );
}