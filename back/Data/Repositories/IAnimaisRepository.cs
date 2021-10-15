using System.Collections.Generic;
using AnimalControl.Models;

namespace AnimalControl.Data.Repositories
{
    public interface IAnimaisRepository
    {
        void Adicionar(Animal animal);

        void Atualizar(string id, Animal animalAtualizada);

        IEnumerable<Animal> Buscar();

        Animal Buscar(string id);

        void Remover(string id);
    }
}
